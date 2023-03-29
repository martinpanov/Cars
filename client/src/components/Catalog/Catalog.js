import styles from './Catalog.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { getCars, searchCars } from '../../services/carService';
import { useEffect, useState } from 'react';
import CatalogCarCard from './CatalogCarCard';

export default function Catalog() {
    const [isLoading, setIsLoading] = useState(false);
    const [allCars, setAllCars] = useState(null);
    const [displayCars, setDisplayCars] = useState(null);
    const [model, setModel] = useState(null);
    const [earliestYear, setEarliestYear] = useState(null);
    const [searchFormValues, setSearchFormValues] = useState({
        manufacturer: '',
        model: '',
        year: '',
        fromPrice: '',
        toPrice: '',
        gearbox: '',
        city: '',
        fuelType: '',
        fromHp: '',
        toHp: '',
        fromKm: '',
        toKm: ''
    });
    const navigate = useNavigate();

    useEffect(() => {

        // If you access the catalog page using a query string in the URL, you will be provided with the cars that match the search criteria
        (async function catalogCars() {
            setIsLoading(true);
            const cars = await getCars();
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

    // Set car models based on the chosen manufacturer and reset the model value after you've changed the manufacturer
    const filterModelAndChangeHandler = (e) => {
        const filteredModelsByManufacturer = allCars.filter(car => car.manufacturer === e.target.value);
        setModel(filteredModelsByManufacturer.map(car => car.model));

        setSearchFormValues(state => ({ ...state, [e.target.name]: e.target.value, model: '' }));
    };

    const changeHandler = (e) => {
        setSearchFormValues(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    const searchFormHandler = async (e) => {
        e.preventDefault();
        try {
            const nonEmptyFormValues = Object.entries(searchFormValues).filter(([key, value]) => value !== '');
            const searchParams = new URLSearchParams(Object.fromEntries(nonEmptyFormValues));
            const filteredCars = await searchCars(searchParams.toString());

            setDisplayCars(filteredCars);
            navigate(`/catalog?${searchParams.toString()}`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section id={styles["catalog-page"]}>
            {isLoading ? <img src='/assets/Gear-0.2s-200px.svg' alt='loading' /> :
                    allCars ?
                        <div className={styles["search-cars-wrapper"]}>


                            <div className={styles["search-form"]}>
                                <form onSubmit={searchFormHandler} method="GET">
                                    <div className={styles["form-container"]}>
                                        <div className={styles["form-column"]}>
                                            <label>
                                                <i className="fa-solid fa-car"></i>
                                                <span> Manufacturer</span>
                                            </label>
                                            <select name="manufacturer" onChange={filterModelAndChangeHandler}>
                                                <option value="">Any</option>
                                                {allCars && [...new Set(allCars.map(car => car.manufacturer))].map((car, i) => <option key={i} value={car}>{car}</option>)}
                                            </select>
                                            <label>
                                                <i className="fa-solid fa-car"></i>
                                                <span> Model</span>
                                            </label>
                                            <select name="model" onChange={changeHandler} value={searchFormValues.model}>
                                                <option value="">Any</option>
                                                {model && model.map((model, i) => <option key={i} value={model}>{model}</option>)}
                                            </select>
                                            <label>
                                                <i className="fa fa-calendar"></i>
                                                <span> Year</span>
                                            </label>
                                            <select name="year" onChange={changeHandler}>
                                                <option value=''>Any</option>
                                                <option value={earliestYear}>After {earliestYear}</option>
                                            </select>
                                            <label>
                                                <i className="fa fa-money"></i>
                                                <span> From Price</span>
                                            </label>
                                            <input type="number" name="fromPrice" placeholder="From Price" onChange={changeHandler} />
                                            <label>
                                                <i className="fa fa-money"></i>
                                                <span> To Price</span>
                                            </label>
                                            <input type="number" name="toPrice" placeholder="To Price" onChange={changeHandler} />
                                            <label>
                                                <i className="fa fa-gears"></i>
                                                <span> Gearbox</span>
                                            </label>
                                            <select name="gearbox" onChange={changeHandler}>
                                                <option value="">Any</option>
                                                <option value="Manual">Manual</option>
                                                <option value="Automatic">Automatic</option>
                                            </select>
                                        </div>

                                        <div className={styles['form-column']}>

                                            <label>
                                                <i className="fa fa-city"></i>
                                                <span> City</span>
                                            </label>
                                            <select name="city" onChange={changeHandler}>
                                                <option value="">Any</option>
                                                {allCars && [...new Set(allCars.map(car => car.city))].map((city, i) => <option key={i} value={city}>{city}</option>)}
                                            </select>
                                            <label>
                                                <i className="fa fa-gas-pump"></i>
                                                <span> Fuel Type</span>
                                            </label>
                                            <select name="fuelType" onChange={changeHandler}>
                                                <option value="">Any</option>
                                                <option value="Petrol">Petrol</option>
                                                <option value="Diesel">Diesel</option>
                                            </select>
                                            <label>
                                                <i className="fa-solid fa-horse"></i>
                                                <span> From HP</span>
                                            </label>
                                            <input type="number" name="fromHp" placeholder="From HP" onChange={changeHandler} />
                                            <label>
                                                <i className="fa-solid fa-horse"></i>
                                                <span> To HP</span>
                                            </label>
                                            <input type="number" name="toHp" placeholder="To HP" onChange={changeHandler} />
                                            <label>
                                                <i className="fa-solid fa-road"></i>
                                                <span> From KM</span>
                                            </label>
                                            <input type="number" name="fromKm" placeholder="From KM" onChange={changeHandler} />
                                            <label>
                                                <i className="fa-solid fa-road"></i>
                                                <span> To KM</span>
                                            </label>
                                            <input type="number" name="toKm" placeholder="To KM" onChange={changeHandler} />
                                        </div>
                                    </div>
                                    <button>Search</button>
                                </form>
                            </div>

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