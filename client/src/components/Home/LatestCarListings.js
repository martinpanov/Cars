import styles from './LatestCarListings.module.css';
import bmwImage from "../../assets/bmw-header-webp.webp";
import { Link } from "react-router-dom";

export default function LatestCarListings() {
    return (
        <>
            <div className={styles["latest-listings"]}>
                <div className={styles["latest-car-listing"]}>
                    <div className={styles["car-listing-image"]}>
                        <Link to='/catalog'><img src={bmwImage} alt="bmw" /></Link>
                    </div>

                    <h2>
                        <Link to='/catalog'><span>BMW 340i</span></Link>
                    </h2>

                    <div className={styles["car-specs-km-hp"]}>
                        <i className="fa-solid fa-road"></i><span> 40000 km </span>
                        <i className="fa-solid fa-horse"></i><span> 326 hp </span>
                    </div>

                    <div className={styles["car-specs-gearbox-fuel"]}>
                        <i className="fa fa-gears"></i><span> Automatic </span>
                        <i className="fa fa-gas-pump"></i><span> Petrol </span>
                    </div>

                    <div className={styles["car-listing-price"]}>
                        <span>$40000</span>
                    </div>
                </div>

                <div className={styles["latest-car-listing"]}>
                    <div className={styles["car-listing-image"]}>
                        <Link to='/catalog'><img src={bmwImage} alt="bmw" /></Link>
                    </div>

                    <h2>
                        <Link to='/catalog'><span>BMW 340i</span></Link>
                    </h2>

                    <div className={styles["car-specs-km-hp"]}>
                        <i className="fa-solid fa-road"></i><span> 40000 km </span>
                        <i className="fa-solid fa-horse"></i><span> 326 hp </span>
                    </div>

                    <div className={styles["car-specs-gearbox-fuel"]}>
                        <i className="fa fa-gears"></i><span> Automatic </span>
                        <i className="fa fa-gas-pump"></i><span> Petrol </span>
                    </div>

                    <div className={styles["car-listing-price"]}>
                        <span>$40000</span>
                    </div>
                </div>

                <div className={styles["latest-car-listing"]}>
                    <div className={styles["car-listing-image"]}>
                        <Link to='/catalog'><img src={bmwImage} alt="bmw" /></Link>
                    </div>

                    <h2>
                        <Link to='/catalog'><span>BMW 340i</span></Link>
                    </h2>

                    <div className={styles["car-specs-km-hp"]}>
                        <i className="fa-solid fa-road"></i><span> 40000 km </span>
                        <i className="fa-solid fa-horse"></i><span> 326 hp </span>
                    </div>

                    <div className={styles["car-specs-gearbox-fuel"]}>
                        <i className="fa fa-gears"></i><span> Automatic </span>
                        <i className="fa fa-gas-pump"></i><span> Petrol </span>
                    </div>

                    <div className={styles["car-listing-price"]}>
                        <span>$40000</span>
                    </div>
                </div>

                <div className={styles["latest-car-listing"]}>
                    <div className={styles["car-listing-image"]}>
                        <Link to='/catalog'><img src={bmwImage} alt="bmw" /></Link>
                    </div>

                    <h2>
                        <Link to='/catalog'><span>BMW 340i</span></Link>
                    </h2>

                    <div className={styles["car-specs-km-hp"]}>
                        <i className="fa-solid fa-road"></i><span> 40000 km </span>
                        <i className="fa-solid fa-horse"></i><span> 326 hp </span>
                    </div>

                    <div className={styles["car-specs-gearbox-fuel"]}>
                        <i className="fa fa-gears"></i><span> Automatic </span>
                        <i className="fa fa-gas-pump"></i><span> Petrol </span>
                    </div>

                    <div className={styles["car-listing-price"]}>
                        <span>$40000</span>
                    </div>
                </div>
            </div>
        </>
    );
}