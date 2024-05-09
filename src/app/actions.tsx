'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import mongoose from 'mongoose';
import { FetchUser, User, UserModel } from '@/models/User';
import { AppError, encrypt, getUserInfoFromCookie } from '@/lib/utils';
import { Car, CarModel, FetchCar } from '@/models/Car';
import { adminCredentials } from '@/constants/accountConstants';
import CustomResponse from '@/app/types/Response';
import {
  FetchParkingAction,
  ParkingAction,
  ParkingActionsModel,
} from '@/models/ParkingAction';
import {
  FetchParkingSpace,
  ParkingSpace,
  ParkingSpaceModel,
} from '@/models/ParkingSpace';
import { parkingSize } from '@/constants/databaseConstants';
import {
  parkingActionStatusEnum,
  parkingSpaceStatusEnum,
  userRoleEnum,
} from '@/constants/enumConstants';

async function initializeDatabase() {
  const mongoDbUrl = process.env.MONGODB_URL;
  if (!mongoDbUrl) {
    throw new AppError('MongoDB URL is not defined');
  }
  await mongoose.connect(mongoDbUrl);

  const parkingSpaces = await ParkingSpaceModel.find<ParkingSpace>({});
  if (parkingSpaces.length !== parkingSize) {
    await ParkingSpaceModel.deleteMany({});
    for (let i = 0; i < parkingSize; i++) {
      await ParkingSpaceModel.create<ParkingSpace>({
        spaceNumber: i + 1,
      });
    }
  }
  const adminUser = await UserModel.findOne<User>({
    username: adminCredentials.username,
  });
  if (!adminUser) {
    await UserModel.create<User>({
      username: adminCredentials.username,
      password: adminCredentials.password,
      userRole: userRoleEnum.admin,
    });
  }
  mongoose.connection.close();
}

export async function login(currentState: unknown, formData: FormData) {
  console.info('Login function running');
  const mongoDbUrl = process.env.MONGODB_URL;

  try {
    if (!mongoDbUrl) {
      throw new AppError('MongoDB URL is not defined');
    }
    await mongoose.connect(mongoDbUrl);

    const username = formData.get('username');
    const password = formData.get('password');

    if (!username || !password) {
      throw new AppError('Username or password is empty');
    }

    const foundUser = await UserModel.findOne<User>({
      username: username as string,
      password: password as string,
    });

    if (!foundUser) {
      throw new AppError('Wrong username or password');
    }

    const userRole = foundUser.userRole;

    const expirationDate = new Date(Date.now() + 1000 * 60 * 60 * 1);
    const token = await encrypt({
      username,
      password,
      userRole,
      expirationDate,
    });

    cookies().set('session', token, {
      expires: expirationDate,
      path: '/',
    });

    console.info('User logged in');
  } catch (AppError: any) {
    return AppError.message;
  } finally {
    mongoose.connection.close();
  }
  return redirect('/');
}

export async function register(currentState: unknown, formData: FormData) {
  await initializeDatabase();

  console.info('Register function running');
  const mongoDbUrl = process.env.MONGODB_URL;

  try {
    if (!mongoDbUrl) {
      throw new AppError('MongoDB URL is not defined');
    }
    await mongoose.connect(mongoDbUrl);

    const username = formData.get('username');
    const password = formData.get('password');
    const repeatedPassword = formData.get('repeat-password');

    if (!username || !password) {
      throw new AppError('Username or password is empty');
    }

    if (!repeatedPassword) {
      throw new AppError('You must repeat the password');
    }

    if (password !== repeatedPassword) {
      throw new AppError('Passwords do not match');
    }

    const foundUser = await UserModel.findOne({
      username: username as string,
    });

    if (foundUser) {
      throw new AppError('User already exists');
    }

    await UserModel.create({
      username,
      password,
      userRole: userRoleEnum.user,
    });

    console.info('User created');
  } catch (AppError: any) {
    return AppError.message;
  } finally {
    mongoose.connection.close();
  }
  return redirect('/account/login');
}

