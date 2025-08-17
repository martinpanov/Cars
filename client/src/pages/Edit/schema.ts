export const editSchema = {
  manufacturer: {
    type: "string",
    required: true,
    minLength: 2,
    maxLength: 50,
    errorMessage: "Manufacturer must be between 2 and 50 characters long.",
  },
  model: {
    type: "string",
    required: true,
    minLength: 1,
    maxLength: 50,
    errorMessage: "Model must be between 1 and 50 characters long.",
  },
  price: {
    type: "number",
    required: true,
    min: 0,
    errorMessage: "Price must be a positive number.",
  },
  year: {
    type: "number",
    required: true,
    min: 1886, // The year the first car was invented
    max: new Date().getFullYear(),
    errorMessage: "Year must be between 1886 and the current year.",
  },
  phoneNumber: {
    type: "string",
    required: true,
    pattern: /^\+?[0-9\s\-()]{7,15}$/,
    errorMessage:
      "Phone number must be between 7 and 15 characters long and can include digits, spaces, dashes, and parentheses.",
  },
  description: {
    type: "string",
    required: false,
    maxLength: 500,
    errorMessage: "Description must not exceed 500 characters.",
  },
  gearbox: {
    type: "string",
    required: true,
    enum: ["Manual", "Automatic"],
    errorMessage: "Gearbox must be either Manual or Automatic.",
  },
  city: {
    type: "string",
    required: true,
    minLength: 2,
    maxLength: 50,
    errorMessage: "City must be between 2 and 50 characters long.",
  },
  fuelType: {
    type: "string",
    required: true,
    enum: ["Petrol", "Diesel"],
    errorMessage: "Fuel type must be either Petrol or Diesel.",
  },
  horsePower: {
    type: "number",
    required: true,
    min: 0,
    errorMessage: "Horsepower must be a positive number.",
  },
  kilometers: {
    type: "number",
    required: true,
    min: 0,
    errorMessage: "Kilometers must be a positive number.",
  },
  images: {
    type: "array",
    required: true,
    minItems: 1,
    maxItems: 10,
    items: {
      type: "string",
      format: "data-url",
      errorMessage: "Each image must be a valid data URL.",
    },
    errorMessage:
      "You must upload at least one image and no more than ten images.",
  },
};
