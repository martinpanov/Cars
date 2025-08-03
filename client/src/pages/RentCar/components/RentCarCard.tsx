import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../contexts/UserContext';
import { useRentCarMutation } from '../../../api/rent-car';
import styles from './RentCarCard.module.css';
import { ButtonSpinner } from '../../../components/Spinner/ButtonSpinner';
import type { RentalCar } from '../../../types/car';

type Props = {
  car: RentalCar;
  getRentCars: () => void;
};

export const RentCarCard: React.FC<Props> = ({ car, getRentCars }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { isLoading, rentCar } = useRentCarMutation();
  const isOwner = user && car.rentedBy === user.userId;

  const rentClickHandler = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    await rentCar({ carId: car._id });
    await getRentCars();
  };

  const renderConditionalButton = () => {
    if ((!user && car.rentedBy) || (user && car.rentedBy && !isOwner)) {
      return null;
    }

    const buttonText = (user && car.rentedBy && isOwner) ? 'Cancel Rent' : 'Rent Now';

    return (
      <button onClick={rentClickHandler} disabled={isLoading}>
        {isLoading ? <ButtonSpinner /> : buttonText}
      </button>
    );
  };

  return (
    <div className={styles["car"]}>
      <div className={styles["car-image"]}>
        <img src={car.rentedBy ? '/assets/rented.webp' : car.img} alt="car" />
      </div>
      <div className={styles["details"]}>
        <h2>{car.manufacturer} {car.model}</h2>

        <div className={styles["car-specs"]}>
          <span className={styles["seats"]}><i className="fa-sharp fa-solid fa-users"></i> {car.seats} seats </span>
          <span className={styles["doors"]}><i className="fa-solid fa-door-open"></i> {car.doors} doors </span>
          <span className={styles["ac"]}><i className="fa-solid fa-snowflake"></i> A/C </span>
          <span className={styles["gearbox"]}><i className="fa fa-gears"></i> {car.gearbox} </span>
          <span className={styles["fuel"]}><i className="fa fa-gas-pump"></i> {car.fuelType} </span>
          <span className={styles["city"]}><i className="fa fa-city"></i> {car.city} </span>
        </div>

        <div className={styles["car-listing-price"]}>
          <span>${car.price} / day</span>
        </div>
        {renderConditionalButton()}
      </div>
    </div>
  );
};