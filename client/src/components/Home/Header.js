import styles from './Header.module.css';
import bmwNoBackground from '../../assets/bmw-no-background1.png';
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <>
            <div className={styles["header-content"]}>
                <div className={styles["header-content-text"]}>
                    <h1>Buy Or Rent Your <br /> <span>Dream Car</span> Today!</h1>
                    <p>Looking to buy or rent a car? Check the available cars<br /> for sale and rent and find the car  you've always wanted</p>
                    <div className={styles["header-content-buttons"]}>
                        <Link className={styles["header-content-buy-car"]} to="/search">Buy Car</Link>
                        <Link className={styles["header-content-rent-car"]} to="/search">Rent Car</Link>
                    </div>
                </div>
                <img src={bmwNoBackground} alt="bmw" className={styles["header-content-image"]} />
            </div>

        </>
    );
}