import React, { useMemo, useState } from "react";
import styles from './CatalogForm.module.css';
import { Form } from "../../../components/Form/Form";
import { FormField } from "../../../components/Form/FormField";
import type { Car } from "../../../types/car";
import { useSearchParams } from "react-router-dom";

export const CatalogForm: React.FC<{ cars: Car[]; }> = ({ cars }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [manufacturer, setManufacturer] = useState('');
  const uniqueCities: string[] = [...new Set(cars.map(car => car.city))];
  const uniqueManufacturers: string[] = [...new Set(cars.map(car => car.manufacturer))];
  const earliestYear = Math.min(...cars.map(car => car.year));
  const availableModels = useMemo(() =>
    manufacturer
      ? cars.filter(car => car.manufacturer === manufacturer)
      : [],
    [cars, manufacturer]
  );

  const searchFormHandler = async (formData: FormData) => {
    const searchParamsObj = Object.fromEntries(
      Array.from(formData.entries())
        .filter(([, value]) => value !== '')
        .map(([key, value]) => [key, String(value)])
    );

    setSearchParams(searchParamsObj);
  };

  return (
    <Form onSubmit={searchFormHandler} className={styles["search-form"]}>
      <div className={styles["form-column"]}>
        <FormField
          onChange={(e) => setManufacturer(e.target.value)}
          label={
            <React.Fragment>
              <i className="fa-solid fa-car" />
              <span> Manufacturer</span>
            </React.Fragment>
          }
          name="manufacturer"
          type="select"
          placeholder="Any"
          options={uniqueManufacturers.map(manufacturer => ({ value: manufacturer, label: manufacturer }))}
        />
        <FormField
          label={
            <React.Fragment>
              <i className="fa-solid fa-car" />
              <span> Model</span>
            </React.Fragment>
          }
          name="model"
          type="select"
          placeholder="Any"
          options={availableModels.map(car => ({ value: car.model, label: car.model }))}
        />
        <FormField
          label={
            <React.Fragment>
              <i className="fa fa-calendar" />
              <span> Year</span>
            </React.Fragment>
          }
          name="year"
          type="select"
          placeholder="Any"
          options={[{ value: earliestYear, label: `After ${earliestYear}` }]}
        />
        <FormField
          label={
            <React.Fragment>
              <i className="fa-solid fa-money-bill" />
              <span> From Price</span>
            </React.Fragment>
          }
          name="fromPrice"
          type="number"
          placeholder="From Price"
        />
        <FormField
          label={
            <React.Fragment>
              <i className="fa-solid fa-money-bill" />
              <span> To Price</span>
            </React.Fragment>
          }
          name="toPrice"
          type="number"
          placeholder="To Price"
        />
        <FormField
          label={
            <React.Fragment>
              <i className="fa fa-gears" />
              <span> Gearbox</span>
            </React.Fragment>
          }
          name="gearbox"
          type="select"
          placeholder="Any"
          options={[
            { value: 'Manual', label: 'Manual' },
            { value: 'Automatic', label: 'Automatic' }
          ]}
        />
      </div>
      <div className={styles["form-column"]}>
        <FormField
          label={
            <React.Fragment>
              <i className="fa-solid fa-city" />
              <span> City</span>
            </React.Fragment>
          }
          name="city"
          type="select"
          placeholder="Any"
          options={uniqueCities.map(city => ({ value: city, label: city }))}
        />
        <FormField
          label={
            <React.Fragment>
              <i className="fa-solid fa-gas-pump" />
              <span> Fuel Type</span>
            </React.Fragment>
          }
          name="fuelType"
          type="select"
          placeholder="Any"
          options={[
            { value: 'Petrol', label: 'Petrol' },
            { value: 'Diesel', label: 'Diesel' }
          ]}
        />
        <FormField
          label={
            <React.Fragment>
              <i className="fa-solid fa-horse" />
              <span> From HP</span>
            </React.Fragment>
          }
          name="fromHp"
          type="number"
          placeholder="From HP"
        />
        <FormField
          label={
            <React.Fragment>
              <i className="fa-solid fa-horse" />
              <span> To HP</span>
            </React.Fragment>
          }
          name="toHp"
          type="number"
          placeholder="To HP"
        />
        <FormField
          label={
            <React.Fragment>
              <i className="fa-solid fa-road" />
              <span> From KM</span>
            </React.Fragment>
          }
          name="fromKm"
          type="number"
          placeholder="From KM"
        />
        <FormField
          label={
            <React.Fragment>
              <i className="fa-solid fa-road" />
              <span> To KM</span>
            </React.Fragment>
          }
          name="toKm"
          type="number"
          placeholder="To KM"
        />
      </div>
      <button type="submit">Search</button>
    </Form>
  );
};