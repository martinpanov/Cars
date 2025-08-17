export const URL = import.meta.env.PROD
  ? "https://begachka.donttouchmydomain.com:3003"
  : "http://localhost:3003";
export const API_URL = `${URL}/api`;
export const CLOUDINARY_CLOUD_NAME =
  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "your-cloud-name";
export const IMAGES_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/`;
