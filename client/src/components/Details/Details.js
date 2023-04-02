import styles from './Details.module.css';
import { useState } from 'react';

export default function Details() {
    const [currentImage, setCurrentImage] = useState(0)
    const [images, setImage] = useState([
        "https://images.unsplash.com/photo-1496440543089-3d0eb669f6f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=788&q=80",
        "https://images.unsplash.com/photo-1619961310056-1f5c8df685d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
        "https://images.unsplash.com/photo-1503001831666-8f3cf3a24544?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80",
        "https://images.unsplash.com/photo-1526306063970-d5498ad00f1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
        "https://images.unsplash.com/photo-1552694477-2a18dd7d4de0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    ]);

    const nextImageHandler = () => {
        if (currentImage + 1 > images.length - 1) {
            setCurrentImage(0)
        } else {
            setCurrentImage(state => state + 1)
        }
    }

    const previousImageHandler = () => {
        if (currentImage - 1 < 0) {
            setCurrentImage(images.length - 1)
        } else {
            setCurrentImage(state => state - 1)
        }
    }

    const changeImageHandler = (index) => {
        setCurrentImage(index)
    }

    return (
        <section id={styles["details-page"]}>
            <div className={styles['image-slider-section']}>
                <div className={styles['brand-slider']}>
                    <span>BMW 340i</span>
                </div>
                <div className={styles['price-slider']}>
                    <span>$50000</span>
                </div>

                <div className={styles["image-slider"]}>
                    <div className={styles["images"]}>{<img src={images[currentImage]} alt="cool" className={styles['active']} />}</div>
                    <div className={styles["thumbnails"]}>{images.map((image, index) => index === currentImage ? <img src={image} alt="cool" className={styles['active']} /> : <img src={image} alt="cool" onClick={() => changeImageHandler(index)} /> )}</div>
                    <div className={styles["back-btn"]} onClick={previousImageHandler}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </div>
                    <div className={styles["next-btn"]} onClick={nextImageHandler}>
                        <i className="fa-sharp fa-solid fa-arrow-right"></i>
                    </div>
                </div>
            </div>

            <div className={styles['car-details-section']}>
                <div className={styles['details-no-description']}>
                    <div className={styles['name']}>
                        <label>Year</label>
                    </div>
                    <div className={styles['details-content']}>
                        <p>
                            2017
                        </p>
                    </div>
                </div>

                <div className={styles['details-no-description']}>
                    <div className={styles['name']}>
                        <label>Horse Power</label>
                    </div>
                    <div className={styles['details-content']}>
                        <p>
                            326HP
                        </p>
                    </div>
                </div>

                <div className={styles['details-no-description']}>
                    <div className={styles['name']}>
                        <label>Gearbox</label>
                    </div>
                    <div className={styles['details-content']}>
                        <p>
                            Automatic
                        </p>
                    </div>
                </div>

                <div className={styles['details-no-description']}>
                    <div className={styles['name']}>
                        <label>Kilometers</label>
                    </div>
                    <div className={styles['details-content']}>
                        <p>
                            40000
                        </p>
                    </div>
                </div>

                <div className={styles['details-no-description']}>
                    <div className={styles['name']}>
                        <label>Fuel Type</label>
                    </div>
                    <div className={styles['details-content']}>
                        <p>
                            Petrol
                        </p>
                    </div>
                </div>

                <div className={styles['details-no-description']}>
                    <div className={styles['name']}>
                        <label>Description</label>
                    </div>
                    <div className={styles['details-content-description']}>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat dolores possimus quasi accusamus libero eum ea aut illum eius, error sequi eaque sed debitis, non iste provident modi tempora quae!

                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat dolores possimus quasi accusamus libero eum ea aut illum eius, error sequi eaque sed debitis, non iste provident modi tempora quae!
                        </p>
                    </div>
                </div>

                <div className={styles['details-no-description']}>
                    <div className={styles['name']}>
                        <label>City</label>
                    </div>
                    <div className={styles['details-content']}>
                        <p>
                            Plovdiv
                        </p>
                    </div>
                </div>

                <div className={styles['details-no-description']}>
                    <div className={styles['name']}>
                        <label>Phone Number</label>
                    </div>
                    <div className={styles['details-content']}>
                        <p>
                            0888892183
                        </p>
                    </div>
                </div>

                <div className={styles['price-car-brand']}>
                    <div className={styles['brand']}>
                        <span>BMW 340i</span>
                    </div>
                    <div className={styles['price']}>
                        <span>
                            $50000
                        </span>
                    </div>
                </div>
            </div>

        </section>
    );
}