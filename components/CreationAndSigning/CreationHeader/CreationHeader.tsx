import React from "react";
import Link from "next/link";
import Image from "next/image";

import useTranslation from "next-translate/useTranslation";
import styles from "./CreationHeader.module.css";

const CreationHeader: React.FC = () => {
  const { t } = useTranslation("common");

  return (
    <div className={styles.container}>
      <h5>{t("creation-signing")}</h5>
      <p>{t("creation-description")}</p>
      <div className="d-flex justify-content-center">
        <Link href="/document-designer" className={styles.documentLink}>
          <Image
            src="/img/creation-signing/document-designer.png"
            width={80}
            height={80}
            alt="Document Designer"
          />
          <span>{t("document-designer")}</span>
        </Link>
        <Link href="/ready-made-document" className={styles.documentLink}>
          <Image
            src="/img/creation-signing/ready-made.png"
            width={80}
            height={80}
            alt="Ready Made Documents"
          />
          <span>{t("ready-made-document")}</span>
        </Link>
      </div>
    </div>
  );
};

export default CreationHeader;
