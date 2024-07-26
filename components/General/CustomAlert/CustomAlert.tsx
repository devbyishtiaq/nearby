import React from "react";
import styles from "./CustomAlert.module.css";
import CustomOval from "../CustomOval/CustomOval";
import useTranslation from "next-translate/useTranslation";

interface AlertProps {
  text: string;
  type: string;
  title: string;
  setAlertShow: (alertShow: boolean) => void;
}

const CustomAlert: React.FC<AlertProps> = ({
  text,
  type,
  title,
  setAlertShow,
}) => {
  const { t } = useTranslation("common");
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className="d-flex justify-content-center mb-2">
          <CustomOval size="big" type={type} />
        </div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.text}>{text}</p>
        <button className={styles.btn} onClick={() => setAlertShow(false)}>
          {t("button__text")}
        </button>
      </div>
    </div>
  );
};

export default CustomAlert;
