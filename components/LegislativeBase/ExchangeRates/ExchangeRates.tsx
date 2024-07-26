import React, { useState, useEffect, CSSProperties } from "react";
import CardWithGreenHeader from "../../AIKAGeneral/CardWithGreenHeader/CardWithGreenHeader";
import { apiExchangeRates } from "../../../services/apiExchangeRates";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import ClockLoader from "react-spinners/ClockLoader";
import useTranslation from "next-translate/useTranslation";
import styles from "./ExchangeRates.module.css";

const override: CSSProperties = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  margin: "0 auto",
  borderColor: "#339F5E;",
};

interface ExchangeRatesProp {
  cardHeader: string;
  token: string;
}

const ExchangeRates: React.FC<ExchangeRatesProp> = ({ cardHeader, token }) => {
  const [exchangeRatesData, setExchangeRatesData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { t } = useTranslation("legislative-base");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await apiExchangeRates(token);
        const newExchangeRateData = [
          {
            name: t("dollar"),
            value: data?.us_dollar,
            increase: data?.us_dollar_increase,
          },
          { name: t("euro"), value: data?.euro, increase: data?.euro_increase },
          {
            name: t("ruble"),
            value: data?.ruble,
            increase: data?.ruble_increase,
          },
          { name: t("yuan"), value: data?.yuan, increase: data?.yuan_increase },
        ];
        console.log(newExchangeRateData);
        setExchangeRatesData(newExchangeRateData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <span className={styles.cardTitle}>{cardHeader}</span>
      </div>
      <div className={styles.cardContent}>
        {!loading ? (
          <>
            {exchangeRatesData.map((content, index) => (
              <div
                key={index}
                className={`d-flex mt-2 ${styles.contentContainer}`}
              >
                <span>{t(content.name)}</span>
                <span className={styles.valueText}>{content.value}</span>
                {content.increase ? (
                  <FontAwesomeIcon icon={faArrowUp} />
                ) : (
                  <FontAwesomeIcon icon={faArrowDown} />
                )}
              </div>
            ))}
          </>
        ) : (
          <div className="my-5 py-5 d-flex justify-content-center align-items-center">
            <ClockLoader color="#36d7b7" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExchangeRates;
