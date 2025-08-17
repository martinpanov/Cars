export type Car = {
  manufacturer: string;
  model: string;
  price: number;
  year: number;
  phoneNumber: string;
  description?: string;
  gearbox: "Manual" | "Automatic";
  city: string;
  fuelType: "Petrol" | "Diesel";
  horsePower: number;
  kilometers: number;
  imagesNames: string[];
  images: File[];
  _ownerId: string;
  _createdAt?: Date;
  _id: string;
};

export type RentalCar = {
  manufacturer: string;
  model: string;
  price: number;
  year: number;
  gearbox: "Manual" | "Automatic";
  city: string;
  fuelType: "Petrol" | "Diesel";
  doors: string;
  seats: number;
  img: string;
  rentedBy?: string | null;
  isOwner: boolean;
  _id: string;
};
