'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import mongoose from 'mongoose';
import { FetchUser, User, UserModel } from '@/models/User';
import { AppError, encrypt, getUserInfoFromCookie } from '@/lib/utils';
import { Car, CarModel, FetchCar } from '@/models/Car';
import { adminCredentials } from '@/constants/accountConstants';
import CustomResponse from '@/models/Response';

export async function login(currentState: unknown, formData: FormData) {
  console.log('Login function running');
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
      userRole:
        username === adminCredentials.username &&
        password === adminCredentials.password
          ? 'admin'
          : 'user',
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
): Promise<CustomResponse> {
  console.log(formData.getAll('selectedCar'));
  console.info('Order parking space function running');
  return { isSuccessful: true, message: 'Parking space ordered', data: null };
}

export async function addCar(
  currentState: unknown,
  formData: FormData
): Promise<CustomResponse> {
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
      throw new AppError('Car with this license plate is claimed');
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
): Promise<CustomResponse> {
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

    await CarModel.deleteOne({
      ownerId: userId,
      _id: removedCarId,
    });

    console.info('Car removed');
    return {
      isSuccessful: true,
      message: 'Car removed',
      data: { _id: removedCarId },
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
): Promise<CustomResponse> {
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
      _id: car._id,
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

    return { _id: userInfo._id, credits: userInfo.credits };
  } catch (AppError: any) {
    console.error(AppError.message);
    return AppError.message;
  } finally {
    mongoose.connection.close();
  }
}
