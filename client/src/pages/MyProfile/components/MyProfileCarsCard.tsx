import { Link } from 'react-router-dom';

import styles from './MyProfileCars.module.css';
import { IMAGES_URL } from '../../../utils/constants';
import type { Car, RentalCar } from '../../../types/car';

type Props = {
  car: Car | RentalCar;
  isRental: boolean;
};

export const MyProfileCarCard: React.FC<Props> = ({ car, isRental }) => {
  return (
    <Link to={!isRental ? `/details/${car._id}` : '/rentcar'}>
      <div className={styles['car']}>
        <img src={!isRental ? `${IMAGES_URL}${(car as Car).imagesNames[0]}` : (car as RentalCar).img} alt="car" />
        <span>{car.manufacturer} {car.model}</span>
      </div>
    </Link>
  );
};