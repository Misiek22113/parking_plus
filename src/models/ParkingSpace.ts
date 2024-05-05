import mongoose, { InferSchemaType } from 'mongoose';

const parkingSpaceSchema = new mongoose.Schema({
  spaceNumber: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['free', 'occupied'] as const,
    required: true,
    default: 'free',
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