export async function logout() {
  console.info('Logout function running');
  cookies().set('session', '', { expires: new Date(0), path: '/' });
  return redirect('/account/login');
}

export async function orderParkingSpace(
  currentState: unknown,
  formData: FormData
): Promise<CustomResponse<FetchParkingAction | null>> {
  console.info('Order parking space function running');

  const mongoDbUrl = process.env.MONGODB_URL;
  const cookieStore = cookies();

  const token = cookieStore.get('session')?.value;
  const { username } = await getUserInfoFromCookie(token);

  try {
    if (!mongoDbUrl) {
      throw new AppError('MongoDB URL is not defined');
    }
    const carName = formData.get('selectedCar');

    if (!carName) {
      throw new AppError('Car name is empty');
    }

    await mongoose.connect(mongoDbUrl);

    const foundCar = await CarModel.findOne<Car>({
      _id: carName,
    });

    if (!foundCar) {
      throw new AppError('Car not found');
    }

    const foundUser = await UserModel.findOne<User>({
      username,
    });

    if (!foundUser) {
      throw new AppError('User not found');
    }

    if (foundCar.ownerId.toString() !== foundUser._id.toString()) {
      throw new AppError('Car does not belong to you');
    }

    const freeParkingSpaces = await ParkingSpaceModel.find<ParkingSpace>({
      status: parkingSpaceStatusEnum.free,
    });

    if (freeParkingSpaces.length === 0) {
      throw new AppError('No free parking spaces available');
    }

    const randomFreeParkingSpace =
      freeParkingSpaces[Math.floor(Math.random() * freeParkingSpaces.length)];

    const parkingSpaceAction = await ParkingActionsModel.create<ParkingAction>({
      spaceNumber: randomFreeParkingSpace.spaceNumber,
      parkingSpaceId: randomFreeParkingSpace._id,
      carId: foundCar._id,
      status: parkingActionStatusEnum.pending,
      parkTime: new Date(),
      leaveTime: null,
    });

    await ParkingSpaceModel.updateOne(
      {
        _id: randomFreeParkingSpace._id,
      },
      {
        status: parkingSpaceStatusEnum.occupied,
      }
    );

    console.info('Parking space ordered');
    return {
      isSuccessful: true,
      message: 'Parking space ordered',
      data: {
        _id: parkingSpaceAction._id.toString(),
        parkingSpaceId: parkingSpaceAction.parkingSpaceId.toString(),
        parkingSpaceNumber: randomFreeParkingSpace.spaceNumber,
        carId: parkingSpaceAction.carId.toString(),
        carRegistrationPlate: foundCar.registrationPlate,
        status: parkingSpaceAction.status,
        parkTime: parkingSpaceAction.parkTime,
        leaveTime: parkingSpaceAction.leaveTime,
      },
    };
  } catch (AppError: any) {
    console.error(AppError.message);
    return { isSuccessful: false, message: AppError.message, data: null };
  } finally {
    mongoose.connection.close();
  }
}

export async function addCar(
  currentState: unknown,
  formData: FormData
): Promise<CustomResponse<FetchCar | null>> {
  const mongoDbUrl = process.env.MONGODB_URL;
  const cookieStore = cookies();

  const token = cookieStore.get('session')?.value;
  const { username } = await getUserInfoFromCookie(token);

  try {
    if (!mongoDbUrl) {
      throw new AppError('MongoDB URL is not defined');
    }
    const addedCarName = formData.get('addedCar');

    if (!addedCarName) {
      throw new AppError('Car name is empty');
    }

    await mongoose.connect(mongoDbUrl);

    const foundCar = await CarModel.findOne<Car>({
      registrationPlate: addedCarName,
    });

    if (foundCar) {
      throw new AppError('Car with this license plate is already claimed');
    }

    const foundUser = await UserModel.findOne<User>({
      username,
    });

    if (!foundUser) {
      throw new AppError('User not found');
    }

    const userId = foundUser._id;

    const car: Car = await CarModel.create<Car>({
      ownerId: userId,
      registrationPlate: addedCarName,
    });

    console.info('Car added');
    return {
      isSuccessful: true,
      message: 'Car added',
      data: { _id: car._id, registrationPlate: car.registrationPlate },
    };
  } catch (AppError: any) {
    console.error(AppError.message);
    return { isSuccessful: false, message: AppError.message, data: null };
  } finally {
    mongoose.connection.close();
  }
}

