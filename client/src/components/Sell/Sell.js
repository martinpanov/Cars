import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sell } from '../../services/carService';
import styles from './Sell.module.css';

export default function Sell() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        manufacturer: '',
        model: '',
        price: '',
        year: '',
        phoneNumber: '',
        description: '',
        gearbox: '',
        city: '',
        fuelType: '',
        horsePower: '',
        kilometers: '',
        images: []
    });

    const changeHandler = (e) => {
        setValues(values => ({ ...values, [e.target.name]: e.target.value }));
    };
    // TODO Add Validation

    const sellFormHandler = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();

            for (let [key, value] of Object.entries(values)) {
                if (key === 'images') {
                    for (let i = 0; i < value.length; i++) {
                        formData.append('images', value[i]);
                    }
                } else {
                    formData.append(key, value);
                }
            };

            await sell(formData);
            return navigate('/catalog');
        } catch (error) {
            console.log(error);
        }
    };

    const imageUploadHandler = (e) => {
        if (values.images.length > 12) {
            return console.log('You can upload 12 images at most');
        }

        setValues(state => ({ ...state, images: [...state.images, e.target.files[0]] }));
    };

    return (
        <section id={styles["sell-page"]}>

            <h1>Sell My Car</h1>

            <div className={styles.wrapper}>
                <form action="/sell" method="post" id={styles["sell-form"]} encType="multipart/form-data" onSubmit={sellFormHandler}>
                    <label><span>Manufacturer: </span></label>
                    <input type="text" name="manufacturer" placeholder="Manufacturer" value={values.manufacturer} onChange={changeHandler} />
                    <label><span>Model: </span></label>
                    <input type="text" name="model" placeholder="Model" value={values.model} onChange={changeHandler} />
                    <label><span>Price: </span></label>
                    <input type="number" name="price" placeholder="Price" value={values.price} onChange={changeHandler} />
                    <label><span>Year: </span></label>
                    <input type="number" name="year" placeholder="Year" value={values.year} onChange={changeHandler} />
                    <label><span>Phone Number: </span></label>
                    <input type="text" name="phoneNumber" placeholder="Phone Number" value={values.phoneNumber} onChange={changeHandler} />
                    <label><span>Description: </span></label>
                    <textarea name="description" placeholder="Description" value={values.description} onChange={changeHandler}></textarea>
                    <label><span>Gearbox: </span></label>
                    <select name="gearbox" value={values.gearbox} onChange={changeHandler} >
                        <option value="" disabled></option>
                        <option value="Manual">Manual</option>
                        <option value="Automatic">Automatic</option>
                    </select>
                    <label><span>City: </span></label>
                    <input type="text" name="city" placeholder="City" value={values.city} onChange={changeHandler} />
                    <label><span>Fuel Type: </span></label>
                    <select name="fuelType" value={values.fuelType} onChange={changeHandler} >
                        <option value="" disabled></option>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                    </select>
                    <label><span>Horse Power: </span></label>
                    <input type="number" name="horsePower" placeholder="Horse Power" value={values.horsePower} onChange={changeHandler} />
                    <label><span>Kilometers: </span></label>
                    <input type="number" name="kilometers" placeholder="Kilometers" value={values.kilometers} onChange={changeHandler} />
                    <label><span>Pictures: </span></label>
                    <input type="file" name="images" accept="images/*" onChange={imageUploadHandler} />
                    <button>Post your ad</button>
                </form>
            </div>

        </section>
    );
}