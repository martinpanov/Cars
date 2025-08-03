import { useGetCarsQuery } from '../../../api/cars';
import styles from './LatestCarListings.module.css';
import { Link } from "react-router-dom";
import { RenderIf } from '../../../components/RenderIf';
import { IMAGES_URL } from '../../../utils/constants';

export const LatestCarListings: React.FC = () => {
  const { data = [] } = useGetCarsQuery();

  return (
    <section id={styles["car-listings"]}>
      <h2>Latest car listings</h2>
      <div className={styles["latest-listings"]}>
        <RenderIf condition={data?.cars}>
          {data?.cars?.map(car => (
            <div key={car._id} className={styles["latest-car-listing"]}>
              <div className={styles["car-listing-image"]}>
                <Link to={`/details/${car._id}`}><img src={`${IMAGES_URL}${car.imagesNames[0]}`} alt="Car" /></Link>
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
          ))}
        </RenderIf>
      </div>
    </section>
  );
};