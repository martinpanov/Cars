import React from "react";
import { useSearchParams } from "react-router-dom";

import { Button } from "../../../components/Button/Button";
import { Form } from "../../../components/Form/Form";
import { FormField } from "../../../components/Form/FormField";
import { Text } from "../../../components/Text/Text";
import styles from "./RentCarForm.module.css";

export const RentCarForm: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const formHandler = (formData: FormData) => {
    const searchParamsObj = Object.fromEntries(
      Array.from(formData.entries())
        .filter(([, value]) => value !== "")
        .map(([key, value]) => [key, String(value)])
    );

    setSearchParams(searchParamsObj);
  };

  return (
    <Form onSubmit={formHandler} className={styles["rent-car-form"]}>
      <FormField
        label={
          <Text size="md" color="black">
            <i className="fa-sharp fa-solid fa-users" />
            <span> Seats</span>
          </Text>
        }
        type="select"
        name="seats"
        placeholder="Any"
        options={[{ value: "5", label: "5 seats" }]}
        className={styles["rent-car-form__field"]}
      />
      <FormField
        label={
          <Text size="md" color="black">
            <i className="fa-solid fa-door-open" />
            <span> Doors</span>
          </Text>
        }
        type="select"
        name="doors"
        placeholder="Any"
        options={[{ value: "4/5", label: "4/5 doors" }]}
        className={styles["rent-car-form__field"]}
      />
      <FormField
        label={
          <Text size="md" color="black">
            <i className="fa fa-gears" />
            <span> Gearbox</span>
          </Text>
        }
        type="select"
        name="gearbox"
        placeholder="Any"
        options={[
          { value: "Manual", label: "Manual" },
          { value: "Automatic", label: "Automatic" },
        ]}
        className={styles["rent-car-form__field"]}
      />
      <FormField
        label={
          <Text size="md" color="black">
            <i className="fa-solid fa-gas-pump" />
            <span> Fuel Type</span>
          </Text>
        }
        type="select"
        name="fuelType"
        placeholder="Any"
        options={[
          { value: "Petrol", label: "Petrol" },
          { value: "Diesel", label: "Diesel" },
        ]}
        className={styles["rent-car-form__field"]}
      />
      <FormField
        label={
          <Text size="md" color="black">
            <i className="fa-solid fa-city" />
            <span> City</span>
          </Text>
        }
        type="select"
        name="city"
        placeholder="Any"
        options={[
          { value: "Plovdiv", label: "Plovdiv" },
          { value: "Sofia", label: "Sofia" },
        ]}
        className={styles["rent-car-form__field"]}
      />
      <Button variant="primary" size="lg">
        Search
      </Button>
    </Form>
  );
};
