import styles from './RentalCars.module.css';
import { useContext, useEffect, useState } from 'react';
import { getRentCars, rentCar } from '../../services/carService';
import { UserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

export default function RentalCars() {
    const navigate = useNavigate();
    const [user] = useContext(UserContext);
    const [cars, setCars] = useState(null);
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
            console.log(error);
        }
    };

    return (
        <>
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
                    {!user && rentalCar.isRented ? null :
                        !user && !rentalCar.isRented ? <button onClick={rentClickHandler}>Rent Car</button> :
                            user && rentalCar.isRented && rentalCar.isOwner ? <button onClick={rentClickHandler}>Cancel Rent</button> :
                                user && rentalCar.isRented && !rentalCar.isOwner ? null :
                                    <button onClick={rentClickHandler}>Rent now</button>
                    }
                </div>
            </div>
        </>
    );
}