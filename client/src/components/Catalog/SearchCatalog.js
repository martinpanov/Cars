import { useNavigate } from "react-router-dom";
import { searchCars } from "../../services/carService";
import { useState } from "react";
import styles from './SearchCatalog.module.css';
import toast from "react-hot-toast";

export default function SearchCatalog({
    allCars,
    earliestYear,
    setDisplayCars
}) {
    const navigate = useNavigate();
    const [model, setModel] = useState(null);
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
            const { cars } = await searchCars(searchParams.toString());

            setDisplayCars(cars);
            navigate(`/catalog?${searchParams.toString()}`);
        } catch (error) {
            error.message.forEach(err => toast.error(err))
        }
    };
    return (
        <form onSubmit={searchFormHandler} method="GET" className={styles["search-form"]}>
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
                    <i className="fa-solid fa-money-bill"></i>
                    <span> From Price</span>
                </label>
                <input type="number" name="fromPrice" placeholder="From Price" onChange={changeHandler} />
                <label>
                    <i className="fa-solid fa-money-bill"></i>
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
            <button>Search</button>
        </form>
    );
}