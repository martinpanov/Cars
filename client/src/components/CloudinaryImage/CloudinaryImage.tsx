import { AdvancedImage } from "@cloudinary/react";
import { format,quality } from "@cloudinary/url-gen/actions/delivery";
import { fill, fit, scale } from "@cloudinary/url-gen/actions/resize";

import { cld } from "../../utils/cloudinary";

type CloudinaryImageProps = {
  publicId: string;
  width?: number;
  height?: number;
  crop?: "fill" | "fit" | "scale";
  className?: string;
  alt?: string;
  onClick?: () => void;
};

export const CloudinaryImage: React.FC<CloudinaryImageProps> = ({
  publicId,
  width = 300,
  height = 200,
  crop = "fill",
  className,
  alt = "car image",
  onClick,
}) => {
  const getCloudinaryImage = () => {
    let image = cld
      .image(`cars/${publicId}`)
      .delivery(quality("auto"))
      .delivery(format("auto"));

    switch (crop) {
      case "fill":
        image = image.resize(fill().width(width).height(height));
        break;
      case "fit":
        image = image.resize(fit().width(width).height(height));
        break;
      case "scale":
        image = image.resize(scale().width(width).height(height));
        break;
    }

    return image;
  };

  return (
    <AdvancedImage
      cldImg={getCloudinaryImage()}
      alt={alt}
      className={className}
      onClick={onClick}
      style={{
        width,
        height,
        objectFit: "cover",
        cursor: onClick ? "pointer" : "default",
      }}
    />
  );
};
