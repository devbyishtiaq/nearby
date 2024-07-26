import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import useTranslation from "next-translate/useTranslation";
import styles from "./PaymentDetails.module.css";

const PaymentDetails: React.FC = () => {
  const { t } = useTranslation("my-profile");

  return (
    <div className="row mt-5">
      <div className="col-md-4">
        <p>
          <b>{t("payment-methods")}</b>
        </p>
        <p className={styles.headerDesc}>{t("payment-method-details")}</p>
      </div>
      <div className={`col-md-6 p-3 ${styles.border}`}>
        <div className="mt-3">
          <label className="mb-2 text-muted">{t("payment-method")}</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder={t("credit-card")}
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>

        <div className="mt-3">
          <label className="mb-2 text-muted">{t("card-number")}</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder={t("card-number")}
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>

        <div className="mt-3">
          <label className="mb-2 text-muted">{t("expire-date")}</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control border-end-0"
              placeholder="29-05-2024"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
            <span className="input-group-text bg-white" id="basic-addon1">
              <FontAwesomeIcon icon={faCalendar} />
            </span>
          </div>
        </div>

        <div className="mt-3">
          <label className="mb-2 text-muted">{t("CVC-CW")}</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder={t("card-number")}
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>

        <div className="mt-3">
          <label className="mb-2 text-muted">{t("email")}</label>
          <div className="input-group">
            <span className="input-group-text bg-white" id="basic-addon1">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="olivia@untitled.ui"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>

        <div className="mt-3">
          <label className="mb-2 text-muted">{t("telephone")}</label>
          <div className="input-group">
            <span className="input-group-text bg-white" id="basic-addon1">
              <FontAwesomeIcon icon={faPhoneVolume} />
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="+1 000000000"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>

        <button className="btn btn-success mt-3">
          <FontAwesomeIcon icon={faPlus} className="ms-2" />
          {` ${t("add-payment-method")}`}
        </button>
      </div>
    </div>
  );
};

export default PaymentDetails;
