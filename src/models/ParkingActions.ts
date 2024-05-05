import { parkingActionsStatus } from '@/constants/enumConstants';
import mongoose, { InferSchemaType } from 'mongoose';

const parkingActionsSchema = new mongoose.Schema({
  spaceNumber: {
    type: Number,
    required: true,
  },
  parkingSpaceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'ParkingSpace',
  },
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Car',
  },
  status: {
    type: String,
    enum: parkingActionsStatus,
    required: true,
  },
  parkTime: {
    type: Date,
    required: true,
  },
  leaveTime: {
    type: Date,
    default: null,
  },
});

type ParkingActionsSchemaType = InferSchemaType<typeof parkingActionsSchema>;
export interface ParkingActions
  extends ParkingActionsSchemaType,
    mongoose.Document {}
export const ParkingActionsModel =
  mongoose.models.ParkingActions ||
  mongoose.model<ParkingActions>('ParkingActions', parkingActionsSchema);

export interface FetchParkingAction {
  _id: string;
  parkingSpaceId: string;
  parkingSpaceNumber: number;
  carId: string;
  carRegistrationPlate: string;
  status: string;
  parkTime: Date;
  leaveTime: Date | null;
}
