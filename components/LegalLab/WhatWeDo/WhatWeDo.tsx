import React from "react";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import styles from "./WhatWeDo.module.css";

const WhatWeDo: React.FC = () => {
  const { t } = useTranslation("legal-lab");

  return (
    <section className={styles.parentDiv}>
      <h1 className={`section__title title__center`}>
        <span>{t("whatwedo__title")}</span>
      </h1>
      <div className={styles.whatwedo__description}>
        {t("whatwedo__description")}
      </div>
      <div className={`${styles.whatWeDo__container} container grid`}>
        <div className={styles.whatWeDo__item}>
          <div>
            <img
              src="/img/legal-lab/whatWeDo1.svg"
              alt="whatWeDo1"
              className={styles.whatWeDo__img}
            />
            <h4 className={styles.whatWeDo__title}>
              {t("whatwedo__subtitle1")}
            </h4>
            <p className={styles.whatWeDo__content}>
              {t("whatwedo__content1")}
            </p>
          </div>
        </div>
        <div className={styles.whatWeDo__item}>
          <div>
            <img
              src="/img/legal-lab/whatWeDo2.svg"
              alt="whatWeDo2"
              className={styles.whatWeDo__img}
            />
            <h4 className={styles.whatWeDo__title}>
              {t("whatwedo__subtitle2")}
            </h4>
            <p className={styles.whatWeDo__content}>
              {t("whatwedo__content2")}
            </p>
          </div>
        </div>
      </div>
      <div className="btn__group">
        <Link
          href="/legal-lab#legal-lab-benefits"
          className="button btn__default"
        >
          {t("whatwedo__button")}
        </Link>
      </div>
    </section>
  );
};

export default WhatWeDo;
