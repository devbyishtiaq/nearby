import React, { useState, CSSProperties } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import InputTextOnBorder from "../../General/InputTextOnBorder/InputTextOnBorder";
import DontHaveAccount from "../DontHaveAccount/DontHaveAccount";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import AlertBox from "../../General/AlertBox/AlertBox";
import GridLoader from "react-spinners/GridLoader";
import useTranslation from "next-translate/useTranslation";
import styles from "./LoginInfo.module.css";

interface LoginInfoProps {
  userType: string;
  setUserType: React.Dispatch<React.SetStateAction<string>>;
}

const override: CSSProperties = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  margin: "0 auto",
  borderColor: "#339F5E;",
};

const LoginInfo: React.FC<LoginInfoProps> = ({ userType, setUserType }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [alertText, setAlertText] = useState<string>("");
  const [alertShow, setAlertShow] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<string>("success");
  const router = useRouter();
  const { t } = useTranslation("auth");

  const handleSubmit = async () => {
    const { locale } = router;
    try {
      setLoading(true);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, locale }),
      });
      const data = await response.json();
      if (response.status === 200) {
        router.reload();
      } else {
        setAlertText(data["message"]);
        setAlertType("danger");
        setAlertShow(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setAlertText("Login failed. Please check your credentials.");
      setAlertType("danger");
      setAlertShow(true);
    }
    setLoading(false);
  };

  return (
    <div className={`${styles.parentDiv} ${loading ? "loadingOpacity" : ""}`}>
      <GridLoader
        color="#339F5E"
        loading={loading}
        cssOverride={override}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <div className={styles.login__title}>
        <p>{t("login__title")}</p>
        <p>{t("login__subtitle")}</p>
      </div>
      <p>{t("login__guidance")}</p>

      <Tabs
        defaultIndex={0}
        onSelect={(index) => console.log("Selected Tab:", index + 1)}
      >
        <div className={`${styles.tab__list} register__tabs`}>
          <TabList>
            <Tab>{t("tab__list1")}</Tab>
            <Tab>{t("tab__list2")}</Tab>
          </TabList>
        </div>
        <TabPanel>
          <InputTextOnBorder
            label={t("label__email")}
            placeholder={t("placeholder__email")}
            inputType="text"
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
        </TabPanel>

        <TabPanel>
          <InputTextOnBorder
            label={t("label__email")}
            placeholder={t("placeholder__email")}
            inputType="text"
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
        </TabPanel>

        <Link href="/forgot-password" className={styles.forgotPasswordText}>
          {t("forgot__pasword")}
        </Link>

        <div className={styles.login__check}>
          <button
            className={`button btn__default`}
            onClick={() => handleSubmit()}
          >
            {t("login")}
          </button>
          <DontHaveAccount
            dontHaveAccount={t("dont__have__account")}
            signup={t("signup")}
          />
        </div>
      </Tabs>
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

export default LoginInfo;
