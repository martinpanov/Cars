import styles from './RentCar.module.css';
import { useEffect, useState } from 'react';
import { getRentCars, searchRentCars } from '../../services/carService';
import RentCarCard from './RentCarCard';
import SearchRentCar from './SearchRentCar';

export default function RentCar() {
    const [isLoading, setIsLoading] = useState(true);
    const [cars, setCars] = useState(null);

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

    return (
        <section id={styles['rent-car-page']}>
            {isLoading ? <img className={styles['loading']} src='/assets/Gear-0.2s-200px.svg' alt='loading' /> :
                <div className={styles['search-rental-cars-wrapper']}>
                    <SearchRentCar setCars={setCars} />

                    <div className={styles['cars']}>
                        {cars && cars.map(car => <RentCarCard key={car._id} carDetails={car} />)}
                    </div>
                </div>
            }

        </section>
    );
}