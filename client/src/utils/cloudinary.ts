import { Cloudinary } from "@cloudinary/url-gen";
import { dpr,format, quality } from "@cloudinary/url-gen/actions/delivery";
import { crop,fill, fit, scale } from "@cloudinary/url-gen/actions/resize";

import { CLOUDINARY_CLOUD_NAME } from "./constants";

// Initialize Cloudinary instance
const cld = new Cloudinary({
  cloud: {
    cloudName: CLOUDINARY_CLOUD_NAME,
  },
});

type CloudinaryOptions = {
  width?: number;
  height?: number;
  crop?: "fill" | "fit" | "scale" | "crop";
  quality?: "auto" | "best" | "eco" | "low" | number;
  format?: "auto" | "webp" | "jpg" | "png";
  dpr?: "auto" | number;
};

/**
 * Generate a Cloudinary URL with dynamic transformations
 */
export function getCloudinaryUrl(
  publicId: string,
  options?: CloudinaryOptions
): string {
  const {
    width,
    height,
    crop: cropType = "fill",
    quality: qualityType = "auto",
    format: formatType = "auto",
    dpr: dprValue = "auto",
  } = options || {};

  let image = cld.image(`cars/${publicId}`);

  // Apply resizing
  if (width && height) {
    switch (cropType) {
      case "fill":
        image = image.resize(fill().width(width).height(height));
        break;
      case "fit":
        image = image.resize(fit().width(width).height(height));
        break;
      case "scale":
        image = image.resize(scale().width(width).height(height));
        break;
      case "crop":
        image = image.resize(crop().width(width).height(height));
        break;
    }
  } else if (width) {
    image = image.resize(scale().width(width));
  } else if (height) {
    image = image.resize(scale().height(height));
  }

  // Apply quality
  image = image.delivery(quality(qualityType));

  // Apply format
  image = image.delivery(format(formatType));

  // Apply DPR
  if (dprValue === "auto") {
    image = image.delivery(dpr("auto"));
  } else if (typeof dprValue === "number") {
    image = image.delivery(dpr(dprValue));
  }

  return image.toURL();
}

/**
 * Predefined image sizes for common use cases
 */
export const ImageSizes = {
  thumbnail: { width: 150, height: 100, crop: "fill" as const },
  card: { width: 300, height: 200, crop: "fill" as const },
  detail: { width: 800, height: 600, crop: "fit" as const },
  hero: { width: 1200, height: 400, crop: "fill" as const },
  profile: { width: 150, height: 150, crop: "fill" as const },
} as const;

/**
 * Generate responsive image URLs for different screen sizes
 */
export function getResponsiveImageUrls(
  publicId: string,
  baseOptions?: CloudinaryOptions
) {
  return {
    mobile: getCloudinaryUrl(publicId, { ...baseOptions, width: 400 }),
    tablet: getCloudinaryUrl(publicId, { ...baseOptions, width: 800 }),
    desktop: getCloudinaryUrl(publicId, { ...baseOptions, width: 1200 }),
  };
}

// Export the Cloudinary instance for advanced usage
export { cld };
