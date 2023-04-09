import styles from './Catalog.module.css';
import { Link } from 'react-router-dom';
import { getCars, searchCars } from '../../services/carService';
import { useEffect, useState } from 'react';
import CatalogCarCard from './CatalogCarCard';
import SearchCatalog from './SearchCatalog';

export default function Catalog() {
    const [isLoading, setIsLoading] = useState(true);
    const [allCars, setAllCars] = useState(null);
    const [displayCars, setDisplayCars] = useState(null);
    const [earliestYear, setEarliestYear] = useState(null);
    
    useEffect(() => {

        // If you access the catalog page using a query string in the URL, you will be provided with the cars that match the search criteria
        (async function catalogCars() {
            const cars = await getCars();
            if (cars.length === 0) {
                return setIsLoading(false);
            }
            setAllCars(cars);

            if (window.location.search) {
                const searchParams = new URLSearchParams(window.location.search);
                try {
                    const filteredCars = await searchCars(searchParams.toString());

                    const oldestCar = [...cars].sort((a, b) => a.year - b.year);
                    setEarliestYear(oldestCar[0].year);

                    setDisplayCars(filteredCars);
                    setIsLoading(false);
                } catch (error) {
                    console.log(error);
                }
            } else {
                const oldestCar = [...cars].sort((a, b) => a.year - b.year);
                setEarliestYear(oldestCar[0].year);
                setDisplayCars(cars);
                setIsLoading(false);
            }
        }
        )();

    }, []);

    return (
        <section id={styles["catalog-page"]}>
            {isLoading ? <img className={styles['loading']} src='/assets/Gear-0.2s-200px.svg' alt='loading' /> :
                allCars ?
                    <div className={styles["search-cars-wrapper"]}>
                        <SearchCatalog
                            allCars={allCars}
                            earliestYear={earliestYear}
                            setDisplayCars={setDisplayCars}
                        />

                        <div className={styles["cars-listings"]}>
                            {displayCars && displayCars.map(car => <CatalogCarCard key={car._id} carDetails={car} />)}
                        </div>
                    </div> :
                    <div className={styles["no-listings"]}>
                        <h1>No listings yet. Be the first one!</h1>
                        <button><Link to="/sell">Create Car Listing</Link></button>
                    </div>}
        </section>
    );
};