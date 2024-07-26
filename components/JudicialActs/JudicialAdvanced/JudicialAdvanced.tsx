import React from "react";
import { useState } from "react";
import styles from "./JudicialAdvanced.module.css";
import Dropdown from "../../General/Dropdown/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import useTranslation from "next-translate/useTranslation";
import { capitalizeFirstLetter } from '../../../utils/utils';

interface JudicialAdvancedProps {
  cityList: any;
  activeCity: any;
  setActiveCity: (city: any) => void;
  courtList: any;
  activeCourt: any;
  setActiveCourt: (activeCourt: any) => void;
  caseCategoryList: any;
  setCaseCategoryList: (caseCategoryList: any) => void;
  activeCaseCategory: any;
  setActiveCaseCategory: (activeCaseCategory: any) => void;
  activeTypeOfProceedings: any;
  setActiveTypeOfProceedings: (activeTypeOfProceedings: any) => void;
  activeInstance: any;
  setActiveInstance: (activeInstance: any) => void;
  resultList: any;
  activeResult: any;
  setActiveResult: (activeResult: any) => void;
  caseNumber: any;
  setCaseNumber: (caseNumber: any) => void;
  plaintiff: any;
  setPlaintiff: (plaintiff: any) => void;
  defendant: any;
  setDefendant: (defendant: any) => void;
  lawyer: any;
  setLawyer: (lawyer: any) => void;
  caseDate: any;
  setCaseDate: (caseDate: any) => void;
  makeSearch: () => void;
}

