import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faPhone,
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

import useTranslation from "next-translate/useTranslation";
import styles from "./ProfileDetails.module.css";

interface ProfileDetailsProps {
  email: string;
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  birthdate: string;
  setBirthdate: (value: string) => void;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  organizationName: string;
  setOrganizationName: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  profilePicture: string;
  setProfilePicture: (value: string) => void;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  email,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  birthdate,
  setBirthdate,
  phoneNumber,
  setPhoneNumber,
  organizationName,
  setOrganizationName,
  location,
  setLocation,
  profilePicture,
  setProfilePicture,
}) => {
  const { t } = useTranslation("account-settings");

  return (
    <div className={styles.container}>
      <div className="row pb-3 border-bottom">
        <div className="col-md-4">
          <p>
            <b>{t("personal-info")}</b>
          </p>
          <p className={styles.headerDesc}>{t("update-personal-details")}</p>
        </div>
        <div className={`col-md-5 p-3 ${styles.border}`}>
          <div className="d-flex align-items-center">
            <div>
              <Image
                src={
                  profilePicture != "" && profilePicture != "https://api.nearby.kz/media/profile_pictures/"
                    ? `${profilePicture}`
                    : "/img/profile/profile-icon.jpg"
                }
                width={40}
                height={40}
                alt="Profile Pic"
                className={styles.profilePicSmall}
              />
            </div>
            <div className="ms-3">
              <label className={styles.profileLabel}>{t("first-name")}</label>
              <input
                type="text"
                value={firstName}
                className="form-control mt-1"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="ms-3">
              <label className={styles.profileLabel}>{t("last-name")}</label>
              <input
                type="text"
                value={lastName}
                className="form-control mt-1"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-3">
            <label className={styles.profileLabel}>{t("dob")}</label>
            <div className="input-group mt-1">
              <span className="input-group-text bg-white" id="basic-addon1">
                <FontAwesomeIcon icon={faCalendar} />
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-3">
            <label className={styles.profileLabel}>{t("phone-number")}</label>
            <div className="input-group mt-1">
              <span className="input-group-text bg-white" id="basic-addon1">
                <FontAwesomeIcon icon={faPhone} />
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-3">
            <label className={styles.profileLabel}>{t("email")}</label>
            <div className="input-group mt-1">
              <span className="input-group-text bg-white" id="basic-addon1">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <input
                type="email"
                className="form-control border-start-0"
                value={email}
                disabled
              />
            </div>
          </div>

          <div className="mt-3">
            <label className={styles.profileLabel}>
              {t("name-organization")}
            </label>
            <div className="input-group mt-1">
              <input
                type="text"
                className="form-control"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-3">
            <label className={styles.profileLabel}>{t("location")}</label>
            <div className="input-group mt-1">
              <span className="input-group-text bg-white" id="basic-addon1">
                <FontAwesomeIcon icon={faLocationDot} />
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
