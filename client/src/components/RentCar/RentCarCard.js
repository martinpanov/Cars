import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

import { rentCar } from '../../services/carService';

import styles from './RentCarCard.module.css';
import toast from 'react-hot-toast';

import Spinner from '../Spinner/ButtonSpinner';

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
    const navigate = useNavigate();
    const [user] = useContext(UserContext);
    const [isRented, setIsRented] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [loading, setLoading] = useState(false);

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

    const rentClickHandler = async () => {
        if (!user) {
            navigate('/login');
        }

        try {
            setLoading(true);

            await rentCar(_id);

            setIsRented(state => !state);
            setIsOwner(state => !state);
        } catch (error) {
            error.message.forEach(err => toast.error(err));
        } finally {
            setLoading(false);
        }
    };

    const renderConditionalButton = () => {
        if (!user && isRented) {
            return null;
        } else if (!user && !isRented) {
            return (
                <>
                    {loading ?
                        <button onClick={rentClickHandler} disabled>
                            <Spinner />
                        </button>
                        :
                        <button onClick={rentClickHandler}>
                            Rent Now
                        </button>
                    }
                </>
            );
        } else if (user && isRented && isOwner) {
            return (
                <>
                    {loading ?
                        <button onClick={rentClickHandler} disabled>
                            <Spinner />
                        </button>
                        :
                        <button onClick={rentClickHandler}>
                            Cancel Rent
                        </button>
                    }
                </>
            );
        } else if (user && isRented && !isOwner) {
            return null;
        } else {
            return (
                <>
                    {loading ?
                        <button onClick={rentClickHandler} disabled>
                            <Spinner />
                        </button>
                        :
                        <button onClick={rentClickHandler}>
                            Rent Now
                        </button>
                    }
                </>
            );
        }
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
                {renderConditionalButton()}
            </div>
        </div>
    );
}