import { Link } from "react-router-dom";

import { CloudinaryImage } from "../../../components/CloudinaryImage/CloudinaryImage";
import { Flex } from "../../../components/Flex/Flex";
import { Text } from "../../../components/Text/Text";
import type { Car } from "../../../types/car";
import styles from "./CatalogCardCard.module.css";

export const CatalogCarCard: React.FC<Car> = ({
  _id,
  manufacturer,
  model,
  price,
  city,
  description,
  kilometers,
  gearbox,
  fuelType,
  horsePower,
  imagesNames,
}) => {
  return (
    <Flex justify="between" className={styles["car-card"]}>
      <Link to={`/details/${_id}`}>
        <CloudinaryImage
          publicId={imagesNames[0]}
          width={200}
          height={150}
          crop="fill"
          alt="car"
          className={styles["car-card__image"]}
        />
      </Link>
      <Flex
        direction="column"
        justify="between"
        padding="sm"
        className={styles["car-card__information"]}
      >
        <Text tag="h2" size="xl" color="primary">
          <Link to={`/details/${_id}`}>
            <span>
              {manufacturer} {model}
            </span>
          </Link>
        </Text>
        <Text size="sm" color="black">
          {description.slice(0, 66)}
        </Text>
        <Flex wrap="wrap" gap="sm" className={styles["car-card__specs"]}>
          <Text color="black" tag="span">
            <i className="fa-solid fa-road"></i> {kilometers} km
          </Text>
          <Text color="black" tag="span">
            <i className="fa-solid fa-horse"></i> {horsePower} hp
          </Text>
          <Text color="black" tag="span">
            <i className="fa fa-gears"></i> {gearbox}
          </Text>
          <Text color="black" tag="span">
            <i className="fa fa-gas-pump"></i> {fuelType}
          </Text>
          <Text color="black" tag="span">
            <i className="fa fa-city"></i> {city}
          </Text>
        </Flex>
      </Flex>
      <Flex
        justify="center"
        align="center"
        className={styles["car-card__price"]}
      >
        <Text tag="span" size="lg" color="black">
          ${price}
        </Text>
      </Flex>
    </Flex>
  );
};
