import React, { useState } from "react";
import InputTextOnBorder from "../../General/InputTextOnBorder/InputTextOnBorder";
import PasswordMustHave from "../PasswordMustHave/PasswordMustHave";
import UpdateConsent from "../UpdateConsent/UpdateConsent";
import TermsOfService from "../TermsOfService/TermsOfService";
import Button from "../../General/Button/Button";
import AlreadyHaveAccount from "../AlreadyHaveAccount/AlreadyHaveAccount";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import useTranslation from "next-translate/useTranslation";
import styles from "./RegisterInfo.module.css";

interface RegisterInfoProps {
  userType: string;
  setUserType: React.Dispatch<React.SetStateAction<string>>;
  companyName: string;
  setCompanyName: (companyName: string) => void;
  binNumber: string;
  setBinNumber: (binNumber: string) => void;
  userPosition: string;
  setUserPosition: (userPosition: string) => void;
  username: string;
  setUsername: (username: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  handleRegister: () => void;
}

const RegisterInfo: React.FC<RegisterInfoProps> = ({
  userType,
  setUserType,
  companyName,
  setCompanyName,
  binNumber,
  setBinNumber,
  userPosition,
  setUserPosition,
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  handleRegister,
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
        <p>{t("register__title")}</p>
        <p>{t("register__subtitle")}</p>
      </div>
      <p>{t("register__guidance")}</p>

      <Tabs
        defaultIndex={0}
        onSelect={(index) => console.log("Selected Tab:", index + 1)}
      >
        <div className={`${styles.tab__list} register__tabs`}>
          <TabList>
            <Tab onClick={() => setUserType("1")}>{t("tab__list1")}</Tab>
            <Tab onClick={() => setUserType("2")}>{t("tab__list2")}</Tab>
          </TabList>
        </div>

        <TabPanel>
          <InputTextOnBorder
            label={t("label__company__name")}
            placeholder={t("placeholder__company__name")}
            inputType="text"
            valueState={companyName}
            setValueState={setCompanyName}
          />
          <InputTextOnBorder
            label={t("label__bin")}
            placeholder={t("placeholder__bin")}
            inputType="text"
            valueState={binNumber}
            setValueState={setBinNumber}
          />
          <InputTextOnBorder
            label={t("label__user__position")}
            placeholder={t("placeholder__user__position")}
            inputType="text"
            valueState={userPosition}
            setValueState={setUserPosition}
          />
          <InputTextOnBorder
            label={t("label__username")}
            placeholder={t("placeholder__username")}
            inputType="text"
            required
            valueState={username}
            setValueState={setUsername}
          />
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
        </TabPanel>

        <TabPanel>
          <InputTextOnBorder
            label={t("label__username")}
            placeholder={t("placeholder__username")}
            inputType="text"
            required
            valueState={username}
            setValueState={setUsername}
          />
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
        </TabPanel>
      </Tabs>

      <div className={styles.register__check}>
        <PasswordMustHave
          title={t("password__must")}
          sections={passwordInfos}
        />
        <UpdateConsent consentText={t("update__consent")} />
        <TermsOfService termsOfServiceText={t("term__of__policy")} />
        <div className={styles.login__check}>
          <button
            className={`button btn__default`}
            type="button"
            onClick={() => handleRegister()}
          >
            {t("signup")}
          </button>
        </div>
        <AlreadyHaveAccount
          alreadyHaveAccountText={t("already__have__account")}
          loginText={t("login")}
        />
      </div>
    </div>
  );
};

export default RegisterInfo;
