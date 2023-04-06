import { useNavigate, useParams } from 'react-router-dom';
import { deleteCar, getCar } from '../../services/carService';
import styles from './Details.module.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';

export default function Details() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user] = useContext(UserContext);
    const [currentImage, setCurrentImage] = useState(0);
    const [car, setCar] = useState({});

    useEffect(() => {
        getCar(id)
            .then(car => {
                setCar(car);
            });
    }, [id]);

    const editHandler = () => {
        navigate(`/edit/${id}`);
    };

    const deletedHandler = async () => {
        try {
            await deleteCar(id);
            navigate('/catalog');
        } catch (error) {
            console.log(error);
        }
    };

    const nextImageHandler = () => {
        if (currentImage + 1 > car.imagesNames.length - 1) {
            setCurrentImage(0);
        } else {
            setCurrentImage(state => state + 1);
        }
    };

    const previousImageHandler = () => {
        if (currentImage - 1 < 0) {
            setCurrentImage(car.imagesNames.length - 1);
        } else {
            setCurrentImage(state => state - 1);
        }
    };

    const changeImageHandler = (index) => {
        setCurrentImage(index);
    };

    return (
        <section id={styles["details-page"]}>
            <div className={styles['image-slider-section']}>
                <div className={styles['image-slider-details']}>
                    <div className={styles['image-slider-model-and-brand']}>
                        <div className={styles['brand-slider']}>
                            <span>{car.manufacturer} {car.model}</span>
                        </div>

                        <div className={styles['price-slider']}>
                            <span>${car.price}</span>
                        </div>
                    </div>

                    {user && user.userId === car._ownerId ?

                        <div className={styles['edit-and-delete']}>
                            <button onClick={editHandler}>
                                Edit
                            </button>
                            <button onClick={deletedHandler}>
                                Delete
                            </button>
                        </div> :
                        null
                    }
                </div>

                <div className={styles["image-slider"]}>
                    <div className={styles["images"]}>{car.imagesNames ? <img src={`https://cars-image-storage.s3.amazonaws.com/${car.imagesNames[currentImage]}`} alt="car" className={styles['active']} /> : null}</div>
                    <div className={styles["thumbnails"]}>
                        {car.imagesNames ? car.imagesNames.map((image, index) => index === currentImage ? <img key={index} src={`https://cars-image-storage.s3.amazonaws.com/${image}`} alt="carThumbnail" className={styles['active']} /> :
                            <img key={index} src={`https://cars-image-storage.s3.amazonaws.com/${image}`} alt="carThumbnail" onClick={() => changeImageHandler(index)} />) : null}
                    </div>
                    <div className={styles["back-btn"]} onClick={previousImageHandler}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </div>
                    <div className={styles["next-btn"]} onClick={nextImageHandler}>
                        <i className="fa-sharp fa-solid fa-arrow-right"></i>
                    </div>
                </div>
            </div>

            <div className={styles['car-details-section']}>
                <div className={styles['details']}>
                    <div className={styles['name']}>
                        <label>Year</label>
                    </div>
                    <div className={styles['details-content']}>
                        <p>
                            {car.year}
                        </p>
                    </div>
                </div>

                <div className={styles['details']}>
                    <div className={styles['name']}>
                        <label>Horse Power</label>
                    </div>
                    <div className={styles['details-content']}>
                        <p>
                            {car.horsePower}
                        </p>
                    </div>
                </div>

                <div className={styles['details']}>
                    <div className={styles['name']}>
                        <label>Gearbox</label>
                    </div>
                    <div className={styles['details-content']}>
                        <p>
                            {car.gearbox}
                        </p>
                    </div>
                </div>

                <div className={styles['details']}>
                    <div className={styles['name']}>
                        <label>Kilometers</label>
                    </div>
                    <div className={styles['details-content']}>
                        <p>
                            {car.kilometers}
                        </p>
                    </div>
                </div>

                <div className={styles['details']}>
                    <div className={styles['name']}>
                        <label>Fuel Type</label>
                    </div>
                    <div className={styles['details-content']}>
                        <p>
                            {car.fuelType}
                        </p>
                    </div>
                </div>

                <div className={styles['details']}>
                    <div className={styles['name']}>
                        <label>Description</label>
                    </div>
                    <div className={styles['details-content']}>
                        <p>
                            {car.description}
                        </p>
                    </div>
                </div>

                <div className={styles['details']}>
                    <div className={styles['name']}>
                        <label>City</label>
                    </div>
                    <div className={styles['details-content']}>
                        <p>
                            {car.city}
                        </p>
                    </div>
                </div>

                <div className={styles['details']}>
                    <div className={styles['name']}>
                        <label>Phone Number</label>
                    </div>
                    <div className={styles['details-content']}>
                        <p>
                            {car.phoneNumber}
                        </p>
                    </div>
                </div>

                <div className={styles['price-car-brand']}>
                    <div className={styles['brand']}>
                        <span>{car.manufacturer} {car.model}</span>
                    </div>
                    <div className={styles['price']}>
                        <span>
                            ${car.price}
                        </span>
                    </div>
                </div>
            </div>

        </section>
    );
}