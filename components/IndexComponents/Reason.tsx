import React from "react";

import useTranslation from "next-translate/useTranslation";
import styles from "./IndexComponents.module.css";

const Reason: React.FC = () => {
  const { t } = useTranslation("index");

  return (
    <>
      <section className={styles.reason} id={styles.reason}>
        <h2 className={`${styles.section__title} title__center`}>
          <span>{t("reason__title")}</span>
        </h2>
        <div
          className={`${styles.reason__container} ${styles.container} ${styles.grid}`}
        >
          <div className={styles.reason__item}>
            <div>
              <img
                src="/img/reason/reason1.svg"
                alt="reason1"
                className={styles.reason__img}
              />
              <h5 className={styles.reason__title}>{t("reason__subTitle1")}</h5>
              <p className={styles.reason__description}>
                {t("reason__description1")}
              </p>
            </div>
          </div>
          <div className={styles.reason__item}>
            <div>
              <img
                src="/img/reason/reason2.svg"
                alt="reason2"
                className={styles.reason__img}
              />
              <h5 className={styles.reason__title}>{t("reason__subTitle2")}</h5>
              <p className={styles.reason__description}>
                {t("reason__description2")}
              </p>
            </div>
          </div>
          <div className={styles.reason__item}>
            <div>
              <img
                src="/img/reason/reason3.svg"
                alt="reason3"
                className={styles.reason__img}
              />
              <h5 className={styles.reason__title}>{t("reason__subTitle3")}</h5>
              <p className={styles.reason__description}>
                {t("reason__description3")}
              </p>
            </div>
          </div>
          <div className={styles.reason__item}>
            <div>
              <img
                src="/img/reason/reason4.svg"
                alt="reason4"
                className={styles.reason__img}
              />
              <h5 className={styles.reason__title}>{t("reason__subTitle4")}</h5>
              <p className={styles.reason__description}>
                {t("reason__description4")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Reason;
