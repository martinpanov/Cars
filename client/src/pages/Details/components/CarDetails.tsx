import { Flex } from "../../../components/Flex/Flex";
import { Text } from "../../../components/Text/Text";
import type { Car } from "../../../types/car";
import styles from "./CarDetails.module.css";

export const CarDetails: React.FC<{ car: Car }> = ({ car }) => {
  return (
    <div className={styles["car-details"]}>
      <Flex direction="column" gap="md" className={styles["car-details__item"]}>
        <Text weight="bold" size="md" color="black">
          Year
        </Text>
        <Text color="black" size="md">
          {car.year}
        </Text>
      </Flex>

      <Flex direction="column" gap="md" className={styles["car-details__item"]}>
        <Text weight="bold" size="md" color="black">
          Horse Power
        </Text>
        <Text color="black" size="md">
          {car.horsePower}
        </Text>
      </Flex>

      <Flex direction="column" gap="md" className={styles["car-details__item"]}>
        <Text weight="bold" size="md" color="black">
          Gearbox
        </Text>
        <Text color="black" size="md">
          {car.gearbox}
        </Text>
      </Flex>

      <Flex direction="column" gap="md" className={styles["car-details__item"]}>
        <Text weight="bold" size="md" color="black">
          Kilometers
        </Text>
        <Text color="black" size="md">
          {car.kilometers}
        </Text>
      </Flex>

      <Flex direction="column" gap="md" className={styles["car-details__item"]}>
        <Text weight="bold" size="md" color="black">
          Fuel Type
        </Text>
        <Text color="black" size="md">
          {car.fuelType}
        </Text>
      </Flex>

      <Flex direction="column" gap="md" className={styles["car-details__item"]}>
        <Text weight="bold" size="md" color="black">
          Description
        </Text>
        <Text color="black" size="md">
          {car.description}
        </Text>
      </Flex>

      <Flex direction="column" gap="md" className={styles["car-details__item"]}>
        <Text weight="bold" size="md" color="black">
          City
        </Text>
        <Text color="black" size="md">
          {car.city}
        </Text>
      </Flex>

      <Flex direction="column" gap="md" className={styles["car-details__item"]}>
        <Text weight="bold" size="md" color="black">
          Phone Number
        </Text>
        <Text color="black" size="md">
          {car.phoneNumber}
        </Text>
      </Flex>

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
