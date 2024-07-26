import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import BackButton from "../../General/BackButton/BackButton";

import useTranslation from "next-translate/useTranslation";
import styles from "./JudicialHeader.module.css";

interface JudicialHeaderProps {
  makeSearch: () => void;
  queryText: string;
  setQueryText: (queryText: string) => void;
}

const JudicialHeader: React.FC<JudicialHeaderProps> = ({
  makeSearch,
  queryText,
  setQueryText,
}) => {
  const { t } = useTranslation("common");

  const router = useRouter();

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      makeSearch();
    }
  };

  return (
    <div className={styles.container}>
      <BackButton />
      <button onClick={() => router.reload()}>
        <Image
          src="/img/judicial-acts/judicial-acts.png"
          width={50}
          height={50}
          alt="Judicial Acts"
        />
      </button>
      <span className={styles.headerText}>{[t("judicial-acts")]}</span>
      <div className={`input-group ${styles.inputGroup}`}>
        <span
          className={`input-group-text ${styles.inputIcon}`}
          id="basic-addon1"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </span>
        <input
          type="text"
          className={`form-control ${styles.input}`}
          placeholder={t("search")}
          value={queryText}
          onChange={(e) => setQueryText(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>
      <button
        className={`btn btn-success ${styles.searchButton} ${styles.buttonStyle}`}
        onClick={() => {
          makeSearch();
        }}
      >
        {t("search")}
      </button>
    </div>
  );
};

export default JudicialHeader;
