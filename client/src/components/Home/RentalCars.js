import styles from './RentalCars.module.css';
import bmwImage from "../../assets/bmw-rental.png";
import toyotaImage from '../../assets/toyota-corolla.png';
import vwPassat from '../../assets/vw-passat.png';
import mazda from '../../assets/mazda.png';
import audi from '../../assets/audi-a1.png';
import { Link } from "react-router-dom";
import { useState } from 'react';

export default function RentalCars() {
    const [rentalCar, setRentalCar] = useState({
        price: "20",
        manufacturer: "BMW",
        model: "320d",
        year: "2011",
        transmission: "Automatic",
        fuel: "Diesel",
        image: bmwImage
    });

    const bmwRentalAction = () => {
        setRentalCar({
            price: "20",
            manufacturer: "BMW",
            model: "320d",
            year: "2011",
            transmission: "Automatic",
            fuel: "Diesel",
            image: bmwImage
        });
    };

    const toyotaRentalAction = () => {
        setRentalCar({
            price: "40",
            manufacturer: "Toyota",
            model: "Corolla",
            year: "2018",
            transmission: "Manual",
            fuel: "Diesel",
            image: toyotaImage
        });
    };

    const volkswagenRentalAction = () => {
        setRentalCar({
            price: "35",
            manufacturer: "Volkswagen",
            model: "Passat CC",
            year: "2013",
            transmission: "Automatic",
            fuel: "Diesel",
            image: vwPassat
        });
    };

    const mazdaRentalAction = () => {
        setRentalCar({
            price: "35",
            manufacturer: "Mazda",
            model: "CX-5",
            year: "2014",
            transmission: "Automatic",
            fuel: "Diesel",
            image: mazda
        });
    };

    const audiRentalAction = () => {
        setRentalCar({
            price: "50",
            manufacturer: "Audi",
            model: "S4",
            year: "2016",
            transmission: "Manual",
            fuel: "Petrol",
            image: audi
        });
    };

    return (
        <>
            <div className={styles["rental-cars"]}>
                <div className={styles["rental-cars-buttons"]}>
                    <button onClick={bmwRentalAction}>BMW 320d</button>
                    <button onClick={toyotaRentalAction}>Toyota Corolla</button>
                    <button onClick={volkswagenRentalAction}>VW Passat CC</button>
                    <button onClick={mazdaRentalAction}>Mazda CX-5</button>
                    <button onClick={audiRentalAction}>Audi S4</button>
                </div>
                <div className={styles["rental-cars-images-details"]}>
                    <div className={styles["rental-car-image"]}>
                        <img src={rentalCar.image} alt="bmw" />
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
                        <Link to="/catalog">Rent now</Link>
                    </div>
                </div>
            </div>
        </>
    );
}