import { useContext, useEffect, useState } from 'react';
import styles from './MyProfile.module.css';
import { getUserCars, getUserRentCars } from '../../services/carService';
import { UserContext } from '../../contexts/UserContext';
import MyProfileCars from './MyProfileCars';

export default function MyProfile() {
    const [user] = useContext(UserContext);
    const [catalogCars, setCatalogCars] = useState([]);
    const [rentCars, setRentCars] = useState(null);
    const [showCatalogCars, setShowCatalogCars] = useState(true);

    useEffect(() => {
        getUserCars()
            .then(cars => setCatalogCars(cars));

        getUserRentCars()
            .then(cars => setRentCars(cars));
    }, []);

    const carListingsHandler = () => {
        setShowCatalogCars(true);
    };

    const rentCarsHandler = () => {
        setShowCatalogCars(false)
    }

    return (
        <section id={styles['my-profile']}>
            <div className={styles['my-profile-content']}>
                <div className={styles['my-profile-details']}>
                    <div className={styles['my-profile-image']}>
                        <img src="/assets/profile-picture.jpg" alt="cool-person" />
                    </div>
                    <div className={styles['my-profile-info']}>
                        <div className={styles['username']}>
                            <h2>{user.username}</h2>
                        </div>
                        <div className={styles['car-posts-count']}>
                            <span>{catalogCars ? catalogCars.length : 0} car listings</span>
                            <span>{rentCars ? rentCars.length : 0} rented cars</span>
                        </div>
                    </div>
                </div>
                <div className={styles['car-types']}>
                    <button onClick={carListingsHandler}>CAR LISTINGS</button>
                    <button onClick={rentCarsHandler}>RENTED CARS</button>
                </div>

                <div className={styles['cars']}>
                    {showCatalogCars ?
                       catalogCars.map(car => <MyProfileCars key={car._id} car={car} isRental={false} />) :
                        rentCars.map(car => <MyProfileCars key={car._id} car={car} isRental={true} />)
                    }
                </div>

            </div>
        </section>
    );
}