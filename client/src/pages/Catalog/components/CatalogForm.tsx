import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Button } from "../../../components/Button/Button";
import { Flex } from "../../../components/Flex/Flex";
import { Form } from "../../../components/Form/Form";
import { FormField } from "../../../components/Form/FormField";
import { Text } from "../../../components/Text/Text";
import type { Car } from "../../../types/car";
import styles from "./CatalogForm.module.css";

export const CatalogForm: React.FC<{ cars: Car[]; }> = ({ cars }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [manufacturer, setManufacturer] = useState("");
  const uniqueCities: string[] = [...new Set(cars.map(car => car.city))];
  const uniqueManufacturers: string[] = [
    ...new Set(cars.map(car => car.manufacturer)),
  ];
  const earliestYear = Math.min(...cars.map(car => car.year));
  const availableModels = useMemo(
    () =>
      manufacturer ? cars.filter(car => car.manufacturer === manufacturer) : [],
    [cars, manufacturer]
  );

  const searchFormHandler = async (formData: FormData) => {
    const searchParamsObj = Object.fromEntries(
      Array.from(formData.entries())
        .filter(([, value]) => value !== "")
        .map(([key, value]) => [key, String(value)])
    );

    setSearchParams(searchParamsObj);
  };

  return (
    <Form onSubmit={searchFormHandler} className={styles["catalog-form"]}>
      <Flex direction="column" gap="lg">
        <FormField
          onChange={e => setManufacturer(e.target.value)}
          label={
            <Text size="md" color="black">
              <i className="fa-solid fa-car" />
              <span> Manufacturer</span>
            </Text>
          }
          name="manufacturer"
          type="select"
          placeholder="Any"
          options={uniqueManufacturers.map(manufacturer => ({
            value: manufacturer,
            label: manufacturer,
          }))}
          className={styles["catalog-form__field"]}
        />
        <FormField
          label={
            <Text size="md" color="black">
              <i className="fa-solid fa-car" />
              <span> Model</span>
            </Text>
          }
          name="model"
          type="select"
          placeholder="Any"
          options={availableModels.map(car => ({
            value: car.model,
            label: car.model,
          }))}
          className={styles["catalog-form__field"]}
        />
        <FormField
          label={
            <Text size="md" color="black">
              <i className="fa fa-calendar" />
              <span> Year</span>
            </Text>
          }
          name="year"
          type="select"
          placeholder="Any"
          options={[{ value: earliestYear, label: `After ${earliestYear}` }]}
          className={styles["catalog-form__field"]}
        />
        <FormField
          label={
            <Text size="md" color="black">
              <i className="fa-solid fa-money-bill" />
              <span> From Price</span>
            </Text>
          }
          name="fromPrice"
          type="number"
          placeholder="From Price"
          className={styles["catalog-form__field"]}
        />
        <FormField
          label={
            <Text size="md" color="black">
              <i className="fa-solid fa-money-bill" />
              <span> To Price</span>
            </Text>
          }
          name="toPrice"
          type="number"
          placeholder="To Price"
          className={styles["catalog-form__field"]}
        />
        <FormField
          label={
            <Text size="md" color="black">
              <i className="fa fa-gears" />
              <span> Gearbox</span>
            </Text>
          }
          name="gearbox"
          type="select"
          placeholder="Any"
          options={[
            { value: "Manual", label: "Manual" },
            { value: "Automatic", label: "Automatic" },
          ]}
          className={styles["catalog-form__field"]}
        />
      </Flex>
      <Flex direction="column" gap="lg">
        <FormField
          label={
            <Text size="md" color="black">
              <i className="fa-solid fa-city" />
              <span> City</span>
            </Text>
          }
          name="city"
          type="select"
          placeholder="Any"
          options={uniqueCities.map(city => ({ value: city, label: city }))}
          className={styles["catalog-form__field"]}
        />
        <FormField
          label={
            <Text size="md" color="black">
              <i className="fa-solid fa-gas-pump" />
              <span> Fuel Type</span>
            </Text>
          }
          name="fuelType"
          type="select"
          placeholder="Any"
          options={[
            { value: "Petrol", label: "Petrol" },
            { value: "Diesel", label: "Diesel" },
          ]}
          className={styles["catalog-form__field"]}
        />
        <FormField
          label={
            <Text size="md" color="black">
              <i className="fa-solid fa-horse" />
              <span> From HP</span>
            </Text>
          }
          name="fromHp"
          type="number"
          placeholder="From HP"
          className={styles["catalog-form__field"]}
        />
        <FormField
          label={
            <Text size="md" color="black">
              <i className="fa-solid fa-horse" />
              <span> To HP</span>
            </Text>
          }
          name="toHp"
          type="number"
          placeholder="To HP"
          className={styles["catalog-form__field"]}
        />
        <FormField
          label={
            <Text size="md" color="black">
              <i className="fa-solid fa-road" />
              <span> From KM</span>
            </Text>
          }
          name="fromKm"
          type="number"
          placeholder="From KM"
          className={styles["catalog-form__field"]}
        />
        <FormField
          label={
            <Text size="md" color="black">
              <i className="fa-solid fa-road" />
              <span> To KM</span>
            </Text>
          }
          name="toKm"
          type="number"
          placeholder="To KM"
          className={styles["catalog-form__field"]}
        />
      </Flex>
      <Button
        variant="primary"
        size="md"
        className={styles["catalog-form__submit-button"]}
      >
        Search
      </Button>
    </Form>
  );
};
