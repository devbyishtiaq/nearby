import React from "react";

import CountryDropdown from "../../General/CountryDropdown/CountryDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

import useTranslation from "next-translate/useTranslation";
import styles from "./ProfileBio.module.css";

interface ProfileBioProps {
  username: string;
  setUsername: (value: string) => void;
  website: string;
  setWebsite: (value: string) => void;
  bio: string;
  setBio: (value: string) => void;
  country: string;
  setCountry: (value: string) => void;
  timezone: string;
  setTimezone: (value: string) => void;
  availableForProjects: boolean;
  setAvailableForProjects: (value: boolean) => void;
}

const ProfileBio: React.FC<ProfileBioProps> = ({
  username,
  setUsername,
  website,
  setWebsite,
  bio,
  setBio,
  country,
  setCountry,
  timezone,
  setTimezone,
  availableForProjects,
  setAvailableForProjects,
}) => {
  const { t } = useTranslation("account-settings");

  return (
    <div className="row mt-3">
      <div className="col-md-4">
        <p>
          <b>{t("personal")}</b>
        </p>
        <p className={styles.headerDesc}>{t("personal-description")}</p>
      </div>
      <div className={`col-md-7 p-3 ${styles.border}`}>
        <div>
          <div className="d-flex align-items-center">
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={availableForProjects}
                onClick={(e) => setAvailableForProjects(!availableForProjects)}
              />
              <span className={`${styles.slider} ${styles.round}`}></span>
            </label>
            <span>{t("available-projects")}</span>
          </div>

          <p className={styles.openForWorkText}>
            {availableForProjects
              ? t("available-text-ok")
              : t("available-text-not")}
          </p>
        </div>

        <div className="mt-3">
          <label className="mb-2 text-muted">{t("username")}</label>
          <div className="input-group">
            <span
              className="input-group-text bg-white text-muted"
              id="basic-addon1"
            >
              nearby.kz/
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-3">
          <label className="mb-2 text-muted">{t("website")}</label>
          <div className="input-group">
            <span
              className="input-group-text bg-white text-muted"
              id="basic-addon1"
            >
              https://
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-3">
          <label className="mb-2 text-muted">{t("bio")}</label>
          <textarea
            className="form-control"
            placeholder={t("bio-placeholder")}
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <div className="mt-3">
          <label className="mb-2 text-muted">{t("country")}</label>
          <CountryDropdown
            dropdownLabel="Select Country"
            country={country}
            setCountry={setCountry}
          />
        </div>

        <div className="mt-3">
          <label className={styles.profileLabel}>{t("timezone")}</label>
          <div className="input-group mt-1">
            <span className="input-group-text bg-white" id="basic-addon1">
              <FontAwesomeIcon icon={faClock} />
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBio;
