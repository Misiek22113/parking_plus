import { parkingSpaceStatus, parkingSpaceStatusEnum } from '@/constants/enumConstants';
import mongoose, { InferSchemaType } from 'mongoose';

const parkingSpaceSchema = new mongoose.Schema({
  spaceNumber: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: parkingSpaceStatus,
    required: true,
    default: parkingSpaceStatusEnum.free,
  },
});

type ParkingSpaceSchemaType = InferSchemaType<typeof parkingSpaceSchema>;
export interface ParkingSpace
  extends ParkingSpaceSchemaType,
    mongoose.Document {}
export const ParkingSpaceModel =
  mongoose.models.ParkingSpace ||
  mongoose.model<ParkingSpace>('ParkingSpace', parkingSpaceSchema);

export interface FetchParkingSpace {
  _id: string;
  spaceNumber: number;
  status: string;
}
