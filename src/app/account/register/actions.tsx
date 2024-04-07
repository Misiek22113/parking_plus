'use server';
import { UserModel } from '@/models/User';
import mongoose from 'mongoose';
import { redirect } from 'next/navigation';

export async function register(currentState: unknown, formData: FormData) {
  console.info('Register function running');
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

    if (foundUser) {
      console.info('User already exists');
      throw new Error('User already exists');
    }

    await UserModel.create({ username, password });

    console.info('User created');
  } catch (error: any) {
    return error.message;
  } finally {
    mongoose.connection.close();
  }
  return redirect('/account/login');
}
