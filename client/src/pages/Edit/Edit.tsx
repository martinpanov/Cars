// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { UserContext } from "../../contexts/UserContext";
// import styles from './Edit.module.css';
// import toast from "react-hot-toast";
// import { RenderIf } from "../../components/RenderIf";
// import { getCar } from "../../api/cars";
// import { PageSpinner } from "../../components/Spinner/PageSpinner";
// import { EditForm } from "./components/EditForm";
// import { ImageSlider } from "../../components/ImageSlider/ImageSlider";

// export const Edit: React.FC = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user } = useContext(UserContext);
//   const [isLoading, setIsLoading] = useState(true);
//   const [newImageFiles, setNewImageFiles] = useState([]);
//   const [car, setCar] = useState({
//     manufacturer: '',
//     model: '',
//     price: '',
//     year: '',
//     phoneNumber: '',
//     description: '',
//     gearbox: 'Manual',
//     city: '',
//     fuelType: 'Petrol',
//     horsePower: '',
//     kilometers: '',
//     images: [],
//     imagesNames: []
//   });

//   useEffect(() => {
//     getCar(id)
//       .then(car => {
//         if (user?.userId !== car._ownerId) {
//           return navigate('/');
//         }

//         setCar(car);
//         setIsLoading(false);
//       })
//       .catch(error => {
//         error.message.forEach(error => toast.error(error));
//         navigate('/catalog');
//       });
//   }, [id, navigate, user?.userId]);

//   return (
//     <section id={styles["edit-page"]}>
//       <RenderIf condition={isLoading}>
//         <PageSpinner />
//       </RenderIf>
//       <RenderIf condition={!isLoading}>
//         <React.Fragment>
//           <div className={styles['car-details-section']}>
//             <h1>Edit Car Ad</h1>

//             <EditForm
//               id={id}
//               car={car}
//               setCar={setCar}
//               newImageFiles={newImageFiles}
//               setNewImageFiles={setNewImageFiles}
//               setIsLoading={setIsLoading}
//             />
//           </div>

//           <div className={styles['image-slider-section']}>
//             <button type="submit" form="edit-form">Edit</button>
//             <ImageSlider
//               car={car}
//               setCar={setCar}
//               newImageFiles={newImageFiles}
//               setNewImageFiles={setNewImageFiles}
//               onDeleteImage={(index) => {
//                 setCar(prev => ({
//                   ...prev,
//                   imageNames: prev.images.filter((_, i) => i !== index)
//                 }));
//               }}
//             />
//           </div>
//         </React.Fragment>
//       </RenderIf>
//     </section>
//   );
// };