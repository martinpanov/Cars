import { Link } from "react-router-dom";

import styles from './Hero.module.css';

export default function Header() {
    return (
        <section id={styles.hero}>
            <div className={styles["hero-wrapper"]}>
                <div className={styles["hero-content"]}>
                    <h1 className={styles["title"]}>Buy Or Rent Your <span>Dream Car</span> Today!</h1>
                    <h2 className={styles["subtitle"]}>Looking to buy or rent a car? Check the available cars for sale and rent and find the car  you've always wanted</h2>
                    <div className={styles["header-content-buttons"]}>
                        <Link className={styles["header-content-buy-car"]} to="/catalog">Buy Car</Link>
                        <Link className={styles["header-content-rent-car"]} to="/rentcar">Rent Car</Link>
                    </div>
                </div>
                <img src='/assets/bmw-no-background1.png' alt="bmw" className={styles["header-content-image"]} />
            </div>
        </section>
    );
}