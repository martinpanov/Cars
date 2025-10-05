import { Flex } from "../../../components/Flex/Flex";
import { Text } from "../../../components/Text/Text";
import type { Car } from "../../../types/car";
import styles from "./CarDetails.module.css";

export const CarDetails: React.FC<{ car: Car; }> = ({ car }) => {
  const carDetails = [
    { label: "Year", value: car.year },
    { label: "Horse Power", value: car.horsePower },
    { label: "Gearbox", value: car.gearbox },
    { label: "Kilometers", value: car.kilometers },
    { label: "Fuel Type", value: car.fuelType },
    { label: "Description", value: car.description },
    { label: "City", value: car.city },
    { label: "Phone Number", value: car.phoneNumber },
  ];
  return (
    <div className={styles["car-details"]}>
      {carDetails.map((detail) => (
        <Flex direction="column" gap="md" className={styles["car-details__item"]}>
          <Text weight="bold" size="md" color="black">
            {detail.label}
          </Text>
          <Text color="black" size="md">
            {detail.value}
          </Text>
        </Flex>
      ))}

      <Flex
        justify="between"
        align="center"
        className={styles["car-details__header"]}
      >
        <Text tag="h2" color="black" size="xl" weight="bold">
          {car.manufacturer} {car.model}
        </Text>
        <Text
          tag="h3"
          size="xl"
          weight="bold"
          color="secondary"
          className={styles["car-details__price"]}
        >
          ${car.price}
        </Text>
      </Flex>
    </div>
  );
};
