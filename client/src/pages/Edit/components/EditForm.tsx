// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// import formValidation from '../../../utils/formValidation';

// import styles from './EditForm.module.css';
// import toast from 'react-hot-toast';
// import { edit } from '../../../api/cars';
// import type { Car } from '../../../types/car';
// import { Form } from '../../../components/Form/Form';
// import { FormField } from '../../../components/Form/FormField';
// import { editSchema } from '../schema';

// type Props = {
//   id: string;
//   car: Car;
//   setCar: React.Dispatch<React.SetStateAction<any>>;
//   newImageFiles: File[];
//   setNewImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
//   setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
// };

// export const EditForm: React.FC<Props> = ({
//   id,
//   car,
//   setCar,
//   newImageFiles,
//   setNewImageFiles,
//   setIsLoading
// }) => {
//   const navigate = useNavigate();

//   const editFormHandler = async (e) => {
//     e.preventDefault();
//     try {
//       setIsLoading(true);
//       const formData = new FormData();

//       for (let [key, value] of Object.entries(car)) {
//         if (key === 'imagesNames') {
//           for (let image of car.imagesNames) {
//             const newImageFile = newImageFiles.find(newImage => newImage.name === image);
//             if (newImageFile) {
//               formData.append('images', newImageFile);
//             } else {
//               formData.append('imagesNames', image);
//             }
//           }
//         } else {
//           formData.append(key, value);
//         }
//       };

//       formValidation(formData, setErrors);

//       await edit(id, formData);

//       return navigate(`/details/${id}`);
//     } catch (error) {
//       if (error.name !== 'ValidationError') {
//         error.message.forEach(err => toast.error(err));
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const imageUploadHandler = (e) => {
//     if (e.target.files.length <= 0) {
//       return;
//     }

//     if (car.imagesNames.length >= 12) {
//       return setErrors(errors => ({ ...errors, images: 'You can upload 12 images at most' }));
//     }

//     setCar(car => ({ ...car, imagesNames: [...car.imagesNames, e.target.files[0].name] }));
//     setNewImageFiles(state => [...state, e.target.files[0]]);
//   };

//   return (
//     <Form id="edit-form" action={`/edit/${id}`} onSubmit={editFormHandler} encType="multipart/form-data" schema={editSchema}>
//       <div className={styles['details']}>
//         <FormField
//           label={<span>Year</span>}
//           name="year"
//           type="number"
//           placeholder="Year"
//         />
//       </div>
//       <div className={styles['details']}>
//         <FormField
//           label={<span>Horse Power</span>}
//           name="horsePower"
//           type="number"
//           placeholder="Horse Power"
//         />
//       </div>
//       <div className={styles['details']}>
//         <FormField
//           label={<span>Gearbox</span>}
//           name="gearbox"
//           type="select"
//           options={[
//             { value: 'Manual', label: 'Manual' },
//             { value: 'Automatic', label: 'Automatic' }
//           ]}
//         />
//       </div>
//       <div className={styles['details']}>
//         <FormField
//           label={<span>Kilometers</span>}
//           name="kilometers"
//           type="number"
//           placeholder="Kilometers"
//         />
//       </div>
//       <div className={styles['details']}>
//         <FormField
//           label={<span>Fuel Type</span>}
//           name="fuelType"
//           type="select"
//           options={[
//             { value: 'Petrol', label: 'Petrol' },
//             { value: 'Diesel', label: 'Diesel' }
//           ]}
//         />
//       </div>
//       <div className={styles['details']}>
//         <FormField
//           label={<span>Description</span>}
//           name="description"
//           type="textarea"
//           placeholder="Description"
//         />
//       </div>
//       <div className={styles['details']}>
//         <FormField
//           label={<span>City</span>}
//           name="city"
//           type="text"
//           placeholder="City"
//         />
//       </div>
//       <div className={styles['details']}>
//         <FormField
//           label={<span>Phone Number</span>}
//           name="phoneNumber"
//           type="text"
//           placeholder="Phone Number"
//         />
//       </div>
//       <div className={styles['details']}>
//         <FormField
//           label={<span>Pictures</span>}
//           name="images"
//           type="file"
//           accept="image/*"
//           onChange={imageUploadHandler}
//         />
//       </div>
//       <div className={styles['price-car-brand']}>
//         <div className={styles['brand']}>
//           <FormField
//             label={<span>Manufacturer</span>}
//             name="manufacturer"
//             type="text"
//             placeholder="Manufacturer"
//           />
//           <FormField
//             label={<span>Model</span>}
//             name="model"
//             type="text"
//             placeholder="Model"
//           />
//         </div>
//       </div>
//       <div className={styles['price']}>
//         <span>$</span>
//         <FormField
//           name="price"
//           type="number"
//           placeholder="Price"
//         />
//       </div>
//     </Form>
//   );
// };
