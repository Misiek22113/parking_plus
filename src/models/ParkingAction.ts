import { parkingActionStatus } from '@/constants/enumConstants';
import mongoose, { InferSchemaType } from 'mongoose';

const parkingActionSchema = new mongoose.Schema({
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
    enum: parkingActionStatus,
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

type ParkingActionSchemaType = InferSchemaType<typeof parkingActionSchema>;
export interface ParkingAction
  extends ParkingActionSchemaType,
    mongoose.Document {}
export const ParkingActionsModel =
  mongoose.models.ParkingAction ||
  mongoose.model<ParkingAction>('ParkingAction', parkingActionSchema);

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
