import { useEffect, useState } from 'react';

import { getRentCars, searchRentCars } from '../../services/carService';

import styles from './RentCar.module.css';
import toast from 'react-hot-toast';

import RentCarCard from './RentCarCard';
import SearchRentCar from './SearchRentCar';
import PageSpinner from '../Spinner/PageSpinner';

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
                } catch (error) {
                    error.message.forEach(err => toast.error(err));
                } finally {
                    setIsLoading(false);
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
            {isLoading ? <PageSpinner /> :
                <>
                    <SearchRentCar setCars={setCars} />
                    <div className={styles['cars']}>
                        {cars && cars.map(car => <RentCarCard key={car._id} carDetails={car} />)}
                    </div>
                </>
            }

        </section>
    );
}