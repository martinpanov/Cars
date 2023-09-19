import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

import { deleteCar, getCar } from '../../services/carService';

import styles from './Details.module.css';
import toast from 'react-hot-toast';

import ImageSlider from './ImageSlider';
import CarDetails from './CarDetails';
import PageSpinner from '../Spinner/PageSpinner';

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
            })
            .catch(error => {
                error.message.forEach(error => toast.error(error));
                navigate('/catalog');
            });
    }, [id, navigate]);

    const editHandler = () => {
        navigate(`/edit/${id}`);
    };

    const deletedHandler = async () => {
        try {
            setIsLoading(true);

            await deleteCar(id);

            return navigate('/catalog');
        } catch (error) {
            error.message.forEach(err => toast.error(err));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id={styles["details-page"]}>
            {isLoading ? <PageSpinner /> :
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

                    <CarDetails car={car} />
                </>
            }
        </section>
    );
}