export async function removeCar(
  currentState: unknown,
  formData: FormData
): Promise<CustomResponse<{ _id: string } | null>> {
  const mongoDbUrl = process.env.MONGODB_URL;
  const cookieStore = cookies();

  const token = cookieStore.get('session')?.value;
  const { username } = await getUserInfoFromCookie(token);

  try {
    if (!mongoDbUrl) {
      throw new AppError('MongoDB URL is not defined');
    }
    const removedCarId = formData.get('removedCar');

    if (!removedCarId) {
      throw new AppError('Car ID is empty');
    }

    await mongoose.connect(mongoDbUrl);
    const foundUser = await UserModel.findOne<User>({
      username,
    });

    if (!foundUser) {
      throw new AppError('User not found');
    }

    const userId = foundUser._id;

    const pendingPayments = await ParkingActionsModel.find<ParkingAction>({
      carId: removedCarId,
      status: parkingActionStatusEnum.pending,
    });
    if (pendingPayments.length > 0) {
      throw new AppError('Car has pending payments');
    }

    await ParkingActionsModel.deleteMany({
      carId: removedCarId,
    });

    await CarModel.deleteOne({
      ownerId: userId,
      _id: removedCarId,
    });

    console.info('Car removed');
    return {
      isSuccessful: true,
      message: 'Car removed',
      data: { _id: removedCarId.toString() },
    };
  } catch (AppError: any) {
    console.error(AppError.message);
    return { isSuccessful: false, message: AppError.message, data: null };
  } finally {
    mongoose.connection.close();
  }
}

export async function addFunds(
  currentState: unknown,
  formData: FormData
): Promise<CustomResponse<{ credits: number } | null>> {
  const mongoDbUrl = process.env.MONGODB_URL;
  const cookieStore = cookies();

  const token = cookieStore.get('session')?.value;
  const { username } = await getUserInfoFromCookie(token);
  try {
    if (!mongoDbUrl) {
      throw new AppError('MongoDB URL is not defined');
    }

    const amount = formData.get('moneyAmount');
    if (!amount || parseFloat(amount as string) <= 0) {
      throw new AppError('Amount value is invalid');
    }

    await mongoose.connect(mongoDbUrl);
    const foundUser = await UserModel.findOne<User>({
      username,
    });

    if (!foundUser) {
      throw new AppError('User not found');
    }

    await UserModel.updateOne(
      {
        username,
      },
      {
        $inc: {
          credits: parseFloat(amount as string),
        },
      }
    );

    console.info('Funds added');
    return {
      isSuccessful: true,
      message: 'Funds added',
      data: { credits: parseFloat(amount as string) },
    };
  } catch (AppError: any) {
    console.error(AppError.message);
    return { isSuccessful: false, message: AppError.message, data: null };
  } finally {
    mongoose.connection.close();
  }
}

export async function getCars(): Promise<FetchCar[]> {
  const mongoDbUrl = process.env.MONGODB_URL;
  const cookieStore = cookies();

  const token = cookieStore.get('session')?.value;
  const { username } = await getUserInfoFromCookie(token);

  try {
    if (!mongoDbUrl) {
      throw new AppError('MongoDB URL is not defined');
    }
    await mongoose.connect(mongoDbUrl);
    const userInfo = await UserModel.findOne<User>({
      username: username,
    });

    if (!userInfo) {
      throw new AppError('User not found');
    }

    const userId = userInfo._id;
    const cars = await CarModel.find<Car>({
      ownerId: userId,
    });

    return cars.map((car) => ({
      _id: car._id.toString(),
      registrationPlate: car.registrationPlate,
    }));
  } catch (AppError: any) {
    console.error(AppError.message);
    return AppError.message;
  } finally {
    mongoose.connection.close();
  }
}

