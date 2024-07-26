import React from "react";
import Image from "next/image";
import styles from "./Topbar.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useTranslation from "next-translate/useTranslation";
import setLanguage from "next-translate/setLanguage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface TopbarProps {
  size?: string;
  username?: string;
  sidebarHidden: boolean;
  setSidebarHidden: (value: boolean) => void;
}

const Topbar: React.FC<TopbarProps> = ({
  size,
  username = "",
  sidebarHidden,
  setSidebarHidden,
}) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState(router.locale);
  const [searchValue, setSearchValue] = useState<any>("");

  const handleChangeLanguage = async (event: any) => {
    const selectedLanguage = event.target.value;
    await setLanguage(selectedLanguage);
  };
  useEffect(() => {
    setSelectedLanguage(router.locale);
  }, [router.locale]);

  const handleKeyPress = (event: any) => {
    const currentPath: string = router.pathname.toString();
    if (event.key === 'Enter') {
      if (currentPath.includes('/government-body-responses')) {
        router.push(`/government-body-responses?query=${searchValue}`);
      } else {
        router.push(`/legislative-base?query=${searchValue}`);
      }
    }
  };

  return (
    <div
      className={`${styles.container} ${size === "small" ? styles.smallWidth : ""}`}
    >
      <button onClick={() => setSidebarHidden(!sidebarHidden)}>
        <Image
          src="/img/general/hamburger.png"
          width={30}
          height={30}
          alt="Hamburger Menu"
        />
      </button>
      <span className={styles.welcomeText}>
        {t("welcome")} {username}
      </span>
      <div className={`input-group ${styles.inputGroup}`}>
        <span
          className={`input-group-text ${styles.inputIcon}`}
          id="basic-addon1"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </span>
        <input
          type="text"
          className={`form-control ${styles.input}`}
          placeholder={t("search-for-legal-documents")}
          onKeyPress={handleKeyPress}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      <div
        className={`nav__element locale__container ${styles.languageContainer}`}
      >
        <div className="locale__box">
          <Image
            src={`/img/header/locale-logo-${selectedLanguage}.svg`}
            width={30}
            height={30}
            alt="locale"
            className="locale__logo"
          />
          <select
            className={styles.localeSwitcher}
            onChange={handleChangeLanguage}
            defaultValue={selectedLanguage}
          >
            <option className={styles.locale__option} value="kz">
              Kaz (KZ)
            </option>
            <option className={styles.locale__option} value="ru">
              Rus (RU)
            </option>
            <option className={styles.locale__option} value="en">
              Eng (EN)
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
