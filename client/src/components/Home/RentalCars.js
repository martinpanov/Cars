import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

import { getRentCars, rentCar } from '../../services/carService';

import styles from './RentalCars.module.css';
import toast from 'react-hot-toast';

import Spinner from '../Spinner/ButtonSpinner';

export default function RentalCars() {
    const navigate = useNavigate();
    const [user] = useContext(UserContext);
    const [cars, setCars] = useState(null);
    const [loading, setLoading] = useState(false);
    const [rentalCar, setRentalCar] = useState({
        _id: '',
        price: '',
        manufacturer: '',
        model: '',
        year: '',
        transmission: '',
        fuel: '',
        image: '',
        isRented: false,
        isOwner: false
    });

    useEffect(() => {
        getRentCars()
            .then(cars => {
                setCars(cars.sort((a, b) => {
                    if (a.rentedBy === null && b.rentedBy !== null) {
                        return -1;
                    } else if (a.rentedBy !== null && b.rentedBy === null) {
                        return 1;
                    } else {
                        return 0;
                    }
                }).slice(0, 5));

                setRentalCar({
                    _id: cars[0]._id,
                    price: cars[0].price,
                    manufacturer: cars[0].manufacturer,
                    model: cars[0].model,
                    year: cars[0].year,
                    transmission: cars[0].gearbox,
                    fuel: cars[0].fuelType,
                    image: cars[0].img,
                    isRented: !!cars[0].rentedBy
                });
            });
    }, []);

    const changeHandler = (car) => {
        setRentalCar({
            _id: car._id,
            price: car.price,
            manufacturer: car.manufacturer,
            model: car.model,
            year: car.year,
            transmission: car.gearbox,
            fuel: car.fuelType,
            image: car.img,
            isRented: !!car.rentedBy,
            isOwner: user ? user.userId === car.rentedBy : false
        });
    };

    const rentClickHandler = async () => {
        if (!user) {
            navigate('/login');
        }

        try {
            setLoading(true);
            await rentCar(rentalCar._id);

            setCars(cars => cars.map(car => {
                if (car._id === rentalCar._id) {
                    if (car.rentedBy === null) {
                        car.rentedBy = user.userId;
                    } else {
                        car.rentedBy = null;
                    }
                }
                return car;
            }));

            setRentalCar(state => ({ ...state, isRented: !state.isRented, isOwner: !state.isOwner }));
        } catch (error) {
            error.message.forEach(err => toast.error(err));
        } finally {
            setLoading(false);
        }
    };

    const renderConditionalButton = () => {
        if (!user && rentalCar.isRented) {
            return null;
        } else if (!user && !rentalCar.isRented) {
            return (
                <>
                    {loading ?
                        <button onClick={rentClickHandler} disabled>
                            <Spinner />
                        </button>
                        :
                        <button onClick={rentClickHandler}>
                            Rent Now
                        </button>
                    }
                </>
            );
        } else if (user && rentalCar.isRented && rentalCar.isOwner) {
            return (
                <>
                    {loading ?
                        <button onClick={rentClickHandler} disabled>
                            <Spinner />
                        </button>
                        :
                        <button onClick={rentClickHandler}>
                            Cancel Rent
                        </button>
                    }
                </>
            );
        } else if (user && rentalCar.isRented && !rentalCar.isOwner) {
            return null;
        } else {
            return (
                <>
                    {loading ?
                        <button onClick={rentClickHandler} disabled>
                            <Spinner />
                        </button>
                        :
                        <button onClick={rentClickHandler}>
                            Rent Now
                        </button>
                    }
                </>
            );
        }
    };

    return (
        <section id={styles["rent-car"]}>
            <h2>Rent a Reliable and Comfortable Car for Your Next Adventure</h2>
            <div className={styles["rental-cars"]}>
                <div className={styles["rental-cars-buttons"]}>
                    {cars && cars.map(car => <button key={car._id} onClick={() => changeHandler(car)}>{car.manufacturer} {car.model}</button>)}
                </div>
                <div className={styles["rental-car-image"]}>
                    {rentalCar.isRented ?
                        <img src='/assets/rented.png' alt="bmw" /> :
                        <img src={rentalCar.image} alt="bmw" />
                    }
                </div>
                <div className={styles["rental-car-details"]}>
                    <div className={styles["rental-car-price"]}>
                        <span>${rentalCar.price} / rent per day</span>
                    </div>

                    <div className={styles["rental-car-specs"]}>
                        <div className={styles["rental-car-manufacturer-col"]}>
                            <span>Manufacturer</span>
                            <span>{rentalCar.manufacturer}</span>
                        </div>

                        <div className={styles["rental-car-manufacturer-col"]}>
                            <span>Model</span>
                            <span>{rentalCar.model}</span>
                        </div>

                        <div className={styles["rental-car-manufacturer-col"]}>
                            <span>Year</span>
                            <span>{rentalCar.year}</span>
                        </div>

                        <div className={styles["rental-car-manufacturer-col"]}>
                            <span>Transmission</span>
                            <span>{rentalCar.transmission}</span>
                        </div>

                        <div className={styles["rental-car-manufacturer-col"]}>
                            <span>Fuel</span>
                            <span>{rentalCar.fuel}</span>
                        </div>
                    </div>
                    {renderConditionalButton()}
                </div>
            </div>
        </section>
    );
}