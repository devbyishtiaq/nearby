import React from "react";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import styles from "./Internship.module.css";

const Internship: React.FC = () => {
  const { t } = useTranslation("legal-lab");

  return (
    <div className={styles.parentDiv}>
      <div className={styles.intership__box}>
        <div className={styles.intership__content}>
          <h2 className={`section__title title__center`}>
            <span>{t("internship__title")}</span>
          </h2>
          <p className={styles.intership__description}>
            {t("intership__description")}
          </p>
          <div className="btn__group">
            <Link href="/legal-lab#legal-lab-benefits" className="button btn__default">
              {t("whatwedo__button")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Internship;
