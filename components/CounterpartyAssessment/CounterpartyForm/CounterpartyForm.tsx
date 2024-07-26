import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import styles from "./CounterpartyForm.module.css";

interface CounterpartyFormProps {
  iibnNumber: string;
  setIibnNumber: (value: string) => void;
  makeCounterpartySearch: (user_type: string, demand_url: string) => void;
  activeButton: string;
  setActiveButton: (value: string) => void;
  searchingStatus: boolean;
  setSearchingStatus: (value: boolean) => void;
  setResultData: (resultData: any) => void;
}

const CounterpartyForm: React.FC<CounterpartyFormProps> = ({
  iibnNumber,
  setIibnNumber,
  makeCounterpartySearch,
  activeButton,
  setActiveButton,
  searchingStatus,
  setSearchingStatus,
  setResultData,
}) => {

  const router = useRouter();
  const { t } = useTranslation("counterparty-assessment");
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      setSearchingStatus(true);
    }
  };

  return (
    <>
      <div className="row d-flex justify-content-center">
        <div className="col-md-8 d-flex gap-5 justify-content-start">
          <button
            className={`${activeButton === "company" ? styles.activeButton : ""} p-2 rounded`}
            onClick={() => {
              setActiveButton("company");
              setSearchingStatus(false);
            }}
          >
            {t("company")}
          </button>
          <button
            className={`${activeButton === "individual-ent" ? styles.activeButton : ""} p-2 rounded`}
            onClick={() => {
              setActiveButton("individual-ent");
              setSearchingStatus(false);
            }}
          >
            {t("individual-entrepreneurs")}
          </button>
          <button
            className={`${activeButton === "individual" ? styles.activeButton : ""} p-2 rounded`}
            onClick={() => {
              setActiveButton("individual");
              setSearchingStatus(false);
            }}
          >
            {t("individual")}
          </button>
        </div>
      </div>
      <div className="row d-flex justify-content-center mt-3">
        <div className="col-md-8 d-flex gap-3">
          <div className="form-control">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="px-2"
              style={{ color: "#768F97" }}
            />
            <input
              type="text"
              placeholder={`${t("search")} ...`}
              aria-label="search"
              value={iibnNumber}
              className={styles.form__input}
              onChange={(e) => setIibnNumber(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          {searchingStatus ? (
            <button
              className={`button btn__default`}
              onClick={() => {
                setSearchingStatus(false);
                setResultData([]);
                setIibnNumber("");
                router.reload();
              }}
            >
              {t("clear")}
            </button>
          ) : (
            <button
              className={`button btn__default px-4 py-2`}
              onClick={() => {
                setSearchingStatus(true);
              }}
            >
              {t("search")}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CounterpartyForm;
