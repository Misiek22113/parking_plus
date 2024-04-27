import mongoose, { InferSchemaType } from 'mongoose';

const carSchema = new mongoose.Schema({
  registrationPlate: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

type CarSchemaType = InferSchemaType<typeof carSchema>;
export interface Car extends CarSchemaType, mongoose.Document {}
export const CarModel =
  mongoose.models.Car || mongoose.model<Car>('Car', carSchema);
