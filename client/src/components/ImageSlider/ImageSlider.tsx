import { useState } from "react";

import { Button } from "../Button/Button";
import { CloudinaryImage } from "../CloudinaryImage/CloudinaryImage";
import { Flex } from "../Flex/Flex";
import { RenderIf } from "../RenderIf";
import styles from "./ImageSlider.module.css";

type Props = {
  imageSources: (File | string)[];
  isEditable?: boolean;
  onDeleteImage?: (index: number) => void;
};

const DEFAULT_IMAGE = "/assets/default-car.webp";

export const ImageSlider: React.FC<Props> = ({
  imageSources = [],
  isEditable = false,
  onDeleteImage,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const renderImage = (image: File | string, width: number, height: number) => {
    if (image instanceof File) {
      return (
        <img
          src={URL.createObjectURL(image)}
          alt="car"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      );
    }

    return <CloudinaryImage publicId={image} width={width} height={height} />;
  };

  const hasImages = imageSources.length > 0;

  const nextImage = () => {
    setCurrentIndex(prev => (prev + 1) % imageSources.length);
  };

  const previousImage = () => {
    setCurrentIndex(
      prev => (prev - 1 + imageSources.length) % imageSources.length
    );
  };

  const deleteImage = index => {
    if (!onDeleteImage) {
      return;
    }

    onDeleteImage(index);

    setCurrentIndex(prev => {
      if (prev >= imageSources.length - 1) {
        return Math.max(0, imageSources.length - 2);
      }
      return prev;
    });
  };

  const renderThumbnails = () => {
    if (!hasImages) {
      return (
        <img
          src={DEFAULT_IMAGE}
          alt="default"
          className={styles["image-slider__thumbnail-image--active"]}
        />
      );
    }

    return imageSources.map((image, index) => {
      const isActive = index === currentIndex;

      if (isActive) {
        return (
          <div
            key={index}
            className={styles["image-slider__thumbnail-container"]}
          >
            <div
              className={`${styles["image-slider__thumbnail-image"]} ${styles["image-slider__thumbnail-image--active"]}`}
              onClick={() => setCurrentIndex(index)}
            >
              {renderImage(image, 120, 80)}
            </div>
            <RenderIf condition={isEditable}>
              <div
                className={styles["image-slider__delete-btn"]}
                onClick={() => deleteImage(index)}
              >
                X
              </div>
            </RenderIf>
          </div>
        );
      }

      return (
        <div
          key={index}
          className={styles["image-slider__thumbnail-container"]}
        >
          <div
            className={styles["image-slider__thumbnail-image"]}
            onClick={() => setCurrentIndex(index)}
          >
            {renderImage(image, 120, 80)}
          </div>
          <RenderIf condition={isEditable}>
            <div
              className={styles["image-slider__delete-btn"]}
              onClick={() => deleteImage(index)}
            >
              X
            </div>
          </RenderIf>
        </div>
      );
    });
  };

  return (
    <div className={styles["image-slider"]}>
      <div className={styles["image-slider__images"]}>
        <div className={styles["image-slider__active-image"]}>
          <RenderIf condition={hasImages}>
            {renderImage(imageSources[currentIndex], 800, 600)}
          </RenderIf>
          <RenderIf condition={!hasImages}>
            <img
              src={DEFAULT_IMAGE}
              alt="car"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </RenderIf>
        </div>
      </div>

      <Button
        variant="tertiary"
        size="xs"
        className={styles["image-slider__back-btn"]}
        onClick={previousImage}
      >
        <i className="fa-solid fa-arrow-left"></i>
      </Button>

      <Button
        variant="tertiary"
        size="xs"
        className={styles["image-slider__next-btn"]}
        onClick={nextImage}
      >
        <i className="fa-sharp fa-solid fa-arrow-right"></i>
      </Button>

      <Flex
        justify="center"
        gap="xs"
        className={styles["image-slider__thumbnails"]}
      >
        {renderThumbnails()}
      </Flex>
    </div>
  );
};
