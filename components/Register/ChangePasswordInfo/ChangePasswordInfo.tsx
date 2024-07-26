import React, { useState } from "react";
import InputTextOnBorder from "../../General/InputTextOnBorder/InputTextOnBorder";
import PasswordMustHave from "../PasswordMustHave/PasswordMustHave";
import UpdateConsent from "../UpdateConsent/UpdateConsent";
import TermsOfService from "../TermsOfService/TermsOfService";
import Button from "../../General/Button/Button";
import AlreadyHaveAccount from "../AlreadyHaveAccount/AlreadyHaveAccount";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import useTranslation from "next-translate/useTranslation";
import styles from "./ChangePasswordInfo.module.css";

interface ChangePasswordInfoProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  handleChangePassword: () => void;
}

const ChangePasswordInfo: React.FC<ChangePasswordInfoProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  handleChangePassword,
}) => {
  const { t } = useTranslation("auth");

  const passwordInfos = [
    { info: `${t("between__char__count")}` },
    { info: `${t("at__least__two")}` },
    { info: `${t("an__uppercase__char")}` },
    { info: `${t("an__lowercase__char")}` },
    { info: `${t("a__number")}` },
    { info: `${t("a__special__char")}` },
  ];

  return (
    <div className={styles.parentDiv}>
      <div className={styles.register__title}>
        <p>{t("change_password_header")}</p>
        <p></p>
      </div>
      <InputTextOnBorder
        label={t("label__email")}
        placeholder={t("placeholder__email")}
        inputType="email"
        required
        valueState={email}
        setValueState={setEmail}
      />
      <InputTextOnBorder
        label={t("label__password")}
        placeholder={t("placeholder__password")}
        inputType="password"
        required
        valueState={password}
        setValueState={setPassword}
      />
      <InputTextOnBorder
        label={t("label__confirm__password")}
        placeholder={t("placeholder__confirm__password")}
        inputType="password"
        required
        valueState={confirmPassword}
        setValueState={setConfirmPassword}
      />
      <div className={styles.login__check}>
          <button
            className={`button btn__default`}
            type="button"
            onClick={() => handleChangePassword()}
          >
            {t("change_password")}
          </button>
      </div>
    </div>
  );
};

export default ChangePasswordInfo;
