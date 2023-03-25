import styles from './LatestCarListings.module.css';
import bmwImage from "../../assets/bmw-header-webp.webp";
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
                                <Link to='/catalog'><img src={bmwImage} alt="bmw" /></Link>
                            </div>

                            <h2>
                                <Link to='/catalog'><span>{car.manufacturer} {car.model}</span></Link>
                            </h2>

                            <div className={styles["car-specs-km-hp"]}>
                                <i className="fa-solid fa-road"></i><span> 40000 km </span>
                                <i className="fa-solid fa-horse"></i><span> 326 hp </span>
                            </div>

                            <div className={styles["car-specs-gearbox-fuel"]}>
                                <i className="fa fa-gears"></i><span> {car.gearbox} </span>
                                <i className="fa fa-gas-pump"></i><span> Petrol </span>
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