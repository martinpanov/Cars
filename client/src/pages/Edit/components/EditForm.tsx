import { useNavigate, useParams } from "react-router-dom";

import { useEditCarMutation } from "../../../api/cars";
import { Flex } from "../../../components/Flex/Flex";
import { Form } from "../../../components/Form/Form";
import { FormField } from "../../../components/Form/FormField";
import { Text } from "../../../components/Text/Text";
import type { Car } from "../../../types/car";
import { editSchema } from "../schema";
import styles from "./EditForm.module.css";

type Props = {
  car: Car;
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
};

export const EditForm: React.FC<Props> = ({ car, images, setImages }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { editCar } = useEditCarMutation({ id });

  const editFormHandler = async (formData: FormData) => {
    if (images.length === 0) {
      formData.append("images", "");
    } else {
      images.forEach(image => {
        if (image instanceof File) {
          formData.append("images", image);
        } else {
          formData.append("imagesNames", image);
        }
      });
    }

    await editCar(formData);
    navigate(`/details/${id}`);
  };

  return (
    <Form
      id="edit-form"
      action={`/edit/${id}`}
      onSubmit={editFormHandler}
      encType="multipart/form-data"
      // schema={editSchema} // Temporarily disabled for backend testing
      className={styles["edit-form"]}
    >
      <Flex direction="column" className={styles["edit-form__field"]}>
        <FormField
          label={
            <Text size="md" weight="bold" color="black">
              Year
            </Text>
          }
          name="year"
          type="number"
          placeholder="Year"
          defaultValue={car.year}
        />
      </Flex>
      <Flex direction="column" className={styles["edit-form__field"]}>
        <FormField
          label={
            <Text size="md" weight="bold" color="black">
              Horse Power
            </Text>
          }
          name="horsePower"
          type="number"
          placeholder="Horse Power"
          defaultValue={car.horsePower}
        />
      </Flex>
      <Flex direction="column" className={styles["edit-form__field"]}>
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
          defaultValue={car.gearbox}
        />
      </Flex>
      <Flex direction="column" className={styles["edit-form__field"]}>
        <FormField
          label={
            <Text size="md" weight="bold" color="black">
              Kilometers
            </Text>
          }
          name="kilometers"
          type="number"
          placeholder="Kilometers"
          defaultValue={car.kilometers}
        />
      </Flex>
      <Flex direction="column" className={styles["edit-form__field"]}>
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
          defaultValue={car.fuelType}
        />
      </Flex>
      <Flex direction="column" className={styles["edit-form__field"]}>
        <FormField
          label={
            <Text size="md" weight="bold" color="black">
              Description
            </Text>
          }
          name="description"
          type="textarea"
          placeholder="Description"
          defaultValue={car.description}
        />
      </Flex>
      <Flex direction="column" className={styles["edit-form__field"]}>
        <FormField
          label={
            <Text size="md" weight="bold" color="black">
              City
            </Text>
          }
          name="city"
          type="text"
          placeholder="City"
          defaultValue={car.city}
        />
      </Flex>
      <Flex direction="column" className={styles["edit-form__field"]}>
        <FormField
          label={
            <Text size="md" weight="bold" color="black">
              Phone Number
            </Text>
          }
          name="phoneNumber"
          type="text"
          placeholder="Phone Number"
          defaultValue={car.phoneNumber}
        />
      </Flex>
      <Flex direction="column" className={styles["edit-form__field"]}>
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
        className={styles["edit-form__header"]}
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
            defaultValue={car.manufacturer}
            className={`${styles["edit-form__header-input"]} ${styles["edit-form__brand-input"]}`}
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
            defaultValue={car.model}
            className={`${styles["edit-form__header-input"]} ${styles["edit-form__brand-input"]}`}
          />
        </Flex>
        <Flex align="center">
          <Text size="xl" color="black">
            $
          </Text>
          <FormField
            name="price"
            type="number"
            placeholder="Price"
            defaultValue={car.price}
            className={`${styles["edit-form__header-input"]} ${styles["edit-form__price-input"]}`}
          />
        </Flex>
      </Flex>
    </Form>
  );
};
