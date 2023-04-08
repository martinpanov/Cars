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
                {/* <h1>Edit Car Ad</h1>

                <form id="edit-form" action={`/edit/${id}`} onSubmit={editFormHandler} encType="multipart/form-data" >
                    <div className={styles['details']}>
                        <div className={styles['name']}>
                            <label>Year</label>
                        </div>
                        <div className={styles['details-content']}>
                            <input type="number" name="year" placeholder="Year" value={car.year} onChange={changeHandler} />
                        </div>
                    </div>

                    <div className={styles['details']}>
                        <div className={styles['name']}>
                            <label>Horse Power</label>
                        </div>
                        <div className={styles['details-content']}>
                            <input type="number" name="horsePower" placeholder="Horse Power" value={car.horsePower} onChange={changeHandler} />
                        </div>
                    </div>

                    <div className={styles['details']}>
                        <div className={styles['name']}>
                            <label>Gearbox</label>
                        </div>
                        <div className={styles['details-content']} >
                            <select name="gearbox" value={car.gearbox} onChange={changeHandler}>
                                <option value="Manual">Manual</option>
                                <option value="Automatic">Automatic</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles['details']}>
                        <div className={styles['name']}>
                            <label>Kilometers</label>
                        </div>
                        <div className={styles['details-content']}>
                            <input type="number" name="kilometers" placeholder="Kilometers" value={car.kilometers} onChange={changeHandler} />
                        </div>
                    </div>

                    <div className={styles['details']}>
                        <div className={styles['name']}>
                            <label>Fuel Type</label>
                        </div>
                        <div className={styles['details-content']}>
                            <select name="fuelType" value={car.fuelType} onChange={changeHandler}>
                                <option value="Petrol">Petrol</option>
                                <option value="Diesel">Diesel</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles['details-description']}>
                        <div className={styles['name']}>
                            <label>Description</label>
                        </div>
                        <div className={styles['details-content-description']}>
                            <textarea name="description" placeholder="Description" value={car.description} onChange={changeHandler}></textarea>
                        </div>
                    </div>

                    <div className={styles['details']}>
                        <div className={styles['name']}>
                            <label>City</label>
                        </div>
                        <div className={styles['details-content']}>
                            <input type="text" name="city" placeholder="City" value={car.city} onChange={changeHandler} />
                        </div>
                    </div>

                    <div className={styles['details']}>
                        <div className={styles['name']}>
                            <label>Phone Number</label>
                        </div>
                        <div className={styles['details-content']}>
                            <input type="text" name="phoneNumber" placeholder="Fuel Type" value={car.phoneNumber} onChange={changeHandler} />

                        </div>
                    </div>

                    <div className={styles['details']}>
                        <div className={styles['name']}>
                            <label>Pictures</label>
                        </div>
                        <div className={styles['details-content']}>
                            <input type="file" name="images" accept="images/*" onChange={imageUploadHandler} />
                        </div>
                    </div>


                    <div className={styles['price-car-brand']}>
                        <div className={styles['brand']}>
                            <input type="text" name="manufacaturer" placeholder="manufacturer" value={car.manufacturer} onChange={changeHandler} />
                            <input type="text" name="model" placeholder="model" value={car.model} onChange={changeHandler} />
                        </div>
                        <div className={styles['price']}>
                            $<input type="number" name="price" placeholder="Price" value={car.price} onChange={changeHandler} />
                        </div>
                    </div>
                </form> */}
            </div>

            <div className={styles['image-slider-section']}>
                <button type="submit" form="edit-form">Edit</button>
                <ImageSlider
                    car={car}
                    setCar={setCar}
                    newImageFiles={newImageFiles}
                    setNewImageFiles={setNewImageFiles}
                />
                {/* <div className={styles["image-slider"]}>
                    <div className={styles["images"]}>
                        {car.imagesNames?.length > 0 && (() => {
                            const foundNewImage = newImageFiles.find(newImage => newImage.name === car.imagesNames[currentImage]);
                            const imgSrc = foundNewImage ? URL.createObjectURL(foundNewImage) : `https://cars-image-storage.s3.amazonaws.com/${car.imagesNames[currentImage]}`;
                            return <img src={imgSrc} alt="car" className={styles['active']} />;
                        })()}
                    </div>

                    <div className={styles["back-btn"]} onClick={previousImageHandler}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </div>
                    <div className={styles["next-btn"]} onClick={nextImageHandler}>
                        <i className="fa-sharp fa-solid fa-arrow-right"></i>
                    </div>
                    <div className={styles["thumbnails"]}>
                        {car.imagesNames?.length > 0 && car.imagesNames.map((image, index) => {
                            const newImageFile = newImageFiles.find(newImage => newImage.name === image);
                            const imgSrc = newImageFile ? URL.createObjectURL(newImageFile) : `https://cars-image-storage.s3.amazonaws.com/${image}`;
                            if (index === currentImage) {
                                return <img key={index} src={imgSrc} alt="carThumbnail" className={styles['active']} />;
                            } else {
                                return (<div key={index} className={styles["thumbnail-container"]}>
                                    <img src={imgSrc} alt="carThumbnail" onClick={() => changeImageHandler(index)} />
                                    <div className={styles["delete-btn"]} onClick={() => deleteImageHandler(index)}>X</div>
                                </div>);
                            }
                        })}
                    </div>
                </div> */}
            </div>
        </section >
    );
}