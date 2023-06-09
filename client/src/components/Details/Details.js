import { useNavigate, useParams } from 'react-router-dom';
import { deleteCar, getCar } from '../../services/carService';
import styles from './Details.module.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import ImageSlider from './ImageSlider';
import CarDetails from './CarDetails';

export default function Details() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user] = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [car, setCar] = useState({});

    useEffect(() => {
        getCar(id)
            .then(car => {
                setCar(car);
                setIsLoading(false);
            });
    }, [id]);

    const editHandler = () => {
        navigate(`/edit/${id}`);
    };

    const deletedHandler = async () => {
        try {
            setIsLoading(true);

            await deleteCar(id);

            setIsLoading(false);

            return navigate('/catalog');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section id={styles["details-page"]}>
            {isLoading ? <img className={styles['loading']} src='/assets/Gear-0.2s-200px-white-background.svg' alt='loading' /> :
                <>
                    <div className={styles['image-slider-section']}>
                        <div className={styles['image-slider-details']}>
                            <div className={styles['image-slider-model-and-brand']}>
                                <h1 className={styles['brand-slider']}>{car.manufacturer} {car.model}</h1>
                                <h2 className={styles['price-slider']}>${car.price}</h2>
                            </div>

                            {user && user.userId === car._ownerId ?
                                <div className={styles['edit-and-delete']}>
                                    <button onClick={editHandler}>
                                        Edit
                                    </button>
                                    <button onClick={deletedHandler}>
                                        Delete
                                    </button>
                                </div> :
                                null
                            }
                        </div>

                        <ImageSlider car={car} />
                    </div>

                    <div className={styles['car-details-section']}>
                        <CarDetails car={car} />
                    </div>

                </>
            }
        </section>
    );
}