const JudicialAdvanced: React.FC<JudicialAdvancedProps> = ({
  cityList,
  activeCity,
  setActiveCity,
  courtList,
  activeCourt,
  setActiveCourt,
  caseCategoryList,
  setCaseCategoryList,
  activeCaseCategory,
  setActiveCaseCategory,
  activeTypeOfProceedings,
  setActiveTypeOfProceedings,
  activeInstance,
  setActiveInstance,
  resultList,
  activeResult,
  setActiveResult,
  caseNumber,
  setCaseNumber,
  plaintiff,
  setPlaintiff,
  defendant,
  setDefendant,
  lawyer,
  setLawyer,
  caseDate,
  setCaseDate,
  makeSearch,
}) => {
  const [activeCityName, setActiveCityName] = useState<any>();
  const [activeCourtName, setActiveCourtName] = useState<any>();
  const [activeCaseCategoryName, setActiveCaseCategoryName] = useState<any>();
  const [activeTypeOfProceedingsName, setActiveTypeOfProceedingsName] =
    useState<any>();
  const [activeInstanceName, setActiveInstanceName] = useState<any>();
  const [activeResultName, setActiveResultName] = useState<any>();
  const { t } = useTranslation("judicial-acts");

  return (
    <div className={`mt-3 ${styles.container}`}>
      <div className="row d-flex justify-content-center">
        <div className="col-md-4">
          <label>{t("case-number")}</label>
          <input
            className={styles.input}
            value={caseNumber}
            onChange={(e) => setCaseNumber(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label>{t("case-defendant")}</label>
          <input
            className={styles.input}
            value={defendant}
            onChange={(e) => setDefendant(e.target.value)}
          />
        </div>
      </div>

      <div className="row d-flex justify-content-center mt-3">
        <div className="col-md-4">
          <label>{t("case-date")}</label>
          <input
            type="date"
            className={styles.input}
            value={caseDate}
            placeholder="дд.мм.гггг"
            onChange={(e) => setCaseDate(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label>{t("case-plaintiff")}</label>
          <input
            className={styles.input}
            value={plaintiff}
            onChange={(e) => setPlaintiff(e.target.value)}
          />
        </div>
      </div>

      <div className="row d-flex justify-content-center mt-3">
        <div className="col-md-8">
          <div className="dropdown">
            <button
              className={`${styles.dropdownButton}`}
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {activeCaseCategoryName
                ? activeCaseCategoryName
                : t("case-category")}
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
            <ul className={`dropdown-menu ${styles.dropdownMenu}`}>
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => {
                    setActiveCaseCategory(null);
                    setActiveCaseCategoryName(null);
                  }}
                >
                  {t("case-category")}
                </a>
              </li>
              {caseCategoryList?.map((caseCategory: any, index: any) => (
                <li key={index}>
                  <a
                    className="dropdown-item"
                    onClick={() => {
                      setActiveCaseCategory(caseCategory.category_index);
                      setActiveCaseCategoryName(caseCategory.category_name);
                    }}
                  >
                    {capitalizeFirstLetter(caseCategory.category_name)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="row d-flex justify-content-center mt-3">
        <div className="col-md-8">
          <div className="dropdown">
            <button
              className={`${styles.dropdownButton}`}
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {activeCityName ? activeCityName : t("case-area")}
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
            <ul className="dropdown-menu">
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => {
                    setActiveCity(null);
                    setActiveCityName(null);
                  }}
                >
                  {t("case-area")}
                </a>
              </li>
              {cityList?.map((city: any, index: any) => (
                <li key={index}>
                  <a
                    className="dropdown-item"
                    onClick={() => {
                      setActiveCity(city.city_code);
                      setActiveCityName(city.name);
                    }}
                  >
                    {t(`city_${city.city_code}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="row d-flex justify-content-center mt-3">
        <div className="col-md-8">
          <div className="dropdown">
            <button
              className={`${styles.dropdownButton}`}
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              disabled={!activeCity}
            >
              {activeCourtName ? activeCourtName : t("case-court")}
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
            <ul className="dropdown-menu">
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => {
                    setActiveCourt(null);
                    setActiveCourtName(null);
                  }}
                >
                  {t("case-court")}
                </a>
              </li>
              {courtList?.map((court: any, index: any) => (
                <li key={index}>
                  <a
                    className="dropdown-item"
                    onClick={() => {
                      setActiveCourt(court.court_code);
                      setActiveCourtName(court.court_name);
                    }}
                  >
                    {court.court_name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="row d-flex justify-content-center mt-3">
        <div className="col-md-8">
          <div className="dropdown">
            <button
              className={`${styles.dropdownButton}`}
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {activeTypeOfProceedings
                ? t(activeTypeOfProceedingsName)
                : t("case-type-of-proceedings")}
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
            <ul className="dropdown-menu">
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => {
                    setActiveTypeOfProceedings(null);
                    setActiveTypeOfProceedingsName(null);
                  }}
                >
                  {t("case-type-of-proceedings")}
                </a>
                <a
                  className="dropdown-item"
                  onClick={() => {
                    setActiveTypeOfProceedings("civilCasesText");
                    setActiveTypeOfProceedingsName("civil-cases");
                  }}
                >
                  {t("civil-cases")}
                </a>
                <a
                  className="dropdown-item"
                  onClick={() => {
                    setActiveTypeOfProceedings("criminalCasesText");
                    setActiveTypeOfProceedingsName("criminal-cases");
                  }}
                >
                  {t("criminal-cases")}
                </a>
                <a
                  className="dropdown-item"
                  onClick={() => {
                    setActiveTypeOfProceedings("administrativeCases");
                    setActiveTypeOfProceedingsName("administrative-cases");
                  }}
                >
                  {t("administrative-cases")}
                </a>
                <a
                  className="dropdown-item"
                  onClick={() => {
                    setActiveTypeOfProceedings("administrativeProceedings");
                    setActiveTypeOfProceedingsName("administrative-proceedings");
                  }}
                >
                  {t("administrative-proceedings")}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row d-flex justify-content-center mt-3">
        <div className="col-md-8">
          <div className="dropdown">
            <button
              className={`${styles.dropdownButton}`}
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {activeInstance
                ? t(activeInstanceName)
                : t("case-instance")}
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
            <ul className="dropdown-menu">
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => {
                    setActiveInstance(null);
                    setActiveInstanceName(null);
                  }}
                >
                  {t("case-instance")}
                </a>
                <a
                  className="dropdown-item"
                  onClick={() => {
                    setActiveInstance("1");
                    setActiveInstanceName("first-instance");
                  }}
                >
                  {t("first-instance")}
                </a>
                <a
                  className="dropdown-item"
                  onClick={() => {
                    setActiveInstance("2");
                    setActiveInstanceName("appellate-instance");
                  }}
                >
                  {t("appellate-instance")}
                </a>
                <a
                  className="dropdown-item"
                  onClick={() => {
                    setActiveInstance("administrativeCases");
                    setActiveInstanceName("cassation-instance");
                  }}
                >
                  {t("cassation-instance")}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row d-flex justify-content-center mt-3">
        <div className="col-md-8">
          <div className="dropdown">
            <button
              className={`${styles.dropdownButton}`}
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {activeResultName ? t(activeResultName) : t("case-result")}
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
            <ul className="dropdown-menu">
                <li>
                    <a
                        className="dropdown-item"
                        onClick={() => {
                            setActiveResult(null);
                            setActiveResultName(null);
                        }}
                    >
                        {t("case-result")}
                    </a>
                </li>
                {resultList?.map((result:any, index:any) => (
                    <li key={index}>
                        <a
                            className="dropdown-item"
                            onClick={() => {
                                setActiveResult(result.id);
                                setActiveResultName(result.id.toString());
                            }}
                        >
                            {t(`${result.id.toString()}`)}
                        </a>
                    </li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-12 d-flex justify-content-center">
          <button
            className={`btn btn-success ${styles.buttonStyle}`}
            onClick={() => makeSearch()}
          >
            {t("search")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JudicialAdvanced;
