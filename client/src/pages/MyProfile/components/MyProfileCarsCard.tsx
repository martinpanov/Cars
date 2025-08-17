import { Link } from "react-router-dom";

import { CloudinaryImage } from "../../../components/CloudinaryImage/CloudinaryImage";
import { Flex } from "../../../components/Flex/Flex";
import { RenderIf } from "../../../components/RenderIf";
import { Text } from "../../../components/Text/Text";
import type { Car, RentalCar } from "../../../types/car";
import styles from "./MyProfileCars.module.css";

type Props = {
  car: Car | RentalCar;
  isRental: boolean;
};

export const MyProfileCarCard: React.FC<Props> = ({ car, isRental }) => {
  return (
    <Link to={!isRental ? `/details/${car._id}` : "/rentcar"}>
      <Flex
        direction="column"
        gap="lg"
        className={styles["my-profile-car-card"]}
      >
        <RenderIf condition={!isRental}>
          <CloudinaryImage
            publicId={(car as Car).imagesNames[0]}
            width={250}
            height={180}
            crop="fill"
            alt={`${car.manufacturer} ${car.model}`}
            className={styles["my-profile-car-card__image"]}
          />
        </RenderIf>
        <RenderIf condition={isRental}>
          <img
            src={(car as RentalCar).img}
            alt={`${car.manufacturer} ${car.model}`}
            className={styles["my-profile-car-card__image"]}
          />
        </RenderIf>
        <Text size="lg" color="secondary">
          {car.manufacturer} {car.model}
        </Text>
      </Flex>
    </Link>
  );
};
