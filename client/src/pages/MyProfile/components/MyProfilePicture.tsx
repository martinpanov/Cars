import { useRef } from "react";

import {
  useGetProfilePictureQuery,
  usePostProfilePictureMutation,
} from "../../../api/profile";
import { CloudinaryImage } from "../../../components/CloudinaryImage/CloudinaryImage";
import { Flex } from "../../../components/Flex/Flex";
import { RenderIf } from "../../../components/RenderIf";
import styles from "./MyProfilePicture.module.css";

export const MyProfilePicture: React.FC = () => {
  const fileInput = useRef(null);
  const { data: profilePicture, getProfilePicture } =
    useGetProfilePictureQuery();
  const { postProfilePicture } = usePostProfilePictureMutation();

  const imageUploadHandler = async e => {
    if (e.target.files.length <= 0) {
      return;
    }

    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    const newProfilePicture = await postProfilePicture(formData);

    if (newProfilePicture) {
      await getProfilePicture();
    }
  };

  return (
    <Flex
      justify="center"
      align="center"
      className={styles["my-profile__image-section"]}
    >
      <RenderIf condition={profilePicture}>
        <div className={styles["my-profile__image-wrapper"]}>
          <CloudinaryImage
            publicId={profilePicture}
            width={150}
            height={150}
            crop="fill"
            alt="profile picture"
          />
        </div>
      </RenderIf>
      <RenderIf condition={!profilePicture}>
        <img
          src="/assets/profile-picture.jpg"
          alt="default profile"
          style={{ width: 150, height: 150, objectFit: "cover" }}
        />
      </RenderIf>
      <div
        className={styles["my-profile__button"]}
        onClick={() => fileInput.current?.click()}
      >
        <input
          type="file"
          ref={fileInput}
          style={{ display: "none" }}
          onChange={imageUploadHandler}
        />
        <i className="fa-solid fa-camera"></i>
      </div>
    </Flex>
  );
};
