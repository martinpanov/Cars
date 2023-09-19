import { useState } from 'react';

import styles from './ImageSlider.module.css';

export default function ImageSlider({
    car,
    setCar,
    newImageFiles,
    setNewImageFiles
}) {
    const [currentImage, setCurrentImage] = useState(0);

    const deleteImageHandler = (index) => {
        const copyAllImages = [...car.imagesNames];
        const imageNameToBeDeleted = copyAllImages.filter((image, imageIndex) => imageIndex === index);
        copyAllImages.splice(index, 1);

        setNewImageFiles(state => state.filter(image => image.name !== imageNameToBeDeleted));
        setCar(car => ({ ...car, imagesNames: copyAllImages }));
        setCurrentImage(state => {
            if (state - 1 <= 0) {
                return state = 0;
            } else if (state + 1 >= car.imagesNames.length) {
                return state = car.imagesNames.length - 2;
            } else {
                return state;
            }
        });
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
        <div className={styles["image-slider"]}>
            <div className={styles["images"]}>
                {car.imagesNames.length > 0 && (() => {
                    const foundNewImage = newImageFiles.find(newImage => newImage.name === car.imagesNames[currentImage]);
                    const imgSrc = foundNewImage ? URL.createObjectURL(foundNewImage) : `https://cars-image-storage.s3.amazonaws.com/${car.imagesNames[currentImage]}`;
                    return <img src={imgSrc} alt="car" className={styles['active']} />;
                })()}
            </div>

            <div className={styles["back-btn"]} onClick={previousImageHandler}>
                <i className="fa-solid fa-arrow-left"></i>
            </div>
            <div className={styles["next-btn"]} onClick={nextImageHandler}>
                <i className="fa-sharp fa-solid fa-arrow-right"></i>
            </div>
            <div className={styles["thumbnails"]}>
                {car.imagesNames.length > 0 && car.imagesNames.map((image, index) => {
                    const newImageFile = newImageFiles.find(newImage => newImage.name === image);
                    const imgSrc = newImageFile ? URL.createObjectURL(newImageFile) : `https://cars-image-storage.s3.amazonaws.com/${image}`;
                    if (index === currentImage) {
                        return <img key={index} src={imgSrc} alt="carThumbnail" className={styles['active']} />;
                    } else {
                        return (<div key={index} className={styles["thumbnail-container"]}>
                            <img src={imgSrc} alt="carThumbnail" onClick={() => changeImageHandler(index)} />
                            <div className={styles["delete-btn"]} onClick={() => deleteImageHandler(index)}>X</div>
                        </div>);
                    }
                })}
            </div>
        </div>
    );
}