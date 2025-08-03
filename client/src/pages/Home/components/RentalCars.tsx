import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../contexts/UserContext';
import { useGetRentCarsQuery, useRentCarMutation } from '../../../api/rent-car';
import styles from './RentalCars.module.css';
import { ButtonSpinner } from '../../../components/Spinner/ButtonSpinner';

export const RentalCars: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [selectedCarId, setSelectedCarId] = useState('');
  const { data, getRentCars } = useGetRentCarsQuery();
  const { isLoading, rentCar } = useRentCarMutation();

  const cars = data?.sort((a, b) => Number(Boolean(a.rentedBy)) - Number(Boolean(b.rentedBy))) || [];
  const rentalCar = cars.find(car => car._id === selectedCarId) || cars[0] || {};
  const isOwner = user && user.userId === rentalCar.rentedBy;

  useEffect(() => {
    if (!selectedCarId && cars.length > 0) {
      setSelectedCarId(cars[0]._id);
    }
  }, [cars, selectedCarId]);

  const rentClickHandler = async () => {
    if (!user) {
      return navigate('/login');
    }

    await rentCar({ carId: selectedCarId });

    await getRentCars();
  };

  const renderConditionalButton = () => {
    if ((!user && rentalCar.rentedBy) || (user && rentalCar.rentedBy && !isOwner)) {
      return null;
    }

    const buttonText = (user && rentalCar.rentedBy && isOwner)
      ? 'Cancel Rent'
      : 'Rent Now';

    return (
      <button onClick={rentClickHandler} disabled={isLoading}>
        {isLoading ? <ButtonSpinner /> : buttonText}
      </button>
    );
  };

  return (
    <section id={styles["rent-car"]}>
      <h2>Rent a Reliable and Comfortable Car for Your Next Adventure</h2>
      <div className={styles["rental-cars"]}>
        <div className={styles["rental-cars-buttons"]}>
          {cars && cars.map(car => <button key={car._id} onClick={() => setSelectedCarId(car._id)}>{car.manufacturer} {car.model}</button>)}
        </div>
        <div className={styles["rental-car-image"]}>
          {rentalCar.rentedBy ?
            <img src='/assets/rented.webp' alt="Rented" /> :
            <img src={rentalCar.img} alt="Rental Car" />
          }
        </div>
        <div className={styles["rental-car-details"]}>
          <div className={styles["rental-car-price"]}>
            <span>${rentalCar.price} / rent per day</span>
          </div>

          <div className={styles["rental-car-specs"]}>
            <div className={styles["rental-car-manufacturer-col"]}>
              <span>Manufacturer</span>
              <span>{rentalCar.manufacturer}</span>
            </div>

            <div className={styles["rental-car-manufacturer-col"]}>
              <span>Model</span>
              <span>{rentalCar.model}</span>
            </div>

            <div className={styles["rental-car-manufacturer-col"]}>
              <span>Year</span>
              <span>{rentalCar.year}</span>
            </div>

            <div className={styles["rental-car-manufacturer-col"]}>
              <span>Transmission</span>
              <span>{rentalCar.gearbox}</span>
            </div>

            <div className={styles["rental-car-manufacturer-col"]}>
              <span>Fuel</span>
              <span>{rentalCar.fuelType}</span>
            </div>
          </div>
          {renderConditionalButton()}
        </div>
      </div>
    </section>
  );
};