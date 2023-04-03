import styles from './Header.module.css';
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <>
            <div className={styles["header-content"]}>
                <div className={styles["header-content-text"]}>
                    <h1>Buy Or Rent Your <br /> <span>Dream Car</span> Today!</h1>
                    <p>Looking to buy or rent a car? Check the available cars<br /> for sale and rent and find the car  you've always wanted</p>
                    <div className={styles["header-content-buttons"]}>
                        <Link className={styles["header-content-buy-car"]} to="/catalog">Buy Car</Link>
                        <Link className={styles["header-content-rent-car"]} to="/rentcar">Rent Car</Link>
                    </div>
                </div>
                <img src='/assets/bmw-no-background1.png' alt="bmw" className={styles["header-content-image"]} />
            </div>

        </>
    );
}