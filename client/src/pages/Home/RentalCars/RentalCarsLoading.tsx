import { Flex } from "../../../components/Flex/Flex";
import { LoadingSkeleton } from "../../../components/LoadingSkeleton/LoadingSkeleton";
import styles from "./RentalCars.module.css";

export const RentalCarsLoading: React.FC = () => {
  return (
    <Flex
      gap="4xl"
      align="center"
      className={styles["rental-cars-section__cars"]}
    >
      <Flex direction="column" justify="center" gap="md">
        {Array.from({ length: 5 }).map((_, index) => (
          <LoadingSkeleton
            key={index}
            width="220px"
            height="56px"
            borderRadius="8px"
          />
        ))}
      </Flex>

      <Flex
        justify="center"
        align="center"
        className={styles["rental-cars-section__image-container"]}
      >
        <LoadingSkeleton width="500px" height="350px" borderRadius="12px" />
      </Flex>

      <Flex direction="column" gap="lg">
        <Flex direction="column" gap="sm">
          <LoadingSkeleton width="252px" height="60px" borderRadius="4px" />

          <Flex gap="sm">
            <Flex direction="column" gap="sm">
              {Array.from({ length: 5 }).map((_, index) => (
                <LoadingSkeleton
                  key={index}
                  width="124px"
                  height="50px"
                  borderRadius="4px"
                />
              ))}
            </Flex>

            <Flex direction="column" gap="sm">
              {Array.from({ length: 5 }).map((_, index) => (
                <LoadingSkeleton
                  key={index}
                  width="120px"
                  height="50px"
                  borderRadius="4px"
                />
              ))}
            </Flex>
          </Flex>
        </Flex>

        <LoadingSkeleton width="252px" height="56px" borderRadius="8px" />
      </Flex>
    </Flex>
  );
};
