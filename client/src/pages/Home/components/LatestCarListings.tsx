import { Link } from "react-router-dom";

import { useGetCarsQuery } from "../../../api/cars";
import { CloudinaryImage } from "../../../components/CloudinaryImage/CloudinaryImage";
import { Flex } from "../../../components/Flex/Flex";
import { RenderIf } from "../../../components/RenderIf";
import { Text } from "../../../components/Text/Text";
import styles from "./LatestCarListings.module.css";

export const LatestCarListings: React.FC = () => {
  const { data = [] } = useGetCarsQuery();

  return (
    <Flex
      tag="section"
      direction="column"
      align="center"
      gap="2xl"
      padding="3xl"
      className={styles["latest-car-listings"]}
    >
      <Text tag="h2" size="3xl" color="secondary">
        Latest car listings
      </Text>
      <RenderIf condition={data?.cars && data.cars.length > 0}>
        <Flex wrap="wrap" justify="center" gap="lg">
          {data?.cars?.map(car => (
            <Flex
              key={car._id}
              direction="column"
              gap="none"
              className={styles["latest-car-listings__card"]}
            >
              <div className={styles["latest-car-listings__image-container"]}>
                <Link to={`/details/${car._id}`}>
                  <CloudinaryImage
                    publicId={car.imagesNames[0]}
                    width={300}
                    height={240}
                    crop="fill"
                    alt={`${car.manufacturer} ${car.model}`}
                    className={styles["latest-car-listings__image"]}
                  />
                </Link>
              </div>
              <div className={styles["latest-car-listings__specs"]}>
                <Link
                  to={`/details/${car._id}`}
                  className={styles["latest-car-listings__manufacturer"]}
                >
                  {car.manufacturer} {car.model}
                </Link>
                <Text color="black" textAlign="center">
                  <i className="fa-solid fa-road"></i> {car.kilometers} km
                </Text>
                <Text color="black" textAlign="center">
                  <i className="fa-solid fa-horse"></i> {car.horsePower} hp
                </Text>
                <Text color="black" textAlign="center">
                  <i className="fa fa-gears"></i> {car.gearbox}
                </Text>
                <Text color="black" textAlign="center">
                  <i className="fa fa-gas-pump"></i> {car.fuelType}
                </Text>
                <Text
                  textAlign="center"
                  color="black"
                  size="xl"
                  className={styles["latest-car-listings__price"]}
                >
                  ${car.price}
                </Text>
              </div>
            </Flex>
          ))}
        </Flex>
      </RenderIf>
    </Flex>
  );
};
