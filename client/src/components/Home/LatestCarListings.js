import styles from './LatestCarListings.module.css';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getCarsHome } from '../../services/carService';

export default function LatestCarListings() {
    const [cars, setCars] = useState(null);

    useEffect(() => {
        getCarsHome()
            .then(cars => setCars(cars));
    }, []);

    return (
        <>
            <div className={styles["latest-listings"]}>
                {cars && cars.map(car => {
                    return (
                        <div key={car._id} className={styles["latest-car-listing"]}>
                            <div className={styles["car-listing-image"]}>
                                <Link to={`/details/${car._id}`}><img src={`https://cars-image-storage.s3.amazonaws.com/${car.imagesNames[0]}`} alt="bmw" /></Link>
                            </div>

                            <h2>
                                <Link to={`/details/${car._id}`}><span>{car.manufacturer} {car.model}</span></Link>
                            </h2>

                            <div className={styles["car-specs-km-hp"]}>
                                <i className="fa-solid fa-road"></i><span> {car.kilometers} km </span>
                                <i className="fa-solid fa-horse"></i><span> {car.horsePower} hp </span>
                            </div>

                            <div className={styles["car-specs-gearbox-fuel"]}>
                                <i className="fa fa-gears"></i><span> {car.gearbox} </span>
                                <i className="fa fa-gas-pump"></i><span> {car.fuelType} </span>
                            </div>

                            <div className={styles["car-listing-price"]}>
                                <span>${car.price}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}