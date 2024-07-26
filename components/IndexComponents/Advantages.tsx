import React from "react";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import styles from "./IndexComponents.module.css";

const Advantages: React.FC = () => {
  const { t } = useTranslation("index");

  return (
    <>
      <section className={styles.advantages} id={styles.advantages}>
        <h2 className={`${styles.section__title} title__center`}>
          <span>{t("advantages__title")}</span>
        </h2>
        <div
          className={`${styles.advantages__container} ${styles.container} ${styles.grid}`}
        >
          <Link href="/register">
              <div className={styles.advantages__item}>
                <img
                  src="/img/advantages/advantages1.svg"
                  alt="imgadvantages"
                  className={styles.advantages__img}
                />
                <h5 className={styles.advantages__title}>
                  {t("advantages__title1")}
                </h5>
                <p className={styles.advantages__description}>
                  {t("advantages__description1")}
                </p>
              </div>
          </Link>
          <Link href="/register">
              <div className={styles.advantages__item}>
                <img
                  src="/img/advantages/advantages2.svg"
                  alt="imgadvantages"
                  className={styles.advantages__img}
                />
                <h5 className={styles.advantages__title}>
                  {t("advantages__title2")}
                </h5>
                <p className={styles.advantages__description}>
                  {t("advantages__description2")}
                </p>
              </div>
          </Link>
          <Link href="/register">
              <div className={styles.advantages__item}>
                <img
                  src="/img/advantages/advantages3.svg"
                  alt="imgadvantages"
                  className={styles.advantages__img}
                />
                <h5 className={styles.advantages__title}>
                  {t("advantages__title3")}
                </h5>
                <p className={styles.advantages__description}>
                  {t("advantages__description3")}
                </p>
              </div>
          </Link>
          <Link href="/register">
              <div className={styles.advantages__item}>
                <img
                  src="/img/advantages/advantages4.svg"
                  alt="imgadvantages"
                  className={styles.advantages__img}
                />
                <h5 className={styles.advantages__title}>
                  {t("advantages__title4")}
                </h5>
                <p className={styles.advantages__description}>
                  {t("advantages__description4")}
                </p>
              </div>
          </Link>
          <Link href="/register">
              <div className={styles.advantages__item}>
                <img
                  src="/img/advantages/advantages5.svg"
                  alt="imgadvantages"
                  className={styles.advantages__img}
                />
                <h5 className={styles.advantages__title}>
                  {t("advantages__title5")}
                </h5>
                <p className={styles.advantages__description}>
                  {t("advantages__description5")}
                </p>
              </div>
          </Link>
          <Link href="/register">
              <div className={styles.advantages__item}>
                <img
                  src="/img/advantages/advantages6.svg"
                  alt="imgadvantages"
                  className={styles.advantages__img}
                />
                <h5 className={styles.advantages__title}>
                  {t("advantages__title6")}
                </h5>
                <p className={styles.advantages__description}>
                  {t("advantages__description6")}
                </p>
              </div>
          </Link>
          <Link href="/register">
              <div className={styles.advantages__item}>
                <img
                  src="/img/advantages/advantages7.svg"
                  alt="imgadvantages"
                  className={styles.advantages__img}
                />
                <h5 className={styles.advantages__title}>
                  {t("advantages__title7")}
                </h5>
                <p className={styles.advantages__description}>
                  {t("advantages__description7")}
                </p>
              </div>
          </Link>
          <Link href="/register">
              <div className={styles.advantages__item}>
                <img
                  src="/img/advantages/advantages8.svg"
                  alt="imgadvantages"
                  className={styles.advantages__img}
                />
                <h5 className={styles.advantages__title}>
                  {t("advantages__title8")}
                </h5>
                <p className={styles.advantages__description}>
                  {t("advantages__description8")}
                </p>
              </div>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Advantages;
