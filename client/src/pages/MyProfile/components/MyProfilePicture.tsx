import { useRef } from 'react';
import styles from '../MyProfile.module.css';
import { useGetProfilePictureQuery, usePostProfilePictureMutation } from '../../../api/profile';
import { IMAGES_URL } from '../../../utils/constants';

export const MyProfilePicture: React.FC = () => {
  const fileInput = useRef(null);
  const { data: profilePicture, getProfilePicture } = useGetProfilePictureQuery();
  const { postProfilePicture } = usePostProfilePictureMutation();

  const imageUploadHandler = async (e) => {
    if (e.target.files.length <= 0) {
      return;
    }

    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    const newProfilePicture = await postProfilePicture(formData);

    if (newProfilePicture) {
      await getProfilePicture();
    };
  };

  return (
    <div className={styles['my-profile-image-section']}>
      <div className={styles['my-profile-image']}>
        {profilePicture ? <img src={`${IMAGES_URL}${profilePicture}`} alt="cool-person" /> : <img src="/assets/profile-picture.jpg" alt="cool-person" />}
        <div className={styles["change-photo-button"]} onClick={() => fileInput.current?.click()} >
          <input type="file" ref={fileInput} style={{ display: 'none' }} onChange={imageUploadHandler} />
          <i className="fa-solid fa-camera"></i>
        </div>
      </div>
    </div>
  );
};