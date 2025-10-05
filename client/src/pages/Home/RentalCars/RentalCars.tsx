import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGetRentCarsQuery, useRentCarMutation } from "../../../api/rent-car";
import { Button } from "../../../components/Button/Button";
import { Flex } from "../../../components/Flex/Flex";
import { RenderIf } from "../../../components/RenderIf";
import { ButtonSpinner } from "../../../components/Spinner/ButtonSpinner";
import { Text } from "../../../components/Text/Text";
import { UserContext } from "../../../contexts/UserContext";
import { EmptyState } from "../components/EmptyState";
import styles from "./RentalCars.module.css";
import { RentalCarsLoading } from "./RentalCarsLoading";

export const RentalCars: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [selectedCarId, setSelectedCarId] = useState("");
  const {
    data,
    getRentCars,
    isLoading: isQueryLoading,
  } = useGetRentCarsQuery();
  const { isLoading: isMutationLoading, rentCar } = useRentCarMutation();

  const cars = useMemo(() => {
    return (
      data?.sort(
        (a, b) => Number(Boolean(a.rentedBy)) - Number(Boolean(b.rentedBy))
      ) || []
    );
  }, [data]);
  const rentalCar =
    cars.find(car => car._id === selectedCarId) || cars[0] || {};
  const isOwner = user && user.userId === rentalCar.rentedBy;

  useEffect(() => {
    if (!selectedCarId && cars.length > 0) {
      setSelectedCarId(cars[0]._id);
    }
  }, [cars, selectedCarId]);

  const rentClickHandler = async () => {
    if (!user) {
      return navigate("/login");
    }

    await rentCar({ carId: selectedCarId });
    await getRentCars();
  };

  const renderConditionalButton = () => {
    if (
      (!user && rentalCar.rentedBy) ||
      (user && rentalCar.rentedBy && !isOwner)
    ) {
      return null;
    }

    const buttonText =
      user && rentalCar.rentedBy && isOwner ? "Cancel Rent" : "Rent Now";

    return (
      <Button
        onClick={rentClickHandler}
        disabled={isMutationLoading || isQueryLoading}
        variant="primary"
        size="lg"
      >
        {isMutationLoading || isQueryLoading ? (
          <ButtonSpinner height="30" />
        ) : (
          buttonText
        )}
      </Button>
    );
  };

  return (
    <section className={styles["rental-cars-section"]}>
      <img
        src="/assets/wave-haikei6.svg"
        alt="Wave background"
        className={styles["rental-cars-section__background"]}
      />

      <Flex
        direction="column"
        justify="center"
        align="center"
        gap="2xl"
        className={styles["rental-cars-section__content"]}
      >
        <Text tag="h2" size="3xl" color="black" textAlign="center">
          Rent a Reliable and Comfortable Car for Your Next Adventure
        </Text>

        <RenderIf condition={isQueryLoading}>
          <RentalCarsLoading />
        </RenderIf>
        <RenderIf condition={!isQueryLoading && cars && cars.length > 0}>
          <Flex
            gap="4xl"
            align="center"
            className={styles["rental-cars-section__cars"]}
          >
            <Flex direction="column" justify="center" gap="md">
              <RenderIf condition={cars}>
                {cars.map(car => (
                  <Button
                    key={car._id}
                    onClick={() => setSelectedCarId(car._id)}
                    variant="secondary"
                    size="lg"
                  >
                    {car.manufacturer} {car.model}
                  </Button>
                ))}
              </RenderIf>
            </Flex>

            <Flex
              justify="center"
              align="center"
              className={styles["rental-cars-section__image-container"]}
            >
              <img
                src={rentalCar.rentedBy ? "/assets/rented.webp" : rentalCar.img}
                alt={
                  rentalCar.rentedBy
                    ? "Rented"
                    : `${rentalCar.manufacturer} ${rentalCar.model}`
                }
                className={styles["rental-cars-section__image"]}
              />
            </Flex>

            <Flex direction="column" gap="lg">
              <div>
                <div className={styles["rental-cars-section__price"]}>
                  <Text weight="bold" color="black" size="lg">
                    ${rentalCar.price} / rent per day
                  </Text>
                </div>

                <Flex
                  gap="none"
                  className={styles["rental-cars-section__spec-columns"]}
                >
                  <Flex
                    direction="column"
                    gap="none"
                    className={styles["rental-cars-section__spec-labels"]}
                  >
                    {["Manufacturer", "Model", "Year", "Transmission", "Fuel"].map(label => <Text color="black">{label}</Text>)}
                  </Flex>

                  <Flex
                    direction="column"
                    gap="none"
                    className={styles["rental-cars-section__spec-values"]}
                  >
                    {[rentalCar.manufacturer, rentalCar.model, rentalCar.year, rentalCar.gearbox, rentalCar.fuelType]
                      .map(value => <Text color="black">{value}</Text>)
                    }
                  </Flex>
                </Flex>
              </div>

              {renderConditionalButton()}
            </Flex>
          </Flex>
        </RenderIf>

        <RenderIf condition={!isQueryLoading && (!cars || cars.length === 0)}>
          <EmptyState
            icon="fa-solid fa-key"
            title="No rental cars available"
            description="Rental fleet is currently being updated"
            buttonText="Browse Cars for Sale"
            buttonTo="/catalog"
            variant="primary"
          />
        </RenderIf>
      </Flex>
    </section>
  );
};
