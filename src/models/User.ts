import mongoose, { InferSchemaType } from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
  },
  credits: {
    type: Number,
    min: 0,
    default: 0,
  },
  userRole: {
    type: String,
    enum: ['user', 'admin'] as const,
    default: 'user',
  },
});

type UserSchemaType = InferSchemaType<typeof userSchema>;
export interface User extends UserSchemaType, mongoose.Document {}
export const UserModel =
  mongoose.models.User || mongoose.model<User>('User', userSchema);

export interface FetchUser {
  _id: string;
  credits: number;
}
