import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { rentCar } from '../../services/carService';
import styles from './RentCarCard.module.css';

export default function RentCarCard({ carDetails: {
    _id,
    manufacturer,
    model,
    price,
    gearbox,
    city,
    fuelType,
    doors,
    seats,
    img,
    rentedBy
} }) {
    const [user] = useContext(UserContext);
    const [isRented, setIsRentedState] = useState(false);
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        if (rentedBy !== null && user) {
            if (user.userId === rentedBy) {
                setIsRentedState(true);
                setIsOwner(true);
            } else {
                setIsRentedState(true);
                setIsOwner(false);
            }
        } else if (rentedBy !== null) {
            setIsRentedState(true);
            setIsOwner(false);
        } else {
            setIsRentedState(false);
            setIsOwner(false);
        }
    }, [rentedBy, user]);

    const rentCarHandler = async () => {
        await rentCar(_id);
        setIsRentedState(state => !state);
        setIsOwner(state => !state);
    };

    return (
        <div className={styles["car"]}>
            <div className={styles["car-image"]}>
                {isRented ?
                    <img src='/assets/rented.png' alt="car" /> :
                    <Link to='/catalog'><img src={img} alt="car" /></Link>
                }
            </div>
            <h2>
                <Link to='/catalog'><span>{manufacturer} {model}</span></Link>
            </h2>

            <div className={styles["car-specs-km-hp"]}>
                <i className="fa-sharp fa-solid fa-users"></i><span> {seats} seats </span>
                <i className="fa-solid fa-door-open"></i><span> {doors} doors </span>
                <i className="fa-solid fa-snowflake"></i><span> A/C </span>
            </div>

            <div className={styles["car-specs-gearbox-fuel"]}>
                <i className="fa fa-gears"></i><span> {gearbox} </span>
                <i className="fa fa-gas-pump"></i><span> {fuelType} </span>
                <i className="fa fa-city"></i><span> {city} </span>
            </div>

            <div className={styles["car-listing-price"]}>
                <span>${price} / day</span>
            </div>

            {!user && isRented ? null :
                !user && !isRented ? <Link to='/login'><button>Rent Car</button></Link> :
                    user && isRented && isOwner ? <button onClick={rentCarHandler}>Cancel Rent</button> :
                        user && isRented && !isOwner ? null :
                            <button onClick={rentCarHandler}>Rent Car</button>
            }

        </div>
    );
}