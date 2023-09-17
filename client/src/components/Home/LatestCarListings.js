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
                {cars && cars.map(car => (
                    <div key={car._id} className={styles["latest-car-listing"]}>
                        <div className={styles["car-listing-image"]}>
                            <Link to={`/details/${car._id}`}><img src={`https://cars-image-storage.s3.amazonaws.com/${car.imagesNames[0]}`} alt="bmw" /></Link>
                        </div>
                        <div className={styles["car-specs"]}>
                            <h3 className={styles["manufacturer"]}>
                                <Link to={`/details/${car._id}`}>{car.manufacturer} {car.model}</Link>
                            </h3>
                            <span className={styles["kilometers"]}><i className="fa-solid fa-road"></i> {car.kilometers} km </span>
                            <span className={styles["horse-power"]}><i className="fa-solid fa-horse"></i> {car.horsePower} hp </span>
                            <span className={styles["gearbox"]}><i className="fa fa-gears"></i> {car.gearbox} </span>
                            <span className={styles["fuel-type"]}><i className="fa fa-gas-pump"></i> {car.fuelType} </span>
                            <span className={styles["price"]}>${car.price}</span>
                        </div>
                    </div>
                ))
                }
            </div>
        </>
    );
}