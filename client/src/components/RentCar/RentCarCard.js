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
    const [isRented, setIsRented] = useState(false);
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        if (rentedBy !== null && user) {
            if (user.userId === rentedBy) {
                setIsRented(true);
                setIsOwner(true);
            } else {
                setIsRented(true);
                setIsOwner(false);
            }
        } else if (rentedBy !== null) {
            setIsRented(true);
            setIsOwner(false);
        } else {
            setIsRented(false);
            setIsOwner(false);
        }
    }, [rentedBy, user]);

    const rentCarHandler = async () => {
        await rentCar(_id);
        setIsRented(state => !state);
        setIsOwner(state => !state);
    };

    return (
        <div className={styles["car"]}>
            <div className={styles["car-image"]}>
                {isRented ?
                    <img src='/assets/rented.png' alt="car" /> :
                    <img src={img} alt="car" />
                }
            </div>
            <div className={styles["details"]}>
                <h2>{manufacturer} {model}</h2>

                <div className={styles["car-specs"]}>
                    <span className={styles["seats"]}><i className="fa-sharp fa-solid fa-users"></i> {seats} seats </span>
                    <span className={styles["doors"]}><i className="fa-solid fa-door-open"></i> {doors} doors </span>
                    <span className={styles["ac"]}><i className="fa-solid fa-snowflake"></i> A/C </span>
                    <span className={styles["gearbox"]}><i className="fa fa-gears"></i> {gearbox} </span>
                    <span className={styles["fuel"]}><i className="fa fa-gas-pump"></i> {fuelType} </span>
                    <span className={styles["city"]}><i className="fa fa-city"></i> {city} </span>
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
        </div>
    );
}