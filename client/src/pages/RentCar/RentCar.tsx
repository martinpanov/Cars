import { useSearchParams } from 'react-router-dom';
import { useGetRentCarsQuery } from '../../api/rent-car';
import styles from './RentCar.module.css';
import { RenderIf } from '../../components/RenderIf';
import { PageSpinner } from '../../components/Spinner/PageSpinner';
import { RentCarCard } from './components/RentCarCard';
import type { RentalCar } from '../../types/car';
import { RentCarForm } from './components/RentCarForm';

export const RentCar: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { data, isLoading, getRentCars } = useGetRentCarsQuery({ queryString: searchParams.toString() });
  const rentCars = data || [];

  return (
    <section id={styles['rent-car-page']}>
      <RenderIf condition={isLoading}>
        <PageSpinner />
      </RenderIf>
      <RenderIf condition={!isLoading && rentCars}>
        <RentCarForm />
        <div className={styles['cars']}>
          {rentCars.map((car: RentalCar) => <RentCarCard key={car._id} car={car} getRentCars={getRentCars} />)}
        </div>
      </RenderIf>
    </section>
  );
};