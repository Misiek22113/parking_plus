'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import mongoose from 'mongoose';
import { UserModel } from '@/models/User';

export async function login(formData: FormData) {
  console.log('Login function running');
  const mongoDbUrl = process.env.MONGODB_URL;

  try {
    if (!mongoDbUrl) {
      throw new Error('MongoDB URL is not defined');
    }
    await mongoose.connect(mongoDbUrl);

    const username = formData.get('username');
    const password = formData.get('password');

    if (!username || !password) {
      throw new Error('Username or password is empty');
    }

    const foundUser = await UserModel.findOne({
      username: username as string,
      password: password as string,
    });

    if (!foundUser) {
      console.info('Wrong username or password');
      throw new Error('Wrong username or password');
    }

    console.info('User logged in');

    console.info(formData);
  } catch (error: any) {
    return error.message;
  } finally {
    mongoose.connection.close();
  }
  //   return redirect('/account/login');

  //   console.log(formData.get('username'));
  //   console.log(formData.get('password'));

  //   cookies().set('session', '1234');
  //   return redirect('/');
}
