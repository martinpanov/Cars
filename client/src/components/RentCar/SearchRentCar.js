import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { searchRentCars } from "../../services/carService";

import styles from './SearchRentCar.module.css';
import toast from "react-hot-toast";

export default function SearchRentCar({ setCars }) {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        seats: '',
        doors: '',
        gearbox: '',
        fuelType: '',
        city: ''
    });

    const changeHandler = (e) => {
        setFormValues(state => ({ ...state, [e.target.name]: e.target.value }));
    };


    const formHandler = async (e) => {
        e.preventDefault();
        try {
            const nonEmptyFormValues = Object.entries(formValues).filter(([key, value]) => value !== '');
            const searchParams = new URLSearchParams(Object.fromEntries(nonEmptyFormValues));
            const filteredCars = await searchRentCars(searchParams.toString());

            setCars(filteredCars);
            navigate(`/rentcar?${searchParams.toString()}`);
        } catch (error) {
            error.message.forEach(err => toast.error(err));
        }
    };

    return (
        <form action="GET" onSubmit={formHandler} className={styles["rent-car-form"]}>
            <label>
                <i className="fa-solid fa-users"></i>
                <span> Seats</span>
            </label>
            <select name="seats" onChange={changeHandler}>
                <option value="">Any</option>
                <option value="5">5 seats</option>
            </select>

            <label>
                <i className="fa-solid fa-door-open"></i>
                <span> Doors</span>
            </label>
            <select name="doors" onChange={changeHandler}>
                <option value="">Any</option>
                <option value="4/5">4/5 doors</option>
            </select>

            <label>
                <i className="fa fa-gears"></i>
                <span> Gearbox</span>
            </label>
            <select name="gearbox" onChange={changeHandler}>
                <option value="">Any</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
            </select>

            <label>
                <i className="fa fa-gas-pump"></i>
                <span> Fuel Type</span>
            </label>
            <select name="fuelType" onChange={changeHandler}>
                <option value="">Any</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
            </select>

            <label>
                <i className="fa fa-city"></i>
                <span> City</span>
            </label>
            <select name="city" onChange={changeHandler}>
                <option value="">Any</option>
                <option value="Plovdiv">Plovdiv</option>
                <option value="Sofia">Sofia</option>
            </select>

            <button className={styles['form-button']}>Search</button>
        </form>
    );
}