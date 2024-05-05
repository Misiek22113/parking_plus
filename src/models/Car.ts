import mongoose, { InferSchemaType } from 'mongoose';

const carSchema = new mongoose.Schema({
  registrationPlate: {
    type: String,
    required: true,
    minLength: 7,
    maxLength: 8,
    match: /^[A-Z]{2,3}\s?[A-Z0-9]{4,5}$/,
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

export interface FetchCar {
  _id: string;
  registrationPlate: string;
}
