import { Link } from "react-router-dom";
import bmwImage from "../../assets/bmw-header-webp.webp";
import styles from './CatalogCardCard.module.css';


export default function CatalogCarCard({ carDetails: {
    manufacturer,
    model,
    price,
    city,
    description,
    kilometers,
    gearbox,
    fuelType,
    horsePower
} }) {
    return (
        <div className={styles["car-listing"]}>
            <div className={styles["car-listing-image"]}>
                <Link to='/catalog'><img src={bmwImage} alt="bmw" /></Link>
            </div>
            <div className={styles["car-listing-information"]}>
                <h2>
                    <Link to='/catalog'><span>{manufacturer} {model}</span></Link>
                </h2>
                <p>
                    {description.slice(0, 66)}
                </p>
                <div className={styles["car-specs"]}>
                    <i className="fa-solid fa-road"></i><span> {kilometers} km </span>
                    <i className="fa-solid fa-horse"></i><span> {horsePower} hp </span>
                    <i className="fa fa-gears"></i><span> {gearbox} </span>
                    <i className="fa fa-gas-pump"></i><span> {fuelType} </span>
                    <i className="fa fa-city"></i><span> {city} </span>
                </div>
            </div>
            <div className={styles["car-listing-price"]}>
                <span>${price}</span>
            </div>
        </div>
    );
}