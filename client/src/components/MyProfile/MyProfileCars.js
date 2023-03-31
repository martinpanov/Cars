import { Link } from 'react-router-dom';
import styles from './MyProfileCars.module.css';
import bmwImage from "../../assets/bmw-header-webp.webp";

export default function MyProfileCars({ car, isRental }) {
    return (
        <>
            {!isRental ?
                <Link to={`/catalog/${car._id}`}>
                    <div className={styles['car']}>
                        <div className={styles['car-image']}>
                            <img src={bmwImage} alt="car" />
                        </div>
                        <div className={styles['car-model']}>
                            <span>{car.manufacturer} {car.model}</span>
                        </div>
                    </div>
                </Link>
                :
                <Link to='/rentcar'>
                    <div className={styles['car']}>
                        <div className={styles['car-image']}>
                            <img src={car.img} alt="car" />
                        </div>
                        <div className={styles['car-model']}>
                            <span>{car.manufacturer} {car.model}</span>
                        </div>
                    </div>
                </Link>
            }
        </>
    );
};