import React from "react";
import Alert from "react-bootstrap/Alert";
import styles from "./AlertBox.module.css";
import useTranslation from "next-translate/useTranslation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import OvalTick from "../OvalTick/OvalTick";

interface AlertProps {
  label: string;
  type: string;
  setAlertShow: (alertShow: boolean) => void;
}

const AlertBox: React.FC<AlertProps> = ({ label, type, setAlertShow }) => {
  const { t } = useTranslation("common");
  return (
    <div className={styles.alertContainer}>
      <div className="d-flex justify-content-center mb-2">
        <OvalTick size="big" type={type} />
      </div>
      <h6>
        <strong>
          {type === "success" ? t("success__header") : t("warning__header")}
        </strong>
      </h6>
      <p className={styles.alertMessage}>{label}</p>
      <button className="btn btn-success" onClick={() => setAlertShow(false)}>
        {t("button__text")}
      </button>
    </div>
  );
};

export default AlertBox;
