import { Link } from "react-router-dom";
import styles from './CatalogCardCard.module.css';


export default function CatalogCarCard({ carDetails: {
    _id,
    manufacturer,
    model,
    price,
    city,
    description,
    kilometers,
    gearbox,
    fuelType,
    horsePower,
    imagesNames
} }) {
    return (
        <div className={styles["car-listing"]}>
            <div className={styles["car-listing-image"]}>
                <Link to={`/details/${_id}`}><img src={`https://cars-image-storage.s3.amazonaws.com/${imagesNames[0]}`} alt="bmw" /></Link>
            </div>
            <div className={styles["car-listing-information"]}>
                <h2>
                    <Link to={`/details/${_id}`}><span>{manufacturer} {model}</span></Link>
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