import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useEditCarMutation, useGetCarQuery } from "../../api/cars";
import { Button } from "../../components/Button/Button";
import { Flex } from "../../components/Flex/Flex";
import { ImageSlider } from "../../components/ImageSlider/ImageSlider";
import { RenderIf } from "../../components/RenderIf";
import { PageSpinner } from "../../components/Spinner/PageSpinner";
import { Text } from "../../components/Text/Text";
import { EditForm } from "./components/EditForm";
import styles from "./Edit.module.css";

export const Edit: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading: isLoadingQuery } = useGetCarQuery({ id });
  const { editCar, isLoading: isLoadingMutation } = useEditCarMutation({ id });
  const isLoading = isLoadingQuery || isLoadingMutation;
  const car = data || {};
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (car.imagesNames) {
      setImages(car.imagesNames);
    }
  }, [car.imagesNames]);

  return (
    <Flex tag="section" className={styles["edit-page"]}>
      <RenderIf condition={isLoading}>
        <PageSpinner />
      </RenderIf>
      <RenderIf condition={!isLoading}>
        <React.Fragment>
          <Flex
            className={styles["edit-page__content-section"]}
            direction="column"
          >
            <Text tag="h1" size="2xl" textAlign="center">
              Edit Car Ad
            </Text>
            <EditForm car={car} images={images} setImages={setImages} editCar={editCar} />
          </Flex>

          <Flex
            className={styles["edit-page__image-section"]}
            direction="column"
          >
            <Flex justify="start">
              <Button variant="success" size="lg" form="edit-form">
                Edit
              </Button>
            </Flex>
            <ImageSlider
              imageSources={images}
              onDeleteImage={index => {
                setImages(prevImages =>
                  prevImages.filter((_, i) => i !== index)
                );
              }}
            />
          </Flex>
        </React.Fragment>
      </RenderIf>
    </Flex>
  );
};
