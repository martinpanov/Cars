import { useNavigate, useParams } from "react-router-dom";
import { getCar } from "../../services/carService";
import { useContext, useEffect, useState } from "react";
import styles from './Edit.module.css';
import { UserContext } from "../../contexts/UserContext";
import EditForm from "./EditForm";
import ImageSlider from "./ImageSlider";


export default function Edit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user] = useContext(UserContext);
    const [newImageFiles, setNewImageFiles] = useState([]);
    const [car, setCar] = useState({});

    useEffect(() => {
        getCar(id)
            .then(car => {
                if (user.userId !== car._ownerId) {
                    return navigate('/');
                }

                setCar(car);
            });
    }, [id, navigate, user.userId]);

    return (
        <section id={styles["edit-page"]}>

            <div className={styles['car-details-section']}>
                <h1>Edit Car Ad</h1>

                <EditForm
                    id={id}
                    car={car}
                    setCar={setCar}
                    newImageFiles={newImageFiles}
                    setNewImageFiles={setNewImageFiles}
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
        </section >
    );
}