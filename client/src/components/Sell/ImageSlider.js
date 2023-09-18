import styles from './ImageSlider.module.css';

export default function ImageSlider({
    car,
    setCar,
    currentImage,
    setCurrentImage,
}) {

    const deleteImageHandler = (index) => {
        const copyAllImages = [...car.images];
        copyAllImages.splice(index, 1);

        setCar(car => ({ ...car, images: copyAllImages }));
        setCurrentImage(state => {
            if (state - 1 <= 0) {
                return state = 0;
            } else if (state + 1 >= car.images.length) {
                return state = car.images.length - 2;
            } else {
                return state;
            }
        });
    };

    const nextImageHandler = () => {
        if (currentImage + 1 > car.images.length - 1) {
            setCurrentImage(0);
        } else {
            setCurrentImage(state => state + 1);
        }
    };

    const previousImageHandler = () => {
        if (currentImage - 1 < 0) {
            setCurrentImage(car.images.length - 1);
        } else {
            setCurrentImage(state => state - 1);
        }
    };

    const changeImageHandler = (index) => {
        setCurrentImage(index);
    };

    return (
        <>
            <div className={styles["image-slider"]}>
                <div className={styles["images"]}>
                    {car.images.length > 0 ? <img src={URL.createObjectURL(car.images[currentImage])} alt="car" className={styles['active']} /> :
                        <img src="/assets/default-car.png" alt="car" className={styles['active']} />
                    }
                </div>

                <div className={styles["back-btn"]} onClick={previousImageHandler}>
                    <i className="fa-solid fa-arrow-left"></i>
                </div>
                <div className={styles["next-btn"]} onClick={nextImageHandler}>
                    <i className="fa-sharp fa-solid fa-arrow-right"></i>
                </div>
                <div className={styles["thumbnails"]}>

                    {car.images.length > 0 ? car.images.map((image, index) => {
                        if (index === currentImage) {
                            return <img key={index} src={URL.createObjectURL(image)} alt="carThumbnail" className={styles['active']} />;
                        } else {
                            return (<div key={index} className={styles["thumbnail-container"]}>
                                <img src={URL.createObjectURL(image)} alt="carThumbnail" onClick={() => changeImageHandler(index)} />
                                <div className={styles["delete-btn"]} onClick={() => deleteImageHandler(index)}>X</div>
                            </div>);
                        }
                    }) :
                        <img src="/assets/default-car.png" alt="carThumbnail" className={styles['active']} />
                    }
                </div>
            </div>
        </>
    );
}