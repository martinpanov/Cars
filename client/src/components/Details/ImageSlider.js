import { useState } from "react";

import styles from './ImageSlider.module.css';

export default function ImageSlider({
    car,
}) {
    const [currentImage, setCurrentImage] = useState(0);

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
        <div className={styles["image-slider"]}>
            <div className={styles["images"]}>
                {car.imagesNames.length > 0 && <img src={`https://cars-image-storage.s3.amazonaws.com/${car.imagesNames[currentImage]}`} alt="car" className={styles['active']} />}
            </div>

            <div className={styles["thumbnails"]}>
                {car.imagesNames.length > 0 && car.imagesNames.map((image, index) => index === currentImage ?
                    <img key={index} src={`https://cars-image-storage.s3.amazonaws.com/${image}`} alt="carThumbnail" className={styles['active']} /> :
                    <img key={index} src={`https://cars-image-storage.s3.amazonaws.com/${image}`} alt="carThumbnail" onClick={() => changeImageHandler(index)} />)
                }
            </div>

            <div className={styles["back-btn"]} onClick={previousImageHandler}>
                <i className="fa-solid fa-arrow-left"></i>
            </div>

            <div className={styles["next-btn"]} onClick={nextImageHandler}>
                <i className="fa-sharp fa-solid fa-arrow-right"></i>
            </div>
        </div>
    );
}