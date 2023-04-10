import { useState } from "react";
import styles from './Sell.module.css';
import SellForm from "./SellForm";
import ImageSlider from "./ImageSlider";


export default function Sell() {
    const [isLoading, setIsLoading] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);
    const [car, setCar] = useState({
        manufacturer: '',
        model: '',
        price: '',
        year: '',
        phoneNumber: '',
        description: '',
        gearbox: 'Manual',
        city: '',
        fuelType: 'Petrol',
        horsePower: '',
        kilometers: '',
        images: []
    });

    return (
        <section id={styles["sell-page"]}>
            {isLoading ? <img className={styles['loading']} src='/assets/Gear-0.2s-200px-white-background.svg' alt='loading' /> :
                <>
                    <div className={styles['car-details-section']}>
                        <h1>Post Car Ad</h1>
                        <SellForm
                            car={car}
                            setCar={setCar}
                            setIsLoading={setIsLoading}
                        />
                    </div>

                    <div className={styles['image-slider-section']}>
                        <button type="submit" form="sell-form">Post</button>
                        <ImageSlider
                            car={car}
                            setCar={setCar}
                            currentImage={currentImage}
                            setCurrentImage={setCurrentImage}
                        />
                    </div>
                </>
            }
        </section >
    );
}