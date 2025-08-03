import { useState } from "react";
import styles from './ImageSlider.module.css';
import { IMAGES_URL } from "../../utils/constants";
import { RenderIf } from "../RenderIf";

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

  const getImageSrc = (image) => image instanceof File ? URL.createObjectURL(image) : `${IMAGES_URL}${image}`;

  const hasImages = imageSources.length > 0;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % imageSources.length);
  };

  const previousImage = () => {
    setCurrentIndex((prev) => (prev - 1 + imageSources.length) % imageSources.length);
  };

  const deleteImage = (index) => {
    if (!onDeleteImage) {
      return;
    }

    onDeleteImage(index);

    setCurrentIndex((prev) => {
      if (prev >= imageSources.length - 1) {
        return Math.max(0, imageSources.length - 2);
      }
      return prev;
    });
  };

  const renderThumbnails = () => {
    if (!hasImages) {
      return <img src={DEFAULT_IMAGE} alt="default" className={styles["active"]} />;
    }

    return imageSources.map((image, index) => {
      const isActive = index === currentIndex;

      if (isActive) {
        return (
          <img
            key={index}
            src={getImageSrc(image)}
            alt="carThumbnail"
            className={styles["active"]}
          />
        );
      }

      return (
        <div key={index} className={styles["thumbnail-container"]}>
          <img
            src={getImageSrc(image)}
            alt="carThumbnail"
            onClick={() => setCurrentIndex(index)}
          />
          <RenderIf condition={isEditable}>
            <div className={styles["delete-btn"]} onClick={() => deleteImage(index)}>
              X
            </div>
          </RenderIf>
        </div>
      );
    });
  };

  return (
    <div className={styles["image-slider"]}>
      <div className={styles["images"]}>
        <img
          src={hasImages ? getImageSrc(imageSources[currentIndex]) : DEFAULT_IMAGE}
          alt="car"
          className={styles["active"]}
        />
      </div>

      <div className={styles["back-btn"]} onClick={previousImage}>
        <i className="fa-solid fa-arrow-left"></i>
      </div>

      <div className={styles["next-btn"]} onClick={nextImage}>
        <i className="fa-sharp fa-solid fa-arrow-right"></i>
      </div>

      <div className={styles["thumbnails"]}>
        {renderThumbnails()}
      </div>
    </div>
  );
};
