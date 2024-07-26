import React from "react";
import { useState, useEffect, RefObject } from "react";
import Image from "next/image";
import EditButtons from "../EditButtons/EditButtons";

import useTranslation from "next-translate/useTranslation";
import styles from "./ProfileHeader.module.css";

interface ProfileHeaderProps {
  profilePicture: string;
  username: string;
  email: string;
  inEditMode: boolean;
  setInEditMode: (value: boolean) => void;
  editUserDetails: () => void;
  selectedFile: any;
  setSelectedFile: (value: any) => void;
  selectedFileRef: RefObject<HTMLInputElement>;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profilePicture,
  username,
  email,
  inEditMode,
  setInEditMode,
  editUserDetails,
  selectedFile,
  setSelectedFile,
  selectedFileRef,
}) => {
  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const { t } = useTranslation("account-settings");
  console.log(profilePicture);
  return (
    <div className={styles.container}>
      <div className={styles.backgroundStyle}></div>
      <div className="d-flex">
        <div className={styles.profilePicContainer}>
          {inEditMode ? (
            <div>
              <img
                src="/img/profile/image-plus.jpg"
                width={150}
                height={150}
                alt="Profile Pic"
                className={styles.profilePicStyle}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={selectedFileRef}
              />
            </div>
          ) : (
            <Image
              src={
                profilePicture != "" && profilePicture != "https://api.nearby.kz/media/profile_pictures/"
                  ? `${profilePicture}`
                  : "/img/profile/profile-icon.jpg"
              }
              width={150}
              height={150}
              alt="Profile Pic"
              className={styles.profilePicStyle}
            />
          )}
        </div>
        <div className="mt-3">
          <h5>{username}</h5>
          <span>{email}</span>
        </div>
        <div className={styles.editProfileButtonDiv}>
          {inEditMode ? (
            <EditButtons
              inEditMode={inEditMode}
              setInEditMode={setInEditMode}
              editUserDetails={editUserDetails}
            />
          ) : (
            <button
              className="btn btn-success"
              onClick={() => setInEditMode(!inEditMode)}
            >
              <Image
                src="/img/general/edit.png"
                width={10}
                height={10}
                alt="Edit Profile"
                className="me-2"
              />
              {t("edit-profile")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
