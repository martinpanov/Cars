import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useDeleteCarMutation, useGetCarQuery } from "../../api/cars";
import { Button } from "../../components/Button/Button";
import { Flex } from "../../components/Flex/Flex";
import { ImageSlider } from "../../components/ImageSlider/ImageSlider";
import { RenderIf } from "../../components/RenderIf";
import { PageSpinner } from "../../components/Spinner/PageSpinner";
import { Text } from "../../components/Text/Text";
import { UserContext } from "../../contexts/UserContext";
import { CarDetails } from "./components/CarDetails";
import styles from "./Details.module.css";

export const Details: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { data, isLoading, error } = useGetCarQuery({ id });
  const { deleteCar } = useDeleteCarMutation();
  const car = data || {};
  const isOwner = user && user.userId === car._ownerId;

  useEffect(() => {
    if (error) {
      navigate("/catalog");
    }
  }, [error, navigate]);

  const deletedHandler = async () => {
    await deleteCar({ id });

    navigate("/catalog");
  };

  return (
    <Flex tag="section" className={styles["details-page"]}>
      <RenderIf condition={isLoading}>
        <PageSpinner />
      </RenderIf>
      <RenderIf condition={!isLoading && car}>
        <div className={styles["details-page__image-section"]}>
          <Flex
            justify="between"
            align="center"
            className={styles["details-page__header"]}
          >
            <div>
              <Text tag="h1" size="3xl" weight="bold">
                {car.manufacturer} {car.model}
              </Text>
              <Text tag="h2" size="xl" weight="bold" color="info">
                ${car.price}
              </Text>
            </div>

            <RenderIf condition={isOwner}>
              <Flex className={styles["details-page__actions"]}>
                <Button
                  variant="success"
                  size="lg"
                  onClick={() => navigate(`/edit/${id}`)}
                >
                  Edit
                </Button>
                <Button variant="error" size="lg" onClick={deletedHandler}>
                  Delete
                </Button>
              </Flex>
            </RenderIf>
          </Flex>

          <ImageSlider imageSources={car.imageNames} />
        </div>

        <CarDetails car={car} />
      </RenderIf>
    </Flex>
  );
};
