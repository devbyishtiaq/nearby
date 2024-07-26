import React from "react";
import Link from "next/link";

import useTranslation from "next-translate/useTranslation";
import styles from "./IndexComponents.module.css";

const Tariff: React.FC = () => {
  const { t } = useTranslation("index");

  return (
    <>
      <section className={styles.tariff} id="buy-plan">
        <div
          className={`${styles.tariff__container} ${styles.container} ${styles.grid}`}
          >
          <div className={styles.tariff__content}>
            <h1 className={styles.tariff__title}>
              <span>{t("tariff__title")}</span>
            </h1>
            <img
              src="/img/tariff/tariff-arrow.svg"
              alt="tariffArrow"
              className={styles.tariff__arrow}
            />
          </div>
          <div className={styles.tariff__info}>
            <div className={styles.tariff__plan}>
              <h3 className={styles.tariff__plan__title}>
                {t("tariff__plan__title1")}
                <span>{t("tariff__plan__title2")}</span>
              </h3>
              <ul className={styles.tariff__list}>
                <li className={styles.tariff__item}>
                  <span>{t("tariff__item1")}</span>
                </li>
                <li className={styles.tariff__item}>
                  <span>{t("tariff__item2")}</span>
                </li>
                <li className={styles.tariff__item}>
                  <span>{t("tariff__item3")}</span>
                </li>
                <li className={styles.tariff__item}>
                  <span>{t("tariff__item4")}</span>
                </li>
                <li className={styles.tariff__item}>
                  <span>{t("tariff__item5")}</span>
                </li>
                <li className={styles.tariff__item}>
                  <span>{t("tariff__item6")}</span>
                </li>
                <li className={styles.tariff__item}>
                  <span>{t("tariff__item8")}</span>
                </li>
                <li className={styles.tariff__item}>
                  <span>{t("tariff__item9")}</span>
                </li>
                <li className={styles.tariff__item}>
                  <span>{t("tariff__item10")}</span>
                </li>
              </ul>
              <div className="btn__group">
                <Link href="/register" className="button btn__default btn__full">
                  {t("tariff__buy")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Tariff;
