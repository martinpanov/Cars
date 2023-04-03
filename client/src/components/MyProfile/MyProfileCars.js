import { Link } from 'react-router-dom';
import styles from './MyProfileCars.module.css';

export default function MyProfileCars({ car, isRental }) {
    return (
        <>
            {!isRental ?
                <Link to={`/details/${car._id}`}>
                    <div className={styles['car']}>
                        <div className={styles['car-image']}>
                            <img src={`https://cars-image-storage.s3.amazonaws.com/${car.imagesNames[0]}`} alt="car" />
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