import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';

import { getProfilePicture, getUserCars, getUserRentCars, postProfilePicture } from '../../services/carService';

import styles from './MyProfile.module.css';

import MyProfileCars from './MyProfileCars';
import MyProfileSpinner from '../Spinner/MyProfileSpinner';

export default function MyProfile() {
    const [user] = useContext(UserContext);
    const fileInput = useRef(null);
    const [catalogCars, setCatalogCars] = useState([]);
    const [rentCars, setRentCars] = useState(null);
    const [showCatalogCars, setShowCatalogCars] = useState(true);
    const [profilePicture, setProfilePicture] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getProfilePicture()
            .then(profilePicture => setProfilePicture(profilePicture));

        getUserCars()
            .then(cars => {
                setCatalogCars(cars);
            });

        getUserRentCars()
            .then(cars => {
                setRentCars(cars);
                setIsLoading(false);
            });
    }, []);

    const imageUploadHandler = async (e) => {
        if (e.target.files.length <= 0) {
            return;
        }

        const formData = new FormData();
        formData.append('image', e.target.files[0]);

        const newProfilePicture = await postProfilePicture(formData);
        setProfilePicture(newProfilePicture);
    };

    const carListingsHandler = () => {
        setShowCatalogCars(true);
    };

    const rentCarsHandler = () => {
        setShowCatalogCars(false);
    };

    return (
        <section id={styles['my-profile']}>
            <div className={styles['my-profile-content']}>
                <div className={styles['my-profile-details']}>
                    <div className={styles['my-profile-image-section']}>
                        <div className={styles['my-profile-image']}>
                            {profilePicture ? <img src={`https://cars-image-storage.s3.amazonaws.com/${profilePicture}`} alt="cool-person" /> : <img src="/assets/profile-picture.jpg" alt="cool-person" />}
                            <div className={styles["change-photo-button"]} onClick={() => fileInput.current.click()} >
                                <input type="file" ref={fileInput} style={{ display: 'none' }} onChange={imageUploadHandler} />
                                <i className="fa-solid fa-camera"></i>
                            </div>
                        </div>
                    </div>
                    <div className={styles['my-profile-info']}>
                        <h2>{user.username}</h2>
                        <span>{catalogCars ? catalogCars.length : 0} car listings</span>
                        <span>{rentCars ? rentCars.length : 0} rented cars</span>
                    </div>
                </div>
                <div className={styles['car-types']}>
                    <button onClick={carListingsHandler}>CAR LISTINGS</button>
                    <button onClick={rentCarsHandler}>RENTED CARS</button>
                </div>

                <div className={styles['cars']}>
                    {isLoading ? <MyProfileSpinner /> :
                        showCatalogCars ?
                            catalogCars.map(car => <MyProfileCars key={car._id} car={car} isRental={false} />) :
                            rentCars.map(car => <MyProfileCars key={car._id} car={car} isRental={true} />)

                    }
                </div>
            </div>
        </section>
    );
}