import React from "react";
import Link from "next/link";

import useTranslation from "next-translate/useTranslation";
import styles from "./IndexComponents.module.css";

const Intro: React.FC = () => {
  const { t } = useTranslation("index");

  return (
    <>
      <section className={styles.intro} id="intro">
        <div
          className={`${styles.intro__container} ${styles.container} ${styles.grid}`}
        >
          <div className={styles.intro__content}>
            <div className={styles.intro__content__wrapper}>

              <h1 className={styles.intro__title}>
                <div
                  dangerouslySetInnerHTML={{ __html: t("intro__title") }}
                ></div>
              </h1>
              <img
                src="/img/intro/intro-line.svg"
                alt="imgTitle"
                className={styles.intro__line}
              />
            </div>
            <div className={styles.btn__group}>
              <Link
                href="/login"
                className={`button btn__default btn__dark btn__intro`}
              >
                {t("get-started")}
              </Link>
            </div>
          </div>
          <div className={styles.intro__img__wrapper}>
            <img
              src="/img/intro/intro-arrow.svg"
              alt="imgArrow"
              className={styles.intro__top}
            />
            <img
              src="/img/intro/intro.png"
              alt="imgIntro"
              className={styles.intro__img}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Intro;
