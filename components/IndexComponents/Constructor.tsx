import React from "react";
import Accordion from "../General/Accordion";

import useTranslation from "next-translate/useTranslation";
import styles from "./IndexComponents.module.css";

const Constructor: React.FC = () => {
  const { t } = useTranslation("index");
  const items = [
    {
      uuid: 1,
      heading: `${t("acc__constructor1h")}`,
      content: `${t("acc__constructor1c")}`,
    },
    {
      uuid: 2,
      heading: `${t("acc__constructor2h")}`,
      content: `${t("acc__constructor2c")}`,
    },
    {
      uuid: 3,
      heading: `${t("acc__constructor3h")}`,
      content: `${t("acc__constructor3c")}`,
    },
  ];
  return (
    <>
      <section
        className={styles.constructor__section}
        id={styles.constructor__section}
      >
        <div
          className={`${styles.constructor__container} ${styles.container} ${styles.grid}`}
        >
          <div className={`${styles.constructor__content} acc__const`}>
            <h2 className={styles.section__title}>{t("constructor__title")}</h2>
            <div className={styles.constructor__description}>
              {t("constructor__description")}
            </div>
            <h3>{t("constructor__subTitle")}</h3>
            <Accordion sections={items} />
          </div>
          <div className={styles.constructor__img}>
            <img
              src="/img/constructor/constructor-img.svg"
              alt="constructorImage"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Constructor;
