import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDeleteCarMutation, useGetCarQuery } from '../../api/cars';
import { UserContext } from '../../contexts/UserContext';
import styles from './Details.module.css';
import { RenderIf } from '../../components/RenderIf';
import { PageSpinner } from '../../components/Spinner/PageSpinner';
import { CarDetails } from './components/CarDetails';
import { ImageSlider } from '../../components/ImageSlider/ImageSlider';

export const Details: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { data, isLoading, error } = useGetCarQuery({ id });
  const { deleteCar } = useDeleteCarMutation();
  const car = data || {};
  const isOwner = user && user.userId === car._ownerId;

  useEffect(() => {
    if (error) {
      navigate('/catalog');
    }
  }, [error, navigate]);


  const deletedHandler = async () => {
    await deleteCar({ id });

    navigate('/catalog');
  };

  return (
    <section id={styles["details-page"]}>
      <RenderIf condition={isLoading}>
        <PageSpinner />
      </RenderIf>
      <RenderIf condition={!isLoading && car}>
        <div className={styles['image-slider-section']}>
          <div className={styles['image-slider-details']}>
            <div className={styles['image-slider-model-and-brand']}>
              <h1 className={styles['brand-slider']}>{car.manufacturer} {car.model}</h1>
              <h2 className={styles['price-slider']}>${car.price}</h2>
            </div>

            <RenderIf condition={isOwner}>
              <div className={styles['edit-and-delete']}>
                <button onClick={() => navigate(`/edit/${id}`)}>
                  Edit
                </button>
                <button onClick={deletedHandler}>
                  Delete
                </button>
              </div>
            </RenderIf>
          </div>

          <ImageSlider imageSources={car.imageNames} />
        </div>

        <CarDetails car={car} />
      </RenderIf>
    </section>
  );
};