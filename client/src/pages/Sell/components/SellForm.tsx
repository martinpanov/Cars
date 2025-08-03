import { useNavigate } from 'react-router-dom';
import { useSellCarMutation } from '../../../api/cars';
import styles from './SellForm.module.css';
import { sellSchema } from '../schema';
import { Form } from '../../../components/Form/Form';
import { FormField } from '../../../components/Form/FormField';

type Props = {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
};

export const SellForm: React.FC<Props> = ({
  images,
  setImages,
}) => {
  const navigate = useNavigate();
  const { sellCar } = useSellCarMutation();

  const sellFormHandler = async (formData: FormData) => {
    if (images.length === 0) {
      formData.append('images', '');
    } else {
      images.forEach(image => formData.append('images', image));
    }

    await sellCar(formData);
    navigate('/catalog');
  };

  return (
    <Form id="sell-form" action='/sell' onSubmit={sellFormHandler} schema={sellSchema} encType="multipart/form-data">
      <div className={styles['details']}>
        <FormField
          label={<span>Year</span>}
          name="year"
          type="number"
          placeholder="Year"
        />
      </div>
      <div className={styles['details']}>
        <FormField
          label={<span>Horse Power</span>}
          name="horsePower"
          type="number"
          placeholder="Horse Power"
        />
      </div>
      <div className={styles['details']}>
        <FormField
          label={<span>Gearbox</span>}
          name="gearbox"
          type="select"
          options={[
            { value: 'Manual', label: 'Manual' },
            { value: 'Automatic', label: 'Automatic' }
          ]}
        />
      </div>
      <div className={styles['details']}>
        <FormField
          label={<span>Kilometers</span>}
          name="kilometers"
          type="number"
          placeholder="Kilometers"
        />
      </div>
      <div className={styles['details']}>
        <FormField
          label={<span>Fuel Type</span>}
          name="fuelType"
          type="select"
          options={[
            { value: 'Petrol', label: 'Petrol' },
            { value: 'Diesel', label: 'Diesel' }
          ]}
        />
      </div>
      <div className={styles['details']}>
        <FormField
          label={<span>Description</span>}
          name="description"
          type="textarea"
          placeholder="Description"
        />
      </div>
      <div className={styles['details']}>
        <FormField
          label={<span>City</span>}
          name="city"
          type="text"
          placeholder="City"
        />
      </div>
      <div className={styles['details']}>
        <FormField
          label={<span>Phone Number</span>}
          name="phoneNumber"
          type="text"
          placeholder="Phone Number"
        />
      </div>
      <div className={styles['details']}>
        <FormField
          label={<span>Pictures</span>}
          name="images"
          type="file"
          accept="image/*"
          onChange={(e) => setImages(images => ([...images, e.target.files[0]]))}
        />
      </div>
      <div className={styles['price-car-brand']}>
        <div className={styles['brand']}>
          <FormField
            label={<span>Manufacturer</span>}
            name="manufacturer"
            type="text"
            placeholder="Manufacturer"
          />
          <FormField
            label={<span>Model</span>}
            name="model"
            type="text"
            placeholder="Model"
          />
        </div>
        <div className={styles['price']}>
          <span>$</span>
          <FormField
            label={<span>Price</span>}
            name="price"
            type="number"
            placeholder="Price"
          />
        </div>
      </div>
    </Form>
  );
};
