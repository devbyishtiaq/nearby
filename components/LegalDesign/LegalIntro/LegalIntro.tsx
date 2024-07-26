import React from "react";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import styles from "./LegalIntro.module.css";

const LegalIntro: React.FC = () => {
  const { t } = useTranslation("legal-design");

  return (
    <div className={styles.parentDiv}>
      <div className={styles.legal__intro__container}>
        <div className={styles.legal__intro__content}>
          <h1>
            <span>{t("legal__design__title1")}</span>
            {t("legal__design__title2")}
          </h1>
          <p>{t("legal__description")}</p>
          <ul>
            <li>{t("legal__description1")}</li>
            <li>{t("legal__description2")}</li>
            <li>{t("legal__description3")}</li>
          </ul>
          <Link href="/legal-design#legal-design-contact" className="button btn__default btn__dark">
            {t("leave__request")}
          </Link>
        </div>
        <img
          src="/img/legal-design/justice.png"
          alt="justice"
          className={styles.legal__intro__content}
        />
      </div>
      <div className={styles.btn__container}>
        <button className="button btn__default">{t("legal__button1")}</button>
        <button className="button btn__default">{t("legal__button2")}</button>
      </div>
    </div>
  );
};

export default LegalIntro;
