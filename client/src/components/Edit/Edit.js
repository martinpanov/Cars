import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

import { getCar } from "../../services/carService";

import styles from './Edit.module.css';

import EditForm from "./EditForm";
import ImageSlider from "./ImageSlider";
import PageSpinner from "../Spinner/PageSpinner";
import toast from "react-hot-toast";


export default function Edit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user] = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [newImageFiles, setNewImageFiles] = useState([]);
    const [car, setCar] = useState({});

    useEffect(() => {
        getCar(id)
            .then(car => {
                if (user.userId !== car._ownerId) {
                    return navigate('/');
                }

                setCar(car);
                setIsLoading(false);
            })
            .catch(error => {
                error.message.forEach(error => toast.error(error));
                navigate('/catalog');
            });
    }, [id, navigate, user.userId]);

    return (
        <section id={styles["edit-page"]}>
            {isLoading ? <PageSpinner /> :
                <>
                    <div className={styles['car-details-section']}>
                        <h1>Edit Car Ad</h1>

                        <EditForm
                            id={id}
                            car={car}
                            setCar={setCar}
                            newImageFiles={newImageFiles}
                            setNewImageFiles={setNewImageFiles}
                            setIsLoading={setIsLoading}
                        />
                    </div>

                    <div className={styles['image-slider-section']}>
                        <button type="submit" form="edit-form">Edit</button>
                        <ImageSlider
                            car={car}
                            setCar={setCar}
                            newImageFiles={newImageFiles}
                            setNewImageFiles={setNewImageFiles}
                        />
                    </div>
                </>
            }
        </section>
    );
}