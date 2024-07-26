import React from "react";

import useTranslation from "next-translate/useTranslation";
import styles from "./WhatIsLegalLab.module.css";

const WhatIsLegalLab: React.FC = () => {
  const { t } = useTranslation("legal-lab");

  return (
    <div className={styles.parentDiv}>
      <div className={styles.legal__content}>
        <h1 dangerouslySetInnerHTML={{ __html: t("whatis__title") }}></h1>
        <p>{t("whatis__description")}</p>
      </div>
      <div className={styles.container__img}>
        <img src="/img/legal-lab/lawyer-photo.jpg" alt="lawyerPhoto" />
        <img src="/img/legal-lab/judge-photo.jpg" alt="judgePhoto" />
      </div>
    </div>
  );
};

export default WhatIsLegalLab;
