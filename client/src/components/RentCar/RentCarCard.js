import { Link } from 'react-router-dom';
import styles from './RentCarCard.module.css';

export default function RentCarCard({ carDetails: {
    manufacturer,
    model,
    price,
    gearbox,
    city,
    fuelType,
    doors,
    seats,
    img
}
}) {
    return (
        <div className={styles["car"]}>
            <div className={styles["car-image"]}>
                <Link to='/catalog'><img src={img} alt="car" /></Link>
            </div>
            <h2>
                <Link to='/catalog'><span>{manufacturer} {model}</span></Link>
            </h2>

            <div className={styles["car-specs-km-hp"]}>
                <i className="fa-sharp fa-solid fa-users"></i><span> {seats} seats </span>
                <i className="fa-solid fa-door-open"></i><span> {doors} doors </span>
                <i className="fa-solid fa-snowflake"></i><span> A/C </span>
            </div>

            <div className={styles["car-specs-gearbox-fuel"]}>
                <i className="fa fa-gears"></i><span> {gearbox} </span>
                <i className="fa fa-gas-pump"></i><span> {fuelType} </span>
                <i className="fa fa-city"></i><span> {city} </span>
            </div>

            <div className={styles["car-listing-price"]}>
                <span>${price} / day</span>
            </div>
            <button>Rent Car</button>
        </div>
    );
}