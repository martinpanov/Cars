import { useContext, useState } from 'react';
import { useGetUserCarsQuery, useGetUserRentCarsQuery } from '../../api/profile';
import { UserContext } from '../../contexts/UserContext';
import styles from './MyProfile.module.css';
import { RenderIf } from '../../components/RenderIf';
import { MyProfilePicture } from './components/MyProfilePicture';
import { MyProfileSpinner } from '../../components/Spinner/MyProfileSpinner';
import { MyProfileCarCard } from './components/MyProfileCarsCard';

export const MyProfile: React.FC = () => {
  const { user } = useContext(UserContext);
  const [showCatalogCars, setShowCatalogCars] = useState(true);
  const userCarsQuery = useGetUserCarsQuery();
  const userRentCarsQuery = useGetUserRentCarsQuery();
  const catalogCars = userCarsQuery.data || [];
  const rentCars = userRentCarsQuery.data || [];
  const isLoading = userCarsQuery.isLoading || userRentCarsQuery.isLoading;

  return (
    <section id={styles['my-profile']}>
      <div className={styles['my-profile-content']}>
        <div className={styles['my-profile-details']}>
          <MyProfilePicture />
          <div className={styles['my-profile-info']}>
            <h2>{user.username}</h2>
            <span>{catalogCars ? catalogCars.length : 0} car listings</span>
            <span>{rentCars ? rentCars.length : 0} rented cars</span>
          </div>
        </div>

        <div className={styles['car-types']}>
          <button onClick={() => setShowCatalogCars(true)}>CAR LISTINGS</button>
          <button onClick={() => setShowCatalogCars(false)}>RENTED CARS</button>
        </div>

        <div className={styles['cars']}>
          <RenderIf condition={isLoading}>
            <MyProfileSpinner />
          </RenderIf>
          <RenderIf condition={showCatalogCars && !isLoading}>
            {catalogCars.map(car => <MyProfileCarCard key={car._id} car={car} isRental={false} />)}
          </RenderIf>
          <RenderIf condition={!showCatalogCars && !isLoading}>
            {rentCars.map(car => <MyProfileCarCard key={car._id} car={car} isRental={true} />)}
          </RenderIf>
        </div>
      </div>
    </section>
  );
};