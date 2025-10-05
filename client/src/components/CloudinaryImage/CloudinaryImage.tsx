import { AdvancedImage } from "@cloudinary/react";
import { format, quality } from "@cloudinary/url-gen/actions/delivery";
import { fill, fit, scale } from "@cloudinary/url-gen/actions/resize";

import { cld } from "../../utils/cloudinary";

type CloudinaryImageProps = {
  publicId: string;
  width?: number | string;
  height?: number | string;
  crop?: "fill" | "fit" | "scale";
  className?: string;
  alt?: string;
};

export const CloudinaryImage: React.FC<CloudinaryImageProps> = ({
  publicId,
  width = 800,
  height = 600,
  crop = "fit",
  className,
  alt = "car image",
}) => {
  const getCloudinaryImage = () => {
    let image = cld
      .image(`cars/${publicId}`)
      .delivery(quality("auto"))
      .delivery(format("auto"));

    // Use numeric dimensions for Cloudinary optimization, fallback to reasonable defaults
    const cloudinaryWidth = typeof width === "number" ? width : 800;
    const cloudinaryHeight = typeof height === "number" ? height : 600;

    switch (crop) {
      case "fill":
        image = image.resize(
          fill().width(cloudinaryWidth).height(cloudinaryHeight)
        );
        break;
      case "fit":
        image = image.resize(
          fit().width(cloudinaryWidth).height(cloudinaryHeight)
        );
        break;
      case "scale":
        image = image.resize(
          scale().width(cloudinaryWidth).height(cloudinaryHeight)
        );
        break;
    }

    return image;
  };

  return (
    <AdvancedImage
      cldImg={getCloudinaryImage()}
      alt={alt}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
      }}
    />
  );
};
