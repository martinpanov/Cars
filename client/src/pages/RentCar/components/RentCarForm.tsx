import { useSearchParams } from "react-router-dom";
import styles from './RentCarForm.module.css';
import { Form } from "../../../components/Form/Form";
import { FormField } from "../../../components/Form/FormField";
import React from "react";

export const RentCarForm: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const formHandler = (formData: FormData) => {
    const searchParamsObj = Object.fromEntries(
      Array.from(formData.entries())
        .filter(([, value]) => value !== '')
        .map(([key, value]) => [key, String(value)])
    );

    setSearchParams(searchParamsObj);
  };

  return (
    <Form onSubmit={formHandler} className={styles["rent-car-form"]}>
      <FormField
        label={
          <React.Fragment>
            <i className="fa-solid fa-users"></i>
            <span> Seats</span>
          </React.Fragment>
        }
        type="select"
        name="seats"
        placeholder="Any"
        options={[
          { value: '5', label: '5 seats' },
        ]}
      />
      <FormField
        label={
          <React.Fragment>
            <i className="fa-solid fa-door-open"></i>
            <span> Doors</span>
          </React.Fragment>
        }
        type="select"
        name="doors"
        placeholder="Any"
        options={[
          { value: '4/5', label: '4/5 doors' },
        ]}
      />
      <FormField
        label={
          <React.Fragment>
            <i className="fa fa-gears"></i>
            <span> Gearbox</span>
          </React.Fragment>
        }
        type="select"
        name="gearbox"
        placeholder="Any"
        options={[
          { value: 'Manual', label: 'Manual' },
          { value: 'Automatic', label: 'Automatic' },
        ]}
      />
      <FormField
        label={
          <React.Fragment>
            <i className="fa fa-gas-pump"></i>
            <span> Fuel Type</span>
          </React.Fragment>
        }
        type="select"
        name="fuelType"
        placeholder="Any"
        options={[
          { value: 'Petrol', label: 'Petrol' },
          { value: 'Diesel', label: 'Diesel' },
        ]}
      />
      <FormField
        label={
          <React.Fragment>
            <i className="fa fa-city"></i>
            <span> City</span>
          </React.Fragment>
        }
        type="select"
        name="city"
        placeholder="Any"
        options={[
          { value: 'Plovdiv', label: 'Plovdiv' },
          { value: 'Sofia', label: 'Sofia' },
        ]}
      />
      <button className={styles['form-button']}>Search</button>
    </Form>
  );
};