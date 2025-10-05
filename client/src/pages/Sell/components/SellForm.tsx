import { useNavigate } from "react-router-dom";

import { Flex } from "../../../components/Flex/Flex";
import { Form } from "../../../components/Form/Form";
import { FormField } from "../../../components/Form/FormField";
import { Text } from "../../../components/Text/Text";
import { sellSchema } from "../schema";
import styles from "./SellForm.module.css";

type Props = {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  sellCar: (formData: FormData) => Promise<any>;
};

export const SellForm: React.FC<Props> = ({ images, setImages, sellCar }) => {
  const navigate = useNavigate();

  const sellFormHandler = async (formData: FormData) => {
    if (images.length === 0) {
      formData.append("images", "");
    } else {
      images.forEach(image => formData.append("images", image));
    }

    const result = await sellCar(formData);
    if (result) {
      navigate("/catalog");
    }
  };

  return (
    <Form
      id="sell-form"
      action="/sell"
      onSubmit={sellFormHandler}
      schema={sellSchema}
      encType="multipart/form-data"
      className={styles["sell-form"]}
    >
      <Flex direction="column" gap="md" className={styles["sell-form__item"]}>
        <FormField
          label={
            <Text size="md" weight="bold" color="black">
              Year
            </Text>
          }
          name="year"
          type="number"
          placeholder="Year"
        />
      </Flex>

      <Flex direction="column" gap="md" className={styles["sell-form__item"]}>
        <FormField
          label={
            <Text size="md" weight="bold" color="black">
              Horse Power
            </Text>
          }
          name="horsePower"
          type="number"
          placeholder="Horse Power"
        />
      </Flex>

      <Flex direction="column" gap="md" className={styles["sell-form__item"]}>
        <FormField
          label={
            <Text size="md" weight="bold" color="black">
              Gearbox
            </Text>
          }
          name="gearbox"
          type="select"
          options={[
            { value: "Manual", label: "Manual" },
            { value: "Automatic", label: "Automatic" },
          ]}
        />
      </Flex>

      <Flex direction="column" gap="md" className={styles["sell-form__item"]}>
        <FormField
          label={
            <Text size="md" weight="bold" color="black">
              Kilometers
            </Text>
          }
          name="kilometers"
          type="number"
          placeholder="Kilometers"
        />
      </Flex>

      <Flex direction="column" gap="md" className={styles["sell-form__item"]}>
        <FormField
          label={
            <Text size="md" weight="bold" color="black">
              Fuel Type
            </Text>
          }
          name="fuelType"
          type="select"
          options={[
            { value: "Petrol", label: "Petrol" },
            { value: "Diesel", label: "Diesel" },
          ]}
        />
      </Flex>

      <Flex direction="column" gap="md" className={styles["sell-form__item"]}>
        <FormField
          label={
            <Text size="md" weight="bold" color="black">
              Description
            </Text>
          }
          name="description"
          type="textarea"
          placeholder="Description"
        />
      </Flex>

      <Flex direction="column" gap="md" className={styles["sell-form__item"]}>
        <FormField
          label={
            <Text size="md" weight="bold" color="black">
              City
            </Text>
          }
          name="city"
          type="text"
          placeholder="City"
        />
      </Flex>

      <Flex direction="column" gap="md" className={styles["sell-form__item"]}>
        <FormField
          label={
            <Text size="md" weight="bold" color="black">
              Phone Number
            </Text>
          }
          name="phoneNumber"
          type="text"
          placeholder="Phone Number"
        />
      </Flex>

      <Flex direction="column" gap="md" className={styles["sell-form__item"]}>
        <FormField
          label={
            <Text size="md" weight="bold" color="black">
              Pictures
            </Text>
          }
          name="images"
          type="file"
          accept="image/*"
          onChange={e => setImages(images => [...images, e.target.files[0]])}
        />
      </Flex>

      <Flex
        justify="between"
        align="center"
        className={styles["sell-form__header"]}
      >
        <Flex direction="column" gap="lg">
          <FormField
            label={
              <Text size="md" weight="bold" color="black">
                Manufacturer
              </Text>
            }
            name="manufacturer"
            type="text"
            placeholder="Manufacturer"
            className={`${styles["sell-form__header-input"]} ${styles["sell-form__brand-input"]}`}
          />
          <FormField
            label={
              <Text size="md" weight="bold" color="black">
                Model
              </Text>
            }
            name="model"
            type="text"
            placeholder="Model"
            className={`${styles["sell-form__header-input"]} ${styles["sell-form__brand-input"]}`}
          />
        </Flex>
        <Flex align="center">
          <Text color="black" size="xl">
            $
          </Text>
          <FormField
            name="price"
            type="number"
            placeholder="Price"
            className={`${styles["sell-form__header-input"]} ${styles["sell-form__price-input"]}`}
          />
        </Flex>
      </Flex>
    </Form>
  );
};
