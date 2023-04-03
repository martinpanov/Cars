import { useParams } from 'react-router-dom';
import { getCar } from '../../services/carService';
import styles from './Details.module.css';
import { useEffect, useState } from 'react';

export default function Details() {
    const { id } = useParams();
    const [currentImage, setCurrentImage] = useState(0);
    const [car, setCar] = useState({});
    const [images, setImages] = useState([]);

    useEffect(() => {
        getCar(id)
            .then(car => {
                setImages(car.imagesNames);
                setCar(car);
            });
    }, [id]);

    const nextImageHandler = () => {
        if (currentImage + 1 > images.length - 1) {
            setCurrentImage(0);
        } else {
            setCurrentImage(state => state + 1);
        }
    };

    const previousImageHandler = () => {
        if (currentImage - 1 < 0) {
            setCurrentImage(images.length - 1);
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
                <div className={styles['brand-slider']}>
                    <span>{car.manufacturer} {car.model}</span>
                </div>
                <div className={styles['price-slider']}>
                    <span>${car.price}</span>
                </div>

                <div className={styles["image-slider"]}>
                    <div className={styles["images"]}>{<img src={`https://cars-image-storage.s3.amazonaws.com/${images[currentImage]}`} alt="car" className={styles['active']} />}</div>
                    <div className={styles["thumbnails"]}>
                        {images.map((image, index) => index === currentImage ? <img src={`https://cars-image-storage.s3.amazonaws.com/${image}`} alt="carThumbnail" className={styles['active']} /> : 
                        <img src={`https://cars-image-storage.s3.amazonaws.com/${image}`} alt="carThumbnail" onClick={() => changeImageHandler(index)} />)}
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
                            {car.horsePower}HP
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
                            {car.kilometers}KM
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