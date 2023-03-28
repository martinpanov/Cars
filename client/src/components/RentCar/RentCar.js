import styles from './RentCar.module.css';
import bmwImage from "../../assets/bmw-header-webp.webp";
import { Link } from 'react-router-dom';

export default function RentCar() {
    return (
        <section id={styles['rent-car-page']}>
            <div className={styles['search-rental-cars-wrapper']}>

                <div className={styles['search']}>
                    <form action="GET">
                        <div className={styles["form-container"]}>
                            <label>
                                <i className="fa-solid fa-users"></i>
                                <span> Seats</span>
                            </label>
                            <select name="seats">
                                <option value="">Any</option>
                                <option value="5">5 seats</option>
                            </select>

                            <label>
                                <i className="fa-solid fa-door-open"></i>
                                <span> Doors</span>
                            </label>
                            <select name="doors">
                                <option value="">Any</option>
                                <option value="4/5">4/5 doors</option>
                            </select>

                            <label>
                                <i className="fa fa-gears"></i>
                                <span> Gearbox</span>
                            </label>
                            <select name="gearbox">
                                <option value="">Any</option>
                                <option value="Manual">Manual</option>
                                <option value="Automatic">Automatic</option>
                            </select>

                            <label>
                                <i className="fa fa-gas-pump"></i>
                                <span> Fuel Type</span>
                            </label>
                            <select name="fuelType">
                                <option value="">Any</option>
                                <option value="Petrol">Petrol</option>
                                <option value="Diesel">Diesel</option>
                            </select>

                            <button className={styles['form-button']}>Search</button>
                        </div>
                    </form>
                </div>

                <div className={styles['cars']}>
                    <div className={styles["car"]}>
                        <div className={styles["car-image"]}>
                            <Link to='/catalog'><img src={bmwImage} alt="bmw" /></Link>
                        </div>
                        <h2>
                            <Link to='/catalog'><span>BMW 340i</span></Link>
                        </h2>

                        <div className={styles["car-specs-km-hp"]}>
                            <i className="fa-sharp fa-solid fa-users"></i><span> 5 seats </span>
                            <i className="fa-solid fa-door-open"></i><span> 4/5 doors </span>
                            <i className="fa-solid fa-snowflake"></i><span> A/C </span>
                        </div>

                        <div className={styles["car-specs-gearbox-fuel"]}>
                            <i className="fa fa-gears"></i><span> manual </span>
                            <i className="fa fa-gas-pump"></i><span> diesel </span>
                        </div>

                        <div className={styles["car-listing-price"]}>
                            <span>$200</span>
                        </div>
                        <button>Rent Car</button>
                    </div>


                    <div className={styles["car"]}>
                        <div className={styles["car-image"]}>
                            <Link to='/catalog'><img src={bmwImage} alt="bmw" /></Link>
                        </div>

                        <h2>
                            <Link to='/catalog'><span>BMW 340i</span></Link>
                        </h2>

                        <div className={styles["car-specs-km-hp"]}>
                            <i className="fa-solid fa-road"></i><span> 200 km </span>
                            <i className="fa-solid fa-horse"></i><span> 200 hp </span>
                        </div>

                        <div className={styles["car-specs-gearbox-fuel"]}>
                            <i className="fa fa-gears"></i><span> manual </span>
                            <i className="fa fa-gas-pump"></i><span> diesel </span>
                        </div>

                        <div className={styles["car-listing-price"]}>
                            <span>$200</span>
                        </div>
                        <button>Rent Car</button>
                    </div>


                    <div className={styles["car"]}>
                        <div className={styles["car-image"]}>
                            <Link to='/catalog'><img src={bmwImage} alt="bmw" /></Link>
                        </div>

                        <h2>
                            <Link to='/catalog'><span>BMW 340i</span></Link>
                        </h2>

                        <div className={styles["car-specs-km-hp"]}>
                            <i className="fa-solid fa-road"></i><span> 200 km </span>
                            <i className="fa-solid fa-horse"></i><span> 200 hp </span>
                        </div>

                        <div className={styles["car-specs-gearbox-fuel"]}>
                            <i className="fa fa-gears"></i><span> manual </span>
                            <i className="fa fa-gas-pump"></i><span> diesel </span>
                        </div>

                        <div className={styles["car-listing-price"]}>
                            <span>$200</span>
                        </div>
                        <button>Rent Car</button>
                    </div>


                    
                </div>
            </div>

        </section>
    );
}