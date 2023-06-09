import { useNavigate } from 'react-router-dom';
import styles from './EditForm.module.css';
import { edit } from '../../services/carService';
import { useState } from 'react';


export default function EditForm({
    id,
    car,
    setCar,
    newImageFiles,
    setNewImageFiles,
    setIsLoading
}) {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const editFormHandler = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();

            for (let [key, value] of Object.entries(car)) {
                if (key === 'imagesNames') {
                    for (let image of car?.imagesNames) {
                        const newImageFile = newImageFiles.find(newImage => newImage.name === image);
                        if (newImageFile) {
                            formData.append('images', newImageFile);
                        } else {
                            formData.append('imagesNames', image);
                        }
                    }
                } else {
                    formData.append(key, value);
                }
            };

            formValidation(formData);

            if (Object.keys(errors).length > 0) {
                return;
            }

            setIsLoading(true);

            await edit(id, formData);

            setIsLoading(false);

            return navigate(`/details/${id}`);
        } catch (error) {
            console.log(error);
        }
    };

    const changeHandler = (e) => {
        setCar(car => ({ ...car, [e.target.name]: e.target.value }));
    };

    const imageUploadHandler = (e) => {
        if (e.target.files.length <= 0) {
            return;
        }

        if (car?.imagesNames.length >= 12) {
            return setErrors(errors => ({ ...errors, images: 'You can upload 12 images at most' }));
        }

        setCar(car => ({ ...car, imagesNames: [...car?.imagesNames, e.target.files[0].name] }));
        setNewImageFiles(state => [...state, e.target.files[0]]);
    };

    const formValidation = (formData) => {
        let errors = {};
        for (let [key, value] of formData.entries()) {
            if (key === 'year' && (value < 1900 || value > 2023)) {
                errors.year = 'Year must be between 1900 and 2023';
            }
            if (key === 'horsePower' && value < 1) {
                errors.horsePower = 'HP must be at least 1';
            }
            if (key === 'gearbox' && (value !== 'Manual' && value !== 'Automatic')) {
                errors.gearbox = 'Gearbox must be either manual or automatic';
            }
            if (key === 'kilometers' && value < 1) {
                errors.kilometers = 'Kilometers must be at least 1';
            }
            if (key === 'fuelType' && (value !== 'Petrol' && value !== 'Diesel')) {
                errors.fuelType = 'Fuel type must be either petrol or diesel';
            }
            if (key === 'description' && value.length < 5) {
                errors.description = 'Description must be at least 5 characters long';
            }
            if (key === 'city' && value.length < 3) {
                errors.city = 'The city must be at least 3 characters long';
            }
            if (key === 'phoneNumber' && value < 9) {
                errors.phoneNumber = 'Phone Number must be at least 9 characters long';
            }
            if (key === 'manufacturer' && value.length < 2) {
                errors.manufacturer = 'Manufacturer must be at least 2 characters long';
            }
            if (key === 'model' && value.length < 1) {
                errors.model = 'Model must be at least 1 character long';
            }
            if (key === 'price' && value < 0.01) {
                errors.price = 'Price must be positive number';
            }
            if (key === 'images' && value.length < 1) {
                errors.images = 'There has to be at least 1 image';
            }
        }

        if (Object.keys(errors).length < 0) {
            return;
        }

        setErrors(errors);
    };

    return (
        <>
            <form id="edit-form" action={`/edit/${id}`} onSubmit={editFormHandler} encType="multipart/form-data" >
                <div className={styles['details']}>
                    {errors?.year && <p className={styles["error"]}>{errors.year}</p>}
                    <span>Year</span>
                    <input type="number" name="year" placeholder="Year" value={car?.year} onChange={changeHandler} />
                </div>

                <div className={styles['details']}>
                    {errors?.horsePower && <p className={styles["error"]}>{errors.horsePower}</p>}
                    <span>Horse Power</span>
                    <input type="number" name="horsePower" placeholder="Horse Power" value={car?.horsePower} onChange={changeHandler} />
                </div>

                <div className={styles['details']}>
                    {errors?.gearbox && <p className={styles["error"]}>{errors.gearbox}</p>}
                    <span>Gearbox</span>
                    <select name="gearbox" value={car?.gearbox} onChange={changeHandler}>
                        <option value="Manual">Manual</option>
                        <option value="Automatic">Automatic</option>
                    </select>
                </div>

                <div className={styles['details']}>
                    {errors?.kilometers && <p className={styles["error"]}>{errors.kilometers}</p>}
                    <span>Kilometers</span>
                    <input type="number" name="kilometers" placeholder="Kilometers" value={car?.kilometers} onChange={changeHandler} />
                </div>

                <div className={styles['details']}>
                    {errors?.fuelType && <p className={styles["error"]}>{errors.fuelType}</p>}
                    <span>Fuel Type</span>
                    <select name="fuelType" value={car?.fuelType} onChange={changeHandler}>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                    </select>
                </div>

                <div className={styles['details']}>
                    {errors?.description && <p className={styles["error"]}>{errors.description}</p>}
                    <span>Description</span>
                    <textarea name="description" placeholder="Description" value={car?.description} onChange={changeHandler}></textarea>
                </div>

                <div className={styles['details']}>
                    {errors?.city && <p className={styles["error"]}>{errors.city}</p>}
                    <span>City</span>
                    <input type="text" name="city" placeholder="City" value={car?.city} onChange={changeHandler} />
                </div>

                <div className={styles['details']}>
                    {errors?.phoneNumber && <p className={styles["error"]}>{errors.phoneNumber}</p>}
                    <span>Phone Number</span>
                    <input type="text" name="phoneNumber" placeholder="Fuel Type" value={car?.phoneNumber} onChange={changeHandler} />
                </div>

                <div className={styles['details']}>
                    {errors?.images && <p className={styles["error"]}>{errors.images}</p>}
                    <span>Pictures</span>
                    <input type="file" name="images" accept="images/*" onChange={imageUploadHandler} />
                </div>

                {(errors?.manufacturer || errors?.model) && <p className={styles["error"]}>{errors.manufacturer}<br />{errors.model}</p>}
                {errors?.price && <p className={styles["error"]}>{errors.price}</p>}
                <div className={styles['price-car-brand']}>
                    <div className={styles['brand']}>
                        <input type="text" name="manufacturer" placeholder="Manufacturer" value={car?.manufacturer} onChange={changeHandler} />
                        <input type="text" name="model" placeholder="Model" value={car?.model} onChange={changeHandler} />
                    </div>
                    <div className={styles['price']}>
                        $<input type="number" name="price" placeholder="Price" value={car?.price} onChange={changeHandler} />
                    </div>
                </div>
            </form>
        </>
    );
}
