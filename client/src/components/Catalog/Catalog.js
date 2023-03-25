import styles from './Catalog.module.css';
import { Link, useNavigate } from 'react-router-dom';
import bmwImage from "../../assets/bmw-header-webp.webp";
import { getCars, searchCars } from '../../services/carService';
import { useEffect, useState } from 'react';

export default function Catalog() {
    const [allCars, setAllCars] = useState(null)
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
        city: ''
    });
    const navigate = useNavigate();

    useEffect(() => {

        // If you access the catalog page using a query string in the URL, you will be provided with the cars that match the search criteria
        (async function catalogCars() {
            const cars = await getCars();
            setAllCars(cars)

            if (window.location.search) {
                const searchParams = new URLSearchParams(window.location.search);
                try {
                    const filteredCars = await searchCars(searchParams.toString());

                    const oldestCar = [...cars].sort((a, b) => a.year - b.year);
                    setEarliestYear(oldestCar[0].year);

                    setDisplayCars(filteredCars);
                } catch (error) {
                    console.log(error);
                }
            } else {
                const oldestCar = [...cars].sort((a, b) => a.year - b.year);
                setEarliestYear(oldestCar[0].year);
                setDisplayCars(cars);
            }
        }
        )();

    }, []);

    // Set car models based on the chosen manufacturer and reset the model value after you've chosen the manufacturer
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
            const searchParams = new URLSearchParams(searchFormValues);
            const filteredCars = await searchCars(searchParams.toString());
            
            setDisplayCars(filteredCars);
            navigate(`/catalog?${searchParams.toString()}`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section id={styles["catalog-page"]}>

            <div className={styles["search-cars-wrapper"]}>


                <div className={styles["search-form"]}>
                    <form onSubmit={searchFormHandler} method="GET">
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
                        <label>
                            <i className="fa fa-city"></i>
                            <span> City</span>
                        </label>
                        <select name="city" onChange={changeHandler}>
                            <option value="">Any</option>
                            <option value="Plovdiv">Plovdiv</option>
                        </select>
                        <button>Search</button>
                    </form>
                </div>

                <div className={styles["cars-listings"]}>
                    {displayCars && displayCars.map(car => {
                        return (
                            <div key={car._id} className={styles["car-listing"]}>
                                <div className={styles["car-listing-image"]}>
                                    <Link to='/catalog'><img src={bmwImage} alt="bmw" /></Link>
                                </div>
                                <div className={styles["car-listing-information"]}>
                                    <h2>
                                        <Link to='/catalog'><span>{car.manufacturer} {car.model}</span></Link>
                                    </h2>
                                    <p>
                                        {car.description.slice(0, 66)}
                                    </p>
                                    <div className={styles["car-specs"]}>
                                        <i className="fa-solid fa-road"></i><span> 40000 km </span>
                                        <i className="fa-solid fa-horse"></i><span> 326 hp </span>
                                        <i className="fa fa-gears"></i><span> {car.gearbox} </span>
                                        <i className="fa fa-gas-pump"></i><span> Petrol </span>
                                    </div>
                                </div>
                                <div className={styles["car-listing-price"]}>
                                    <span>${car.price}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* <div className={styles["no-listings"]}>
                <h1>No listings yet. Be the first one!</h1>
                <button><Link to="/sell">Create Car Listing</Link></button>
            </div> */}
        </section >
    );
}