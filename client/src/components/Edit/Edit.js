import { useNavigate, useParams } from "react-router-dom";
import { edit, getCar } from "../../services/carService";
import { useEffect, useState } from "react";
import styles from './Edit.module.css';


export default function Edit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentImage, setCurrentImage] = useState(0);
    const [allImages, setAllImages] = useState([]);
    const [newImageFiles, setNewImageFiles] = useState([]);
    const [car, setCar] = useState({});


    useEffect(() => {
        getCar(id)
            .then(car => {
                setAllImages(car.imagesNames);
                setCar(car);
            });
    }, [id]);

    const editFormHandler = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();

            for (let [key, value] of Object.entries(car)) {
                if (key === 'imagesNames') {
                    continue;
                } else {
                    formData.append(key, value);
                }
            };

            for (let image of allImages) {
                const newImageFile = newImageFiles.find(newImage => newImage.name === image);
                if (newImageFile) {
                    formData.append('images', newImageFile);
                } else {
                    formData.append('imagesNames', image);
                }
            }

            await edit(id, formData);
            return navigate(`/details/${id}`);
        } catch (error) {
            console.log(error);
        }
    };

    const changeHandler = (e) => {
        setCar(car => ({ ...car, [e.target.name]: e.target.value }));
    };

    const deleteImageHandler = (index) => {
        const copyAllImages = [...allImages];
        const imageNameToBeDeleted = copyAllImages.filter((image, imageIndex) => imageIndex === index);
        copyAllImages.splice(index, 1);

        setNewImageFiles(state => state.filter(image => image.name !== imageNameToBeDeleted));
        setAllImages(copyAllImages);
        setCurrentImage(state => {
            if (state - 1 <= 0) {
                return state = 0;
            } else if (state + 1 >= allImages.length) {
                return state = allImages.length - 1;
            } else {
                return state;
            }
        });
    };

    const imageUploadHandler = (e) => {
        if (e.target.files.length <= 0) {
            return
        }

        if (allImages.length > 12) {
            return console.log('You can upload 12 images at most');
        }

        setAllImages(state => [...state, e.target.files[0].name]);
        setNewImageFiles(state => [...state, e.target.files[0]]);
    };

    const nextImageHandler = () => {
        if (currentImage + 1 > allImages.length - 1) {
            setCurrentImage(0);
        } else {
            setCurrentImage(state => state + 1);
        }
    };

    const previousImageHandler = () => {
        if (currentImage - 1 < 0) {
            setCurrentImage(allImages.length - 1);
        } else {
            setCurrentImage(state => state - 1);
        }
    };

    const changeImageHandler = (index) => {
        setCurrentImage(index);
    };

    return (
        <section id={styles["edit-page"]}>

            <div className={styles['car-details-section']}>

                <h1>Edit Car Ad</h1>

                <form action={`/edit/${id}`} onSubmit={editFormHandler} encType="multipart/form-data" >
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
                    <button>Edit</button>
                </form>
            </div>

            <div className={styles['image-slider-section']}>
                <div className={styles["image-slider"]}>
                    <div className={styles["images"]}>
                        {allImages.length > 0 && (() => {
                            const foundNewImage = newImageFiles.find(newImage => newImage.name === allImages[currentImage]);
                            const imgSrc = foundNewImage ? URL.createObjectURL(foundNewImage) : `https://cars-image-storage.s3.amazonaws.com/${allImages[currentImage]}`;
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
                        {allImages.length > 0 && allImages.map((image, index) => {
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
                </div>
            </div>
        </section >
    );
}