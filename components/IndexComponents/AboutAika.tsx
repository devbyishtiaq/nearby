import React from "react";
import Link from "next/link";

import useTranslation from "next-translate/useTranslation";
import styles from "./IndexComponents.module.css";

const AboutAika: React.FC = () => {
  const { t } = useTranslation("index");

  return (
    <>
      <section className={styles.aboutAika} id={styles.aboutAika}>
        <h2 className={`${styles.section__title} title__center`}>
          <span>{t("aboutAika__title")}</span>
        </h2>
        <div
          className={`${styles.aboutAika__container} ${styles.container} ${styles.grid}`}
        >
          <div className={styles.aboutAika__item}>
            <div className={styles.aboutAika__img__wrapper}>
              <img
                src="/img/aboutAika/aboutAika1.svg"
                alt="imgaboutAika1"
                className={styles.aboutAika__img}
              />
            </div>
            <div className={styles.aboutAika__content}>
              <h3 className={styles.aboutAika__title}>
                {t("aboutAika__subTitle1")}
              </h3>
              <div className={styles.aboutAika__description}>
                {t("aboutAika__description1")}
              </div>
              <div className="btn__group">
                <Link href="/login" className="button btn__default btn__dark">
                  {t("get-started")}
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.aboutAika__item}>
            <div className={styles.aboutAika__img__wrapper}>
              <img
                src="/img/aboutAika/aboutAika2.svg"
                alt="imgaboutAika1"
                className={styles.aboutAika__img}
              />
            </div>
            <div className={styles.aboutAika__content}>
              <h3 className={styles.aboutAika__title}>
                {t("aboutAika__subTitle2")}
              </h3>
              <div className={styles.aboutAika__description}>
                {t("aboutAika__description2")}
              </div>
              <div className="btn__group">
                <Link href="/login" className="button btn__default btn__dark">
                  {t("get-started")}
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.aboutAika__item}>
            <div className={styles.aboutAika__img__wrapper}>
              <img
                src="/img/aboutAika/aboutAika3.svg"
                alt="imgaboutAika1"
                className={styles.aboutAika__img}
              />
            </div>
            <div className={styles.aboutAika__content}>
              <h3 className={styles.aboutAika__title}>
                {t("aboutAika__subTitle3")}
              </h3>
              <div className={styles.aboutAika__description}>
                {t("aboutAika__description3")}
              </div>
              <div className="btn__group">
                <Link href="/login" className="button btn__default btn__dark">
                  {t("get-started")}
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.aboutAika__item}>
            <div className={styles.aboutAika__img__wrapper}>
              <img
                src="/img/aboutAika/aboutAika4.svg"
                alt="imgaboutAika1"
                className={styles.aboutAika__img}
              />
            </div>
            <div className={styles.aboutAika__content}>
              <h3 className={styles.aboutAika__title}>
                {t("aboutAika__subTitle4")}
              </h3>
              <div className={styles.aboutAika__description}>
                {t("aboutAika__description4")}
              </div>
              <div className="btn__group">
                <Link href="/login" className="button btn__default btn__dark">
                  {t("get-started")}
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.aboutAika__item}>
            <div className={styles.aboutAika__img__wrapper}>
              <img
                src="/img/aboutAika/aboutAika5.svg"
                alt="imgaboutAika1"
                className={styles.aboutAika__img}
              />
            </div>
            <div className={styles.aboutAika__content}>
              <h3 className={styles.aboutAika__title}>
                {t("aboutAika__subTitle5")}
              </h3>
              <div className={styles.aboutAika__description}>
                {t("aboutAika__description5")}
              </div>
              <div className="btn__group">
                <Link href="/login" className="button btn__default btn__dark">
                  {t("get-started")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutAika;
