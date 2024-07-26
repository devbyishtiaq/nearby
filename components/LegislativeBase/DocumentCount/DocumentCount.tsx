import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./DocumentCount.module.css";
import { getLegislativeDocumentCount } from "../../../services/getLegislativeDocumentCount";

import useTranslation from "next-translate/useTranslation";

interface DocumentCountProps {
  token: string;
}

const DocumentCount: React.FC<DocumentCountProps> = ({ token }) => {
  const { t } = useTranslation("legislative-base");

  const [countData, setCountData] = useState<{
    law_article_count: any;
    kaz_article_count: any;
    eng_article_count: any;
    rus_article_count: any;
    status: string;
  }>({
    law_article_count: 0,
    kaz_article_count: 0,
    eng_article_count: 0,
    rus_article_count: 0,
    status: "ok",
  });
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getLegislativeDocumentCount(token);
        setCountData(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <Image
        src="/img/general/exclamation-icon.png"
        width={20}
        height={20}
        alt="Exclamation"
      />
      <div className="d-flex mt-2">
        <span>{t("total-documents")}</span>
        <span className={styles.countNumber}>
          {countData?.law_article_count || 0}
        </span>
      </div>
      <div className="d-flex mt-2">
        <span>{t("in-kazakh")}</span>
        <span className={styles.countNumber}>
          {countData?.kaz_article_count || 0}
        </span>
      </div>
      <div className="d-flex mt-2">
        <span>{t("in-russian")}</span>
        <span className={styles.countNumber}>
          {countData?.rus_article_count || 0}
        </span>
      </div>
      <div className="d-flex mt-2">
        <span>{t("in-english")}</span>
        <span className={styles.countNumber}>
          {countData?.eng_article_count || 0}
        </span>
      </div>
    </div>
  );
};

export default DocumentCount;
