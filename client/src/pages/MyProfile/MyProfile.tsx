import { useContext, useState } from "react";

import {
  useGetUserCarsQuery,
  useGetUserRentCarsQuery,
} from "../../api/profile";
import { Button } from "../../components/Button/Button";
import { Flex } from "../../components/Flex/Flex";
import { RenderIf } from "../../components/RenderIf";
import { MyProfileSpinner } from "../../components/Spinner/MyProfileSpinner";
import { Text } from "../../components/Text/Text";
import { UserContext } from "../../contexts/UserContext";
import { MyProfileCarCard } from "./components/MyProfileCarsCard";
import { MyProfilePicture } from "./components/MyProfilePicture";
import styles from "./MyProfile.module.css";

export const MyProfile: React.FC = () => {
  const { user } = useContext(UserContext);
  const [showCatalogCars, setShowCatalogCars] = useState(true);
  const userCarsQuery = useGetUserCarsQuery();
  const userRentCarsQuery = useGetUserRentCarsQuery();
  const catalogCars = userCarsQuery.data || [];
  const rentCars = userRentCarsQuery.data || [];
  const isLoading = userCarsQuery.isLoading || userRentCarsQuery.isLoading;

  return (
    <Flex tag="section" justify="center" className={styles["my-profile"]}>
      <Flex direction="column" className={styles["my-profile__content"]}>
        <Flex gap="lg" className={styles["my-profile__details"]}>
          <MyProfilePicture />
          <Flex direction="column">
            <Text tag="h2" size="xl" color="secondary" weight="bold">
              {user.username}
            </Text>
            <Flex>
              <Text tag="span" color="secondary">
                {catalogCars ? catalogCars.length : 0} car listings
              </Text>
              <Text tag="span" color="secondary">
                {rentCars ? rentCars.length : 0} rented cars
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Flex justify="center" gap="lg">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowCatalogCars(true)}
          >
            CAR LISTINGS
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowCatalogCars(false)}
          >
            RENTED CARS
          </Button>
        </Flex>

        <Flex wrap="wrap" gap="xl" justify="center" align="center" padding="lg">
          <RenderIf condition={isLoading}>
            <MyProfileSpinner />
          </RenderIf>
          <RenderIf condition={!isLoading}>
            {(showCatalogCars ? catalogCars : rentCars).map(car => (
              <MyProfileCarCard
                key={car._id}
                car={car}
                isRental={!showCatalogCars}
              />
            ))}
          </RenderIf>
        </Flex>
      </Flex>
    </Flex>
  );
};
