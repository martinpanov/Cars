import React, { useState } from "react";

import { useSellCarMutation } from "../../api/cars";
import { Button } from "../../components/Button/Button";
import { Flex } from "../../components/Flex/Flex";
import { ImageSlider } from "../../components/ImageSlider/ImageSlider";
import { RenderIf } from "../../components/RenderIf";
import { PageSpinner } from "../../components/Spinner/PageSpinner";
import { Text } from "../../components/Text/Text";
import { SellForm } from "./components/SellForm";
import styles from "./Sell.module.css";

export const Sell: React.FC = () => {
  const { isLoading } = useSellCarMutation();
  const [images, setImages] = useState([]);

  return (
    <Flex tag="section" className={styles["sell-page"]}>
      <RenderIf condition={isLoading}>
        <PageSpinner />
      </RenderIf>

      <Flex className={styles["sell-page__content-section"]} direction="column">
        <Text tag="h1" size="2xl" textAlign="center">
          Post Car Ad
        </Text>
        <SellForm images={images} setImages={setImages} />
      </Flex>

      <Flex className={styles["sell-page__image-section"]} direction="column">
        <Flex justify="start">
          <Button variant="primary" size="lg" form="sell-form">
            Post
          </Button>
        </Flex>
        <ImageSlider
          imageSources={images}
          onDeleteImage={index => {
            setImages(prev => prev.filter((_, i) => i !== index));
          }}
        />
      </Flex>
    </Flex>
  );
};
