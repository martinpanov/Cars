import { Types } from 'mongoose';

import Car, { ICar } from '../models/Car';
import RentCar from '../models/RentCar';
import { getUser } from './userService';

export async function getAll() {
  const count = await Car.countDocuments();
  const cars = await Car.find().sort({ _createdAt: 'desc' }).limit(5);
  return {
    count, cars
  };
}

export async function getUserCars(userId: string | Types.ObjectId) {
  return Car.find({ _ownerId: userId });
}

export async function getHomeCars() {
  return Car.find().sort({ _createdAt: 'desc' }).limit(4);
}

export async function getById(id: string) {
  return Car.findById(id);
}

type FilterQuery = {
  year?: { $gte: number };
  price?: { $gte?: number; $lte?: number };
  horsePower?: { $gte?: number; $lte?: number };
  kilometers?: { $gte?: number; $lte?: number };
  manufacturer?: string;
  model?: string;
  gearbox?: string;
  city?: string;
  fuelType?: string;
};

export async function getFiltered(
  manufacturer?: string,
  model?: string,
  fromPrice?: number,
  toPrice?: number,
  year?: number,
  gearbox?: string,
  city?: string,
  fuelType?: string,
  fromHp?: number,
  toHp?: number,
  fromKm?: number,
  toKm?: number,
  page: number = 1
) {
  const query: FilterQuery = {};
  
  if (year) {
    query.year = { $gte: year };
  }
  if (fromPrice || toPrice) {
    query.price = { $gte: fromPrice || 1, $lte: toPrice || 99999999999 };
  }
  if (fromHp || toHp) {
    query.horsePower = { $gte: fromHp || 1, $lte: toHp || 5000 };
  }
  if (fromKm || toKm) {
    query.kilometers = { $gte: fromKm || 0, $lte: toKm || 99999999999 };
  }
  if (manufacturer) {
    query.manufacturer = manufacturer;
  }
  if (model) {
    query.model = model;
  }
  if (gearbox) {
    query.gearbox = gearbox;
  }
  if (city) {
    query.city = city;
  }
  if (fuelType) {
    query.fuelType = fuelType;
  }

  const skipIndex = (page - 1) * 5;

  const count = await Car.countDocuments(query);
  const cars = await Car.find(query).sort({ _createdAt: 'desc' }).limit(5).skip(skipIndex);

  return {
    count,
    cars
  };
}

export async function create(car: Partial<ICar>) {
  return Car.create(car);
}

export async function deleteById(id: string) {
  return Car.deleteOne({ _id: id });
}

type UpdateCarData = {
  manufacturer: string;
  model: string;
  price: string | number;
  year: string | number;
  phoneNumber: string | number;
  kilometers: string | number;
  description?: string;
  gearbox: string;
  horsePower: string | number;
  city: string;
  fuelType: string;
  imagesNames: string[];
};

export async function update(id: string, carData: UpdateCarData) {
  const car = await Car.findById(id);
  
  if (!car) {
    throw new Error('Car not found');
  }

  // Update car properties
  car.manufacturer = carData.manufacturer;
  (car as any).model = carData.model;
  car.price = Number(carData.price);
  car.year = Number(carData.year);
  car.phoneNumber = String(carData.phoneNumber);
  car.kilometers = Number(carData.kilometers);
  car.gearbox = carData.gearbox as 'Manual' | 'Automatic';
  car.horsePower = Number(carData.horsePower);
  car.city = carData.city;
  car.fuelType = carData.fuelType as 'Petrol' | 'Diesel';
  car.imagesNames = carData.imagesNames;
  
  // Only update description if provided
  if (carData.description !== undefined) {
    car.description = carData.description;
  }

  await car.save();
  return car;
}

export async function getRentCars() {
  return RentCar.find({});
}

export async function getUserRentCars(userId: string | Types.ObjectId) {
  return RentCar.find({ rentedBy: userId });
}

type RentCarFilterQuery = {
  seats?: number;
  doors?: string;
  gearbox?: string;
  fuelType?: string;
  city?: string;
};

export async function getFilteredRentCars(
  seats?: number,
  doors?: string,
  gearbox?: string,
  fuelType?: string,
  city?: string
) {
  const query: RentCarFilterQuery = {};
  
  if (seats) {
    query.seats = seats;
  }
  if (doors) {
    query.doors = doors;
  }
  if (gearbox) {
    query.gearbox = gearbox;
  }
  if (fuelType) {
    query.fuelType = fuelType;
  }
  if (city) {
    query.city = city;
  }

  return RentCar.find(query);
}

export async function rentCar(carId: string, userId: string | Types.ObjectId) {
  const car = await RentCar.findById(carId);
  
  if (!car) {
    throw new Error('Car not found');
  }

  // Toggle rental status - if already rented by this user, return it; otherwise rent it
  if (car.rentedBy?.toString() === userId.toString()) {
    car.rentedBy = null as any;
  } else {
    car.rentedBy = userId as Types.ObjectId;
  }

  await car.save();
  return car;
}

export async function getProfilePicture(username: string) {
  const user = await getUser(username);
  return user.profilePicture;
}

export async function postProfilePicture(username: string, picture: string) {
  const user = await getUser(username);

  user.profilePicture = picture;

  await user.save();

  return user.profilePicture;
}