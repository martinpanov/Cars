import { Document, model, Schema, Types } from 'mongoose';

type IRentCar = Document & {
  manufacturer: string;
  model: string;
  price: number;
  year: number;
  gearbox: string;
  city: string;
  fuelType: string;
  doors: string;
  seats: number;
  img: string;
  rentedBy?: Types.ObjectId;
};

const rentCarSchema = new Schema({
  manufacturer: { type: String, required: true },
  model: { type: String, required: true },
  price: { type: Number, required: true },
  year: { type: Number, required: true },
  gearbox: { type: String, required: true },
  city: { type: String, required: true },
  fuelType: { type: String, required: true },
  doors: { type: String, required: true },
  seats: { type: Number, required: true },
  img: { type: String, required: true },
  rentedBy: { type: Schema.Types.ObjectId, ref: 'User' }
});

const RentCar = model<IRentCar>("RentCar", rentCarSchema);

export default RentCar;