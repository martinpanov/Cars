import styles from './Catalog.module.css';
import { Link } from 'react-router-dom';
import bmwImage from "../../assets/bmw-header-webp.webp";

export default function Catalog() {
    return (
        <section id={styles["catalog-page"]}>

            {/* {{ #if cars }}
            {{ #each cars }}
            {{> carCard}}
            {{/ each}}
            {{ else}} */}
            <div className={styles["search-cars-wrapper"]}>


                <div className={styles["search-form"]}>
                    <form>
                        <label>
                            <i className="fa-solid fa-car"></i>
                            <span> Manufacturer</span>
                        </label>
                        <select name="manufacturer">
                            <option value="">Any</option>
                            <option value="BMW">BMW</option>
                        </select>
                        <label>
                            <i className="fa-solid fa-car"></i>
                            <span> Model</span>
                        </label>
                        <select name="model">
                            <option value="">Any</option>
                            <option value="340">340</option>
                        </select>
                        <label>
                            <i className="fa fa-calendar"></i>
                            <span> Year</span>
                        </label>
                        <select name="year">
                            <option value="">Any</option>
                            <option value="1950">After 1950</option>
                        </select>
                        <label>
                            <i className="fa fa-money"></i>
                            <span> From Price</span>
                        </label>
                        <input type="number" name="fromPrice" placeholder="From Price" />
                        <label>
                            <i className="fa fa-money"></i>
                            <span> To Price</span>
                        </label>
                        <input type="number" name="toPrice" placeholder="To Price" />
                        <label>
                            <i className="fa fa-gears"></i>
                            <span> Gearbox</span>
                        </label>
                        <select name="gearbox">
                            <option value="">Any</option>
                            <option value="manual">Manual</option>
                            <option value="manual">Automatic</option>
                        </select>
                        <label>
                            <i className="fa fa-city"></i>
                            <span> City</span>
                        </label>
                        <select name="plovdiv">
                            <option value="">Any</option>
                            <option value="Plovdiv">Plovdiv</option>
                        </select>
                        <button>Search</button>
                    </form>
                </div>

                <div className={styles["cars-listings"]}>
                    <div className={styles["car-listing"]}>
                        <div className={styles["car-listing-image"]}>
                            <Link to='/catalog'><img src={bmwImage} alt="bmw" /></Link>
                        </div>
                        <div className={styles["car-listing-information"]}>
                            <h2>
                                <Link to='/catalog'><span>BMW 340i</span></Link>
                            </h2>
                            <p>
                                This car is a very cool car. It has 40000kmh only and it is in a great shape. Whoever buys it will feel great forever.
                            </p>
                            <div className={styles["car-specs"]}>
                                <i className="fa-solid fa-road"></i><span> 40000 km </span>
                                <i className="fa-solid fa-horse"></i><span> 326 hp </span>
                                <i className="fa fa-gears"></i><span> Automatic </span>
                                <i className="fa fa-gas-pump"></i><span> Petrol </span>
                            </div>
                        </div>
                        <div className={styles["car-listing-price"]}>
                            <span>$40000</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className={styles["no-listings"]}>
                <h1>No listings yet. Be the first one!</h1>
                <button><Link to="/sell">Create Car Listing</Link></button>
            </div> */}

            {/* {{/if}} */}
        </section>
    );
}