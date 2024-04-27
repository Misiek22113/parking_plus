'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import mongoose from 'mongoose';
import { User, UserModel } from '@/models/User';
import { AppError, encrypt, getUserInfoFromCookie } from '@/lib/utils';
import { CarModel } from '@/models/Car';

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

    await UserModel.create({ username, password, userRole: 'user' });

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
) {
  console.log(formData.getAll('selectedCar'));
  console.info('Order parking space function running');
}

export async function cancelParkingSpace(
  currentState: unknown,
  formData: FormData
) {
  console.log(formData.getAll('selectedReservation'));
  console.info('Cancel parking space function running');
}

export async function addCar(currentState: unknown, formData: FormData) {
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
    const foundUser = await UserModel.findOne<User>({
      username,
    });

    if (!foundUser) {
      throw new AppError('User not found');
    }

    const userId = foundUser._id;

    await CarModel.create({
      ownerId: userId,
      registrationPlate: addedCarName,
    });

    console.info('Car added');
  } catch (AppError: any) {
    console.error(AppError.message);
    return AppError.message;
  } finally {
    mongoose.connection.close();
  }
}

export async function removeCar(currentState: unknown, formData: FormData) {
  console.log(formData.getAll('removedCar'));
  console.info('Remove car function running');
}

export async function addFunds(currentState: unknown, formData: FormData) {
  console.log(formData.getAll('moneyAmount'));
  console.info('Add funds function running');
}
