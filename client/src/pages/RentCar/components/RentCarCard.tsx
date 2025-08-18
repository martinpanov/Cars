import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { useRentCarMutation } from "../../../api/rent-car";
import { Button } from "../../../components/Button/Button";
import { Flex } from "../../../components/Flex/Flex";
import { ButtonSpinner } from "../../../components/Spinner/ButtonSpinner";
import { Text } from "../../../components/Text/Text";
import { UserContext } from "../../../contexts/UserContext";
import type { RentalCar } from "../../../types/car";
import styles from "./RentCarCard.module.css";

type Props = {
  car: RentalCar;
  getRentCars: () => Promise<void>;
};

export const RentCarCard: React.FC<Props> = ({ car, getRentCars }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { isLoading, rentCar } = useRentCarMutation();
  const isOwner = user && car.rentedBy === user.userId;

  const rentClickHandler = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    await rentCar({ carId: car._id });
    await getRentCars();
  };

  const renderConditionalButton = () => {
    if ((!user && car.rentedBy) || (user && car.rentedBy && !isOwner)) {
      return null;
    }

    const buttonText =
      user && car.rentedBy && isOwner ? "Cancel Rent" : "Rent Now";

    return (
      <Button
        onClick={rentClickHandler}
        disabled={isLoading}
        variant="primary"
        size="lg"
      >
        {isLoading ? <ButtonSpinner height="30" /> : buttonText}
      </Button>
    );
  };

  return (
    <Flex
      direction="column"
      justify="between"
      gap="none"
      className={styles["rent-car-card"]}
    >
      <img
        src={car.rentedBy ? "/assets/rented.webp" : car.img}
        alt={`${car.manufacturer} ${car.model} rental car`}
        className={styles["rent-car-card__image"]}
      />

      <Flex direction="column" gap="lg" padding="md">
        <Text textAlign="center" size="xl" weight="bold" color="primary">
          {car.manufacturer} {car.model}
        </Text>

        <Flex wrap="wrap" justify="between" gap="lg">
          <Text color="black" className={styles["rent-car-card__spec"]}>
            <i className="fa-sharp fa-solid fa-users"></i> {car.seats} seats
          </Text>
          <Text color="black" className={styles["rent-car-card__spec"]}>
            <i className="fa-solid fa-door-open"></i> {car.doors} doors
          </Text>
          <Text color="black" className={styles["rent-car-card__spec"]}>
            <i className="fa-solid fa-snowflake"></i> A/C
          </Text>
          <Text color="black" className={styles["rent-car-card__spec"]}>
            <i className="fa fa-gears"></i> {car.gearbox}
          </Text>
          <Text color="black" className={styles["rent-car-card__spec"]}>
            <i className="fa fa-gas-pump"></i> {car.fuelType}
          </Text>
          <Text color="black" className={styles["rent-car-card__spec"]}>
            <i className="fa fa-city"></i> {car.city}
          </Text>
        </Flex>

        <Text textAlign="center" className={styles["rent-car-card__price"]}>
          ${car.price} / day
        </Text>
        {renderConditionalButton()}
      </Flex>
    </Flex>
  );
};
