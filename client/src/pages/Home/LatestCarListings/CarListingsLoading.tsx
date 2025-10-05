import { Flex } from "../../../components/Flex/Flex";
import { LoadingSkeleton } from "../../../components/LoadingSkeleton/LoadingSkeleton";
import styles from "./LatestCarListings.module.css";

export const CarListingsLoading: React.FC = () => {
  return (
    <Flex wrap="wrap" justify="center" gap="lg">
      {Array.from({ length: 5 }).map((_, index) => (
        <Flex
          key={index}
          direction="column"
          gap="none"
          className={styles["latest-car-listings__card"]}
        >
          <div className={styles["latest-car-listings__image-container"]}>
            <LoadingSkeleton
              width="300px"
              height="240px"
              borderRadius="8px 8px 0 0"
            />
          </div>
          <div className={styles["latest-car-listings__specs"]}>
            <LoadingSkeleton
              width="100%"
              height="30px"
              borderRadius="4px"
              className={styles["latest-car-listings__manufacturer"]}
            />
            <LoadingSkeleton width="100%" height="24px" />
            <LoadingSkeleton width="100%" height="24px" />
            <LoadingSkeleton width="100%" height="24px" />
            <LoadingSkeleton width="100%" height="24px" />
            <LoadingSkeleton
              width="100%"
              height="30px"
              borderRadius="4px"
              className={styles["latest-car-listings__price"]}
            />
          </div>
        </Flex>
      ))}
    </Flex>
  );
};
