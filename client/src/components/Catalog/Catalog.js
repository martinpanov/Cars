import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getCars, searchCars } from '../../services/carService';

import styles from './Catalog.module.css';
import toast from 'react-hot-toast';

import CatalogCarCard from './CatalogCarCard';
import SearchCatalog from './SearchCatalog';
import Pagination from './Pagination';
import PageSpinner from '../Spinner/PageSpinner';

export default function Catalog() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [allCars, setAllCars] = useState(null);
    const [displayCars, setDisplayCars] = useState(null);
    const [earliestYear, setEarliestYear] = useState(null);
    const [pageNumbers, setPageNumbers] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {

        // If you access the catalog page using a query string in the URL, you will be provided with the cars that match the search criteria
        (async function catalogCars() {
            const { pagesCount, cars } = await getCars();
            if (cars.length === 0) {
                return setIsLoading(false);
            }
            setAllCars(cars);
            setPageNumbers(pagesCount);

            if (window.location.search) {
                const searchParams = new URLSearchParams(window.location.search);
                try {
                    const { pagesCount, cars } = await searchCars(searchParams.toString());

                    const oldestCar = [...cars].sort((a, b) => a.year - b.year);
                    setEarliestYear(oldestCar[0].year);
                    setPageNumbers(pagesCount);
                    setDisplayCars(cars);
                    setIsLoading(false);
                } catch (error) {
                    error.message.forEach(err => toast.error(err));
                    setIsLoading(false);
                    setDisplayCars(cars);
                    navigate('/catalog');
                }
            } else {
                const oldestCar = [...cars].sort((a, b) => a.year - b.year);
                setEarliestYear(oldestCar[0].year);
                setDisplayCars(cars);
                setIsLoading(false);
            }
        }
        )();

    }, [navigate]);

    return (
        <section id={styles["catalog-page"]}>
            {isLoading ? <PageSpinner /> :
                allCars ?
                    <>
                        <SearchCatalog
                            allCars={allCars}
                            earliestYear={earliestYear}
                            setDisplayCars={setDisplayCars}
                        />

                        <div className={styles["cars-listings-section"]}>
                            <div className={styles["cars-listings"]}>
                                {displayCars && displayCars.map(car => <CatalogCarCard key={car._id} carDetails={car} />)}
                            </div>
                            <Pagination
                                pageNumbers={pageNumbers}
                                setDisplayCars={setDisplayCars}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            />
                        </div>
                    </>
                    :
                    <div className={styles["no-listings"]}>
                        <h1>No listings yet. Be the first one!</h1>
                        <button><Link to="/sell">Create Car Listing</Link></button>
                    </div>}
        </section>
    );
};