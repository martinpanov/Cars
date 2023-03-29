import styles from './RentCar.module.css';
import { useEffect, useState } from 'react';
import { getRentCars } from '../../services/carService';
import RentCarCard from './RentCarCard';

export default function RentCar() {
    const [cars, setCars] = useState(null);

    useEffect(() => {
        getRentCars()
            .then(cars => {
                setCars(cars);
            });
    }, []);

    return (
        <section id={styles['rent-car-page']}>
            <div className={styles['search-rental-cars-wrapper']}>

                <div className={styles['search']}>
                    <form action="GET">
                        <div className={styles['form-container']}>
                            <label>
                                <i className="fa-solid fa-users"></i>
                                <span> Seats</span>
                            </label>
                            <select name="seats">
                                <option value="">Any</option>
                                <option value="5">5 seats</option>
                            </select>

                            <label>
                                <i className="fa-solid fa-door-open"></i>
                                <span> Doors</span>
                            </label>
                            <select name="doors">
                                <option value="">Any</option>
                                <option value="4/5">4/5 doors</option>
                            </select>

                            <label>
                                <i className="fa fa-gears"></i>
                                <span> Gearbox</span>
                            </label>
                            <select name="gearbox">
                                <option value="">Any</option>
                                <option value="Manual">Manual</option>
                                <option value="Automatic">Automatic</option>
                            </select>

                            <label>
                                <i className="fa fa-gas-pump"></i>
                                <span> Fuel Type</span>
                            </label>
                            <select name="fuelType">
                                <option value="">Any</option>
                                <option value="Petrol">Petrol</option>
                                <option value="Diesel">Diesel</option>
                            </select>

                            <button className={styles['form-button']}>Search</button>
                        </div>
                    </form>
                </div>

                <div className={styles['cars']}>
                    {cars && cars.map(car => <RentCarCard key={car._id} carDetails={car} />)}
                </div>
            </div>

        </section>
    );
}