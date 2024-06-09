import GoogleProvider from 'next-auth/providers/google';
import { AppError, encrypt } from '@/lib/utils';
import { cookies } from 'next/headers';
import { UserModel } from '@/models/User';
import mongoose from 'mongoose';
import { User } from 'next-auth';
import { userRoleEnum } from '@/constants/enumConstants';

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: User }) {
      const mongoDbUrl = process.env.MONGODB_URL;

      try {
        if (!mongoDbUrl) {
          throw new AppError('MongoDB URL is not defined');
        }
        await mongoose.connect(mongoDbUrl);

        if (user) {
          const username = user.email;
          const userRole = userRoleEnum.user;
          const providerAccountId = user.id;

          const foundUser = await UserModel.findOne<User>({
            username: username as string,
            password: providerAccountId as string,
          });

          if (!foundUser) {
            await UserModel.create({
              username,
              password: providerAccountId,
              userRole,
            });

            console.info('New user created:', username);
          }

          const expirationDate = new Date(Date.now() + 1000 * 60 * 60 * 1);
  
          const encryptedToken = await encrypt({
            username,
            userRole,
            expirationDate,
          });
  
          cookies().set('session', encryptedToken, {
            expires: expirationDate,
            path: '/',
          });
        }
      } catch (error: any) {
        console.error('Error in signIn callback:', error.message);
        throw new AppError('Error during authentication');
      } finally {
        mongoose.connection.close();
      }

      return true;
    },
  },
};
