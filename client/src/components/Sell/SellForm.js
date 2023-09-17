import { useNavigate } from 'react-router-dom';
import styles from './SellForm.module.css';
import { useState } from 'react';
import { sell } from '../../services/carService';
import toast from 'react-hot-toast';
import formValidation from '../../util/formValidation';


export default function SellForm({
    car,
    setCar,
    setIsLoading
}) {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const sellFormHandler = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const formData = new FormData();

            for (let [key, value] of Object.entries(car)) {
                if (key === 'images') {
                    for (let image of car?.images) {
                        formData.append('images', image);
                    }
                } else {
                    formData.append(key, value);
                }
            };

            formValidation(formData, setErrors);

            if (Object.keys(errors).length > 0) {
                return;
            }

            await sell(formData);

            return navigate(`/catalog`);
        } catch (error) {
            error.message.forEach(err => toast.error(err));
        } finally {
            setIsLoading(false);
        }
    };

    const changeHandler = (e) => {
        setCar(car => ({ ...car, [e.target.name]: e.target.value }));
    };

    const imageUploadHandler = (e) => {
        if (e.target.files.length <= 0) {
            return;
        }

        if (car?.images.length >= 12) {
            return setErrors(errors => ({ ...errors, images: 'You can upload 12 images at most' }));
        }

        setCar(car => ({ ...car, images: [...car.images, e.target.files[0]] }));
    };

    return (
        <>
            <form id="sell-form" action='/sell' onSubmit={sellFormHandler} encType="multipart/form-data" >
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
