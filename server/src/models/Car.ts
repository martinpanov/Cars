import { Document, model, Schema, Types } from 'mongoose';

export type ICar = Document & {
  manufacturer: string;
  model: string;
  price: number;
  year: number;
  phoneNumber: string;
  description?: string;
  gearbox: 'Manual' | 'Automatic';
  city: string;
  fuelType: 'Petrol' | 'Diesel';
  horsePower: number;
  kilometers: number;
  imagesNames: string[];
  _ownerId: Types.ObjectId;
  _createdAt: Date;
}

const carSchema = new Schema({
  manufacturer: {
    type: String, required: true,
    validate: {
      validator: (value: string) => value.length >= 2 && value.length <= 50,
      message: 'Manufacturer must be between 2 and 50 characters long'
    }
  },
  model: {
    type: String, required: true,
    validate: {
      validator: (value: string) => value.length >= 1 && value.length <= 50,
      message: 'Model must be between 1 and 50 characters long'
    }
  },
  price: { type: Number, required: true, min: [0, 'Price must be a positive number'] },
  year: {
    type: Number, required: true, validate: {
      validator: (value: number) => value >= 1886 && value <= new Date().getFullYear(),
      message: `Year must be between 1886 and ${new Date().getFullYear()}`
    }
  },
  phoneNumber: {
    type: String, required: true, validate: {
      validator: (value: string) => /^\+?[0-9\s\-()]{7,15}$/.test(value),
      message: 'Phone number must be between 7 and 15 characters long and can include digits, spaces, dashes, and parentheses'
    }
  },
  description: {
    type: String,
    validate: {
      validator: function(value: string) {
        if (!value) return true; // Optional field
        return value.length >= 5 && value.length <= 500;
      },
      message: 'Description must be between 5 and 500 characters long'
    }
  },
  gearbox: {
    type: String, required: true, validate: {
      validator: (value: string) => value === 'Manual' || value === 'Automatic',
      message: 'Gearbox must be either Manual or Automatic'
    }
  },
  city: {
    type: String, required: true,
    validate: {
      validator: (value: string) => value.length >= 2 && value.length <= 50,
      message: 'City must be between 2 and 50 characters long'
    }
  },
  fuelType: {
    type: String, required: true, validate: {
      validator: (value: string) => value === 'Petrol' || value === 'Diesel',
      message: 'Fuel type must be either Petrol or Diesel'
    }
  },
  horsePower: { type: Number, required: true, min: [0, 'Horsepower must be a positive number'] },
  kilometers: { type: Number, required: true, min: [0, 'Kilometers must be a positive number'] },
  imagesNames: {
    type: [{ type: String, required: true }],
    validate: {
      validator: (images: string[]) => images.length >= 1,
      message: 'You must upload at least one image'
    }
  },
  _ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  _createdAt: { type: Date, default: Date.now }
});

const Car = model<ICar>('Car', carSchema);

export default Car;