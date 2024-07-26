import React, { useState, CSSProperties } from "react";
import AlertBox from "../../General/AlertBox/AlertBox";
import GridLoader from "react-spinners/GridLoader";
import useTranslation from "next-translate/useTranslation";
import styles from "./Benefits.module.css";

interface BenefitsProps {
  username: string;
  setUsername: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  handleContactSubmit: () => void;
  loading: boolean;
  alertText: string;
  alertShow: boolean;
  alertType: string;
  setAlertShow: (alertShow: boolean) => void;
}

const override: CSSProperties = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  margin: "0 auto",
  borderColor: "#339F5E;",
};

const Benefits: React.FC<BenefitsProps> = ({
  username,
  setUsername,
  email,
  setEmail,
  phone,
  setPhone,
  handleContactSubmit,
  loading,
  alertText,
  alertShow,
  alertType,
  setAlertShow,
}) => {
  const { t } = useTranslation("legal-lab");

  return (
    <section className={styles.parentDiv} id="legal-lab-benefits">
      <GridLoader
        color="#339F5E"
        loading={loading}
        cssOverride={override}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <div className={styles.benefits__container}>
        <h3 className={styles.benefits__title}>
          <span>{t("benefits__title")}</span>
        </h3>
        <ul className={styles.benefits__table}>
          <li>{t("benefits__list1")}</li>
          <li>{t("benefits__list2")}</li>
          <li>{t("benefits__list3")}</li>
          <li>{t("benefits__list4")}</li>
          <li>{t("benefits__list5")}</li>
        </ul>
      </div>
      <form className={styles.benefits__container}>
        <h5>{t("form__title")}</h5>
        <input
          type="text"
          placeholder={t("fullname")}
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder={t("number")}
          className="form-control"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="email"
          placeholder={t("email")}
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="btn__group">
          <a
            className="button btn__default"
            onClick={() => handleContactSubmit()}
          >
            {t("submit")}
          </a>
        </div>
      </form>
      {alertShow && (
        <AlertBox
          label={alertText}
          type={alertType}
          setAlertShow={setAlertShow}
        />
      )}
    </section>
  );
};

export default Benefits;
