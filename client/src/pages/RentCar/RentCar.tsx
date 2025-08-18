import { useSearchParams } from "react-router-dom";

import { useGetRentCarsQuery } from "../../api/rent-car";
import { Flex } from "../../components/Flex/Flex";
import { RenderIf } from "../../components/RenderIf";
import { PageSpinner } from "../../components/Spinner/PageSpinner";
import { Text } from "../../components/Text/Text";
import type { RentalCar } from "../../types/car";
import { RentCarCard } from "./components/RentCarCard";
import { RentCarForm } from "./components/RentCarForm";
import styles from "./RentCar.module.css";

export const RentCar: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { data, isLoading, getRentCars } = useGetRentCarsQuery({
    queryString: searchParams.toString(),
  });
  const rentCars = data || [];

  return (
    <Flex justify="center" className={styles["rent-car-page"]}>
      <RenderIf condition={isLoading}>
        <PageSpinner />
      </RenderIf>
      <RenderIf condition={!isLoading}>
        <div className={styles["rent-car-page__container"]}>
          <div className={styles["rent-car-page__form"]}>
            <RentCarForm />
          </div>

          <RenderIf condition={rentCars && rentCars.length > 0}>
            <div className={styles["rent-car-page__cars-grid"]}>
              {rentCars.map((car: RentalCar) => (
                <RentCarCard
                  key={car._id}
                  car={car}
                  getRentCars={getRentCars}
                />
              ))}
            </div>
          </RenderIf>

          <RenderIf condition={rentCars && rentCars.length === 0}>
            <Flex
              direction="column"
              align="center"
              gap="lg"
              padding="3xl"
              className={styles["rent-car-page__no-results"]}
            >
              <Text size="2xl" color="primary" textAlign="center">
                No rental cars found
              </Text>
              <Text size="lg" color="black" textAlign="center">
                Try adjusting your search filters to find more rental cars.
              </Text>
            </Flex>
          </RenderIf>
        </div>
      </RenderIf>
    </Flex>
  );
};
