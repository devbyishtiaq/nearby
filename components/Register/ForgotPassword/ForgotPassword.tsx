import React, { useState } from "react";
import { useRouter } from "next/router";
import InputTextOnBorder from "../../General/InputTextOnBorder/InputTextOnBorder";
import AlertBox from "../../General/AlertBox/AlertBox";
import Loading from "../Loading/Loading";

import useTranslation from "next-translate/useTranslation";
import styles from "./ForgotPassword.module.css";

const ForgotPassword: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [alertText, setAlertText] = useState<string>("");
  const [alertShow, setAlertShow] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<string>("success");
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation("auth");

  const handleSubmit = async () => {
    const { locale } = router;
    try {
      setLoading(true);
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, locale }),
      });
      const data = await response.json();
      if (response.status === 200) {
        setAlertText(data["status"]);
        setAlertType("success");
        setAlertShow(true);
      } else {
        setAlertText(data["message"]);
        setAlertType("danger");
        setAlertShow(true);
      }
    } catch (error) {
      console.error("Error during forgot password request:", error);
      setAlertText("Request failed. Please check your credentials.");
      setAlertType("danger");
      setAlertShow(true);
    }
    setLoading(false);
  };

  return (
    <div className={`${styles.parentDiv} ${styles.forgot__container}`}>
      <Loading loading={loading} />
      <div className={styles.login__title}>
        <p>{t("forgot__title")}</p>
        <p>{t("forgot__subtitle")}</p>
      </div>
      <div>
        <InputTextOnBorder
          label={t("label__email")}
          placeholder={t("placeholder__email")}
          inputType="text"
          required
          valueState={email}
          setValueState={setEmail}
        />
        <div className={styles.login__check}>
          <button
            className={`button btn__default`}
            onClick={() => handleSubmit()}
          >
            {t("reset__password")}
          </button>
        </div>
      </div>
      {alertShow && (
        <AlertBox
          label={alertText}
          type={alertType}
          setAlertShow={setAlertShow}
        />
      )}
    </div>
  );
};

export default ForgotPassword;
