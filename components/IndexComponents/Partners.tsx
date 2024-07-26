import React from "react";

import useTranslation from "next-translate/useTranslation";
import styles from "./IndexComponents.module.css";

const Partners: React.FC = () => {
  const { t } = useTranslation("index");

  return (
    <>
      <section className={styles.partners} id={styles.partners}>
        <div
          className={`${styles.partners__container} ${styles.container} ${styles.grid}`}
        >
          <div className={styles.partners__content}>
            <h1 className={styles.section__title}>{t("partners__title")}</h1>
            <div className={styles.section__description}>
              {t("partners__description")}
            </div>
          </div>
          <div className={styles.partners__image__box}>
            <div className={styles.partners__img__wrapper}>
              <img
                src="/img/partners/Adata.png"
                alt="imgpartners"
                className={styles.partners__img}
              />
              <img
                src="/img/partners/amazon-logo.png"
                alt="imgpartners"
                className={styles.partners__img}
              />
              <img
                src="/img/partners/egov.png"
                alt="imgpartners"
                className={styles.partners__img}
              />
              <img
                src="/img/partners/Ministry of Defense.png"
                alt="imgpartners"
                className={styles.partners__img}
              />
            </div>
            <div className={styles.partners__img__wrapper}>
              <img
                src="/img/partners/Ministry of internal affairs.png"
                alt="imgpartners"
                className={styles.partners__img}
              />
              <img
                src="/img/partners/partners3.svg"
                alt="imgpartners"
                className={styles.partners__img}
              />
              <img
                src="/img/partners/partners4.svg"
                alt="imgpartners"
                className={styles.partners__img}
              />
              <img
                src="/img/partners/partners5.svg"
                alt="imgpartners"
                className={styles.partners__img}
              />
            </div>
            <div className={styles.partners__img__wrapper}>
              <img
                src="/img/partners/partners4.svg"
                alt="imgpartners"
                className={styles.partners__img}
              />
              <img
                src="/img/partners/partners5.svg"
                alt="imgpartners"
                className={styles.partners__img}
              />
              <img
                src="/img/partners/partners6.svg"
                alt="imgpartners"
                className={styles.partners__img}
              />
              <img
                src="/img/partners/partners7.svg"
                alt="imgpartners"
                className={styles.partners__img}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Partners;
