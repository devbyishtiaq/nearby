import React from "react";
import Link from "next/link";

import useTranslation from "next-translate/useTranslation";
import styles from "./IndexComponents.module.css";

const About: React.FC = () => {
  const { t } = useTranslation("index");

  return (
    <>
      <section className={styles.about} id={styles.about}>
        <h2 className={`${styles.section__title} title__center`}>
          <span>{t("about__title")}</span>
        </h2>
        <div
          className={`${styles.about__container} ${styles.container} ${styles.grid}`}
        >
          <div className={styles.about__item}>
            <div className={styles.about__img__wrapper}>
              <img
                src="/img/about/about1.png"
                alt="imgAbout1"
                className={styles.about__img}
              />
            </div>
            <div className={styles.about__content}>
              <h3 className={styles.about__title}>{t("about__subTitle1")}</h3>
              <div className={styles.about__description}>
                {t("about__description1")}
              </div>
              <div className="btn__group">
                <Link href="/login" className="button btn__default">
                  {t("get-started")}
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.about__item}>
            <div className={styles.about__img__wrapper}>
              <img
                src="/img/about/about2.png"
                alt="imgAbout2"
                className={styles.about__img}
              />
            </div>
            <div className={styles.about__content}>
              <h3 className={styles.about__title}>{t("about__subTitle2")}</h3>
              <div className={styles.about__description}>
                {t("about__description2")}
              </div>
              <div className="btn__group">
                <Link href="/login" className="button btn__default">
                  {t("get-started")}
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.about__item}>
            <div className={styles.about__img__wrapper}>
              <img
                src="/img/about/about3.png"
                alt="imgAbout3"
                className={styles.about__img}
              />
            </div>
            <div className={styles.about__content}>
              <h3 className={styles.about__title}>{t("about__subTitle3")}</h3>
              <div className={styles.about__description}>
                {t("about__description3")}
              </div>
              <div className="btn__group">
                <Link href="/login" className="button btn__default">
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

export default About;