export async function getUserCredits(): Promise<FetchUser> {
  const mongoDbUrl = process.env.MONGODB_URL;
  const cookieStore = cookies();

  const token = cookieStore.get('session')?.value;
  const { username } = await getUserInfoFromCookie(token);

  try {
    if (!mongoDbUrl) {
      throw new AppError('MongoDB URL is not defined');
    }
    await mongoose.connect(mongoDbUrl);
    const userInfo = await UserModel.findOne<User>({
      username: username,
    });

    if (!userInfo) {
      throw new AppError('User not found');
    }

    return { _id: userInfo._id.toString(), credits: userInfo.credits };
  } catch (AppError: any) {
    console.error(AppError.message);
    return AppError.message;
  } finally {
    mongoose.connection.close();
  }
}

export async function getUserParkingActions(): Promise<FetchParkingAction[]> {
  const mongoDbUrl = process.env.MONGODB_URL;
  const cookieStore = cookies();

  const token = cookieStore.get('session')?.value;
  const { username } = await getUserInfoFromCookie(token);

  try {
    if (!mongoDbUrl) {
      throw new AppError('MongoDB URL is not defined');
    }
    await mongoose.connect(mongoDbUrl);
    const userInfo = await UserModel.findOne<User>({
      username: username,
    });

    if (!userInfo) {
      throw new AppError('User not found');
    }

    const userCars = await CarModel.find<Car>({
      ownerId: userInfo._id,
    });
    const userCarsIds = userCars.map((car) => car._id);

    const parkingActions = await ParkingActionsModel.find<ParkingAction>({
      carId: { $in: userCarsIds },
    })
      .populate({ path: 'parkingSpaceId', model: 'ParkingSpace' })
      .populate({ path: 'carId', model: 'Car' });

    return parkingActions.map((action) => ({
      _id: action._id.toString(),
      parkingSpaceId: (
        action.parkingSpaceId as unknown as ParkingSpace
      )._id.toString(),
      parkingSpaceNumber: (action.parkingSpaceId as unknown as ParkingSpace)
        .spaceNumber,
      carId: action.carId._id.toString(),
      carRegistrationPlate: (action.carId as unknown as Car).registrationPlate,
      status: action.status,
      parkTime: action.parkTime,
      leaveTime: action.leaveTime,
    })) as FetchParkingAction[];
  } catch (AppError: any) {
    console.error(AppError.message);
    return AppError.message;
  } finally {
    mongoose.connection.close();
  }
}

export async function getParkingSpaces(): Promise<FetchParkingSpace[]> {
  const mongoDbUrl = process.env.MONGODB_URL;

  try {
    if (!mongoDbUrl) {
      throw new AppError('MongoDB URL is not defined');
    }
    await mongoose.connect(mongoDbUrl);

    const parkingSpaces = await ParkingSpaceModel.find<ParkingSpace>({});
    return parkingSpaces.map((space) => ({
      _id: space._id.toString(),
      spaceNumber: space.spaceNumber,
      status: space.status,
    }));
  } catch (AppError: any) {
    console.error(AppError.message);
    return AppError.message;
  } finally {
    mongoose.connection.close();
  }
}

export async function payParking(
  currentState: unknown,
  formData: FormData
): Promise<
  CustomResponse<{ parkingActionId: string; newUserCredits: number } | null>
