'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import mongoose from 'mongoose';
import { UserModel } from '@/models/User';
import { AppError, encrypt } from '@/lib/utils';

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

    const foundUser = await UserModel.findOne({
      username: username as string,
      password: password as string,
    });

    if (!foundUser) {
      throw new AppError('Wrong username or password');
    }

    const expirationDate = new Date(Date.now() + 1000 * 60 * 60 * 1);
    const token = await encrypt({ username, password, expirationDate });
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
