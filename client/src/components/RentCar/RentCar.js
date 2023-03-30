import styles from './RentCar.module.css';
import { useEffect, useState } from 'react';
import { getRentCars, searchRentCars } from '../../services/carService';
import RentCarCard from './RentCarCard';
import { useNavigate } from 'react-router-dom';

export default function RentCar() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [cars, setCars] = useState(null);
    const [formValues, setFormValues] = useState({
        seats: '',
        doors: '',
        gearbox: '',
        fuelType: '',
        city: ''
    });

    useEffect(() => {
        (async function rentCars() {
            if (window.location.search) {
                const searchParams = new URLSearchParams(window.location.search);
                try {
                    const filteredCars = await searchRentCars(searchParams.toString());

                    setCars(filteredCars);
                    setIsLoading(false);
                } catch (error) {
                    console.log(error);
                }
            } else {
                const cars = await getRentCars();

                setCars(cars);
                setIsLoading(false);
            }
        }
        )();
    }, []);

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
            console.log(error);
        }
    };

    return (
        <section id={styles['rent-car-page']}>
            {isLoading ? <img className={styles['loading']} src='/assets/Gear-0.2s-200px.svg' alt='loading' /> :
                <div className={styles['search-rental-cars-wrapper']}>
                    <div className={styles['search']}>
                        <form action="GET" onSubmit={formHandler}>
                            <div className={styles['form-container']}>
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
                            </div>
                        </form>
                    </div>

                    <div className={styles['cars']}>
                        {cars && cars.map(car => <RentCarCard key={car._id} carDetails={car} />)}
                    </div>
                </div>
            }

        </section>
    );
}