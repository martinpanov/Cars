import { Link } from "react-router-dom";
import styles from './CatalogCardCard.module.css';
import { IMAGES_URL } from "../../../utils/constants";
import type { Car } from "../../../types/car";

export const CatalogCarCard: React.FC<Car> = ({
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
}) => {
  return (
    <div className={styles["car-listing"]}>
      <div className={styles["car-listing-image"]}>
        <Link to={`/details/${_id}`}><img src={`${IMAGES_URL}${imagesNames[0]}`} alt="bmw" /></Link>
      </div>
      <div className={styles["car-listing-information"]}>
        <h2>
          <Link to={`/details/${_id}`}><span>{manufacturer} {model}</span></Link>
        </h2>
        <p>
          {description.slice(0, 66)}
        </p>
        <div className={styles["car-specs"]}>
          <span><i className="fa-solid fa-road"></i> {kilometers} km </span>
          <span><i className="fa-solid fa-horse"></i> {horsePower} hp </span>
          <span><i className="fa fa-gears"></i> {gearbox} </span>
          <span><i className="fa fa-gas-pump"></i> {fuelType} </span>
          <span><i className="fa fa-city"></i> {city} </span>
        </div>
      </div>
      <div className={styles["car-listing-price"]}>
        <span>${price}</span>
      </div>
    </div>
  );
};