> {
  const mongoDbUrl = process.env.MONGODB_URL;
  const cookieStore = cookies();

  const token = cookieStore.get('session')?.value;
  const { username } = await getUserInfoFromCookie(token);
  try {
    if (!mongoDbUrl) {
      throw new AppError('MongoDB URL is not defined');
    }

    const amount = formData.get('currentAmount');
    if (!amount) {
      throw new AppError('Amount value is invalid');
    }

    await mongoose.connect(mongoDbUrl);
    const foundUser = await UserModel.findOne<User>({
      username,
    });

    if (!foundUser) {
      throw new AppError('User not found');
    }
    if (foundUser.credits < parseFloat(amount as string)) {
      throw new AppError('Not enough credits');
    }

    const carLicense = formData.get('carLicense');
    const car = await CarModel.findOne<Car>({
      registrationPlate: carLicense,
      ownerId: foundUser._id,
    });

    if (!car) {
      throw new AppError('Car not found');
    }

    const parkingAction = await ParkingActionsModel.findOne<ParkingAction>({
      carId: car._id,
      status: parkingActionStatusEnum.pending,
    });

    if (!parkingAction) {
      throw new AppError('Parking action not found');
    }

    await UserModel.updateOne(
      {
        username,
      },
      {
        $inc: {
          credits: -parseFloat(amount as string),
        },
      }
    );

    await ParkingActionsModel.updateOne(
      {
        _id: parkingAction._id,
      },
      {
        status: parkingActionStatusEnum.payed,
        leaveTime: new Date(),
      }
    );

    await ParkingSpaceModel.updateOne(
      {
        _id: parkingAction.parkingSpaceId,
      },
      {
        status: parkingSpaceStatusEnum.free,
      }
    );

    console.info('Parking paid');
    return {
      isSuccessful: true,
      message: 'Funds added',
      data: {
        parkingActionId: parkingAction._id.toString(),
        newUserCredits: foundUser.credits - parseFloat(amount as string),
      },
    };
  } catch (AppError: any) {
    console.error(AppError.message);
    return { isSuccessful: false, message: AppError.message, data: null };
  } finally {
    mongoose.connection.close();
  }
}

export async function fetchFilteredActions(
  currentState: unknown,
  formData: FormData
): Promise<
  {
    parkingSpaceNumber: number;
    status: string;
    parkTime: Date;
    leaveTime: Date | null;
    carRegistrationPlate: string;
  }[]
> {
  const mongoDbUrl = process.env.MONGODB_URL;

  const spot = formData.get('spot');
  const status = formData.get('status');
  const license = formData.get('license');

  try {
    if (!mongoDbUrl) {
      throw new AppError('MongoDB URL is not defined');
    }

    await mongoose.connect(mongoDbUrl);

    const parkingActions = await ParkingActionsModel.find();

    let parkingActionsList = [];

    for (const action of parkingActions) {
      const car = await CarModel.findById(action.carId.toString());
      const spot = await ParkingSpaceModel.findById(
        action.parkingSpaceId.toString()
      );

      if (!car) {
        throw new AppError('Car not found');
      }

      action.carRegistrationPlate = car.registrationPlate;
      const actionObj = action.toObject();

      parkingActionsList.push({
        parkingSpaceNumber: spot.spaceNumber,
        status: actionObj.status,
        parkTime: actionObj.parkTime,
        leaveTime: actionObj.leaveTime,
        carRegistrationPlate: car.registrationPlate,
      });
    }

    return filterList(
      parkingActionsList,
      parseInt(spot as string),
      license as string,
      status as string
    );
  } catch (error) {
    // console.error(error.message);
    // throw new Error(error.message);
  } finally {
    mongoose.connection.close();
  }

  return [];
}

function filterList(
  myList: {
    parkingSpaceNumber: number;
    status: string;
    parkTime: Date;
    leaveTime: Date | null;
    carRegistrationPlate: string;
  }[],
  spot?: number,
  license?: string,
  status?: string
) {
  console.log(myList);
  return myList.filter((item) => {
    const spotCondition = spot ? item.parkingSpaceNumber === spot : true;
    console.log('spot', spotCondition, item.parkingSpaceNumber, spot);
    const licenseCondition = license
      ? item.carRegistrationPlate === license
      : true;
    const statusCondition = status ? item.status === status : true;
    console.log('status', statusCondition, item.status, status);

    return spotCondition && licenseCondition && statusCondition;
  });
}
