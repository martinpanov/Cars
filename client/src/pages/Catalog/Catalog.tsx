import { Link, useSearchParams } from "react-router-dom";

import { useGetCarsQuery } from "../../api/cars";
import { Flex } from "../../components/Flex/Flex";
import { RenderIf } from "../../components/RenderIf";
import { PageSpinner } from "../../components/Spinner/PageSpinner";
import { Text } from "../../components/Text/Text";
import type { Car } from "../../types/car";
import styles from "./Catalog.module.css";
import { CatalogCarCard } from "./components/CatalogCarCard";
import { CatalogForm } from "./components/CatalogForm";
import { Pagination } from "./components/Pagination";

export const Catalog: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { data, isLoading } = useGetCarsQuery({
    queryString: searchParams.toString(),
  });
  const cars = data?.cars || [];
  const hasSearchParams = searchParams.toString() !== "";
  const isCars = cars.length > 0;

  return (
    <Flex justify="center" className={styles["catalog"]}>
      <RenderIf condition={isLoading}>
        <PageSpinner />
      </RenderIf>
      <RenderIf condition={!isLoading}>
        <div className={styles["catalog__container"]}>
          <RenderIf condition={isCars || hasSearchParams}>
            <div className={styles["catalog__form"]}>
              <CatalogForm cars={cars} />
            </div>
          </RenderIf>

          <RenderIf condition={isCars}>
            <Flex
              direction="column"
              gap="xl"
              justify="between"
              className={styles["catalog__cars-listing"]}
            >
              <Flex direction="column" gap="xl">
                {cars.map((car: Car) => (
                  <CatalogCarCard key={car._id} {...car} />
                ))}
              </Flex>
              <Pagination totalPages={data?.pagesCount} />
            </Flex>
          </RenderIf>

          <RenderIf condition={!isCars && hasSearchParams}>
            <Flex
              direction="column"
              align="center"
              gap="lg"
              padding="3xl"
              className={styles["catalog__cars-listing"]}
            >
              <Text size="2xl" color="primary" textAlign="center">
                No cars found
              </Text>
              <Text size="lg" color="black" textAlign="center">
                Try adjusting your search filters to find more cars.
              </Text>
            </Flex>
          </RenderIf>

          <RenderIf condition={!isCars && !hasSearchParams}>
            <Flex
              justify="center"
              align="center"
              direction="column"
              gap="sm"
              className={styles["catalog__no-listings"]}
            >
              <Text size="4xl" color="black">
                No listings yet. Be the first one!
              </Text>
              <Link to="/sell">Create Car Listing</Link>
            </Flex>
          </RenderIf>
        </div>
      </RenderIf>
    </Flex>
  );
};
