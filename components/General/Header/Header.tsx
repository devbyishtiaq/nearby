import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import setLanguage from "next-translate/setLanguage";
import Link from "next/link";

import useTranslation from "next-translate/useTranslation";
import styles from "./Header.module.css";

interface HeaderProps {
  isAuth?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isAuth }) => {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState(router.locale);
  const handleChangeLanguage = async (event: any) => {
    const selectedLanguage = event.target.value;
    await setLanguage(selectedLanguage);
  };
  useEffect(() => {
    setSelectedLanguage(router.locale);
  }, [router.locale]);

  const { t } = useTranslation("common");

  return (
    <>
      <header className={styles.header}>
        <nav className={`${styles.nav} ${styles.nav__container} `}>
          <input type="checkbox" id={styles.nav__toggler} />
          <div className={styles.logo__container}>
            <label className={styles.nav__toggle} htmlFor={styles.nav__toggler}>
              <div></div>
              <div></div>
              <div></div>
            </label>
            {/* <label htmlFor={styles.nav__toggler} className={styles.nav__toggle}>
              <img
                src="/img/header/nav-burger.svg"
                alt="navBurger"
                className={styles.nav__burger}
              />
            </label> */}
            <Link href="/">
              <img
                src="/img/header/logo-nearby.png"
                alt="navLogo"
                className={styles.nav__logo}
              />
            </Link>
          </div>
          {!isAuth ? (
            <ul className={`${styles.nav__list} ${styles.navContainer}`}>
              <li className={styles.nav__item}>
                <Link href="https://t.me/nearbykz" className={styles.nav__link}>
                  {t("forum")}
                </Link>
              </li>
              <li className={styles.nav__item}>
                <Link
                  href="https://news.nearby.kz/"
                  className={styles.nav__link}
                >
                  {t("news")}
                </Link>
              </li>
              <li className={styles.nav__item}>
                <Link href="/#buy-plan" className={styles.nav__link}>
                  {t("rates")}
                </Link>
              </li>
              <li className={styles.nav__item}>
                <Link
                  href="/counterparty-assessment"
                  className={styles.nav__link}
                >
                  {t("counterparty-assessment")}
                </Link>
              </li>
              <li className={styles.nav__item}>
                <Link href="/legal-design" className={styles.nav__link}>
                  {t("legalDesign")}
                </Link>
              </li>
              <li className={styles.nav__item}>
                <Link href="/legal-lab" className={styles.nav__link}>
                  {t("legal-lab")}
                </Link>
              </li>
              <li className={styles.nav__item}>
                <Link href="/expert-opinion" className={styles.nav__link}>
                  {t("expert-opinions")}
                </Link>
              </li>
              <li className={styles.nav__item}>
                <Link href="/#faq" className={styles.nav__link}>
                  {t("faq")}
                </Link>
              </li>
              <li className={styles.nav__item}>
                <Link href="/contact" className={styles.nav__link}>
                  {t("contact")}
                </Link>
              </li>
            </ul>
          ) : (
            <></>
          )}

          <div className={styles.locale__container}>
            <div className={styles.locale__box}>
              <img
                src={`/img/header/locale-logo-${selectedLanguage}.svg`}
                alt="locale"
              />
              <select
                className={styles.locale__switcher}
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
            <Link
              href="/login"
              className={`${styles.btn__nav} button btn__full ${isAuth ? "black-bg" : ""} `}
            >
              {t("login")}
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
