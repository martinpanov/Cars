export const URL = import.meta.env.PROD
  ? "https://cars.yoannabest.com"
  : "http://localhost:3003";
export const API_URL = `${URL}/api`;
export const CLOUDINARY_CLOUD_NAME = "dbunbye7y";
export const IMAGES_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/`;
