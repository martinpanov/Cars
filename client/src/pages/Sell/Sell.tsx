import React, { useState } from "react";
import styles from './Sell.module.css';
import { RenderIf } from "../../components/RenderIf";
import { PageSpinner } from "../../components/Spinner/PageSpinner";
import { SellForm } from "./components/SellForm";
import { ImageSlider } from "../../components/ImageSlider/ImageSlider";
import { useSellCarMutation } from "../../api/cars";

export const Sell: React.FC = () => {
  const { isLoading } = useSellCarMutation();
  const [images, setImages] = useState([]);

  return (
    <section id={styles["sell-page"]}>
      <RenderIf condition={isLoading}>
        <PageSpinner />
      </RenderIf>
      <React.Fragment>
        <div className={styles['car-details-section']}>
          <h1>Post Car Ad</h1>
          <SellForm
            images={images}
            setImages={setImages}
          />
        </div>

        <div className={styles['image-slider-section']}>
          <button type="submit" form="sell-form">Post</button>
          <ImageSlider
            imageSources={images}
            onDeleteImage={(index) => {
              setImages(prev => prev.filter((_, i) => i !== index));
            }}
          />
        </div>
      </React.Fragment>
    </section>
  );
};