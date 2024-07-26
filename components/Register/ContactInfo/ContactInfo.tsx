import React, { useState, CSSProperties } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import InputTextOnBorder from "../../General/InputTextOnBorder/InputTextOnBorder";
import DontHaveAccount from "../DontHaveAccount/DontHaveAccount";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import AlertBox from "../../General/AlertBox/AlertBox";
import GridLoader from "react-spinners/GridLoader";
import useTranslation from "next-translate/useTranslation";
import styles from "./ContactInfo.module.css";

const override: CSSProperties = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  margin: "0 auto",
  borderColor: "#339F5E;",
};

const ContactInfo: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [contactMessage, setContactMessage] = useState<string>("");
  const [alertText, setAlertText] = useState<string>("");
  const [alertShow, setAlertShow] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<string>("success");
  const router = useRouter();
  const { t } = useTranslation("contact");

  const handleSubmit = async () => {
    const { locale } = router;
    const phoneNumber = email;
    const username = email;
    const message_content = contactMessage;
    const message_type = "contact-page";
    console.log(email, message_content, message_type)
    try {
      setLoading(true);
      const response = await fetch("/api/send-contact-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, phoneNumber, message_content, message_type, locale }),
      });
      const data = await response.json();
      if (response.status === 200) {
        setAlertText(data["message"]);
        setAlertType("success");
        setAlertShow(true);
      } else {
        setAlertText(data["message"]);
        setAlertType("danger");
        setAlertShow(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setAlertText("Contact message could not send.");
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
        <p>{t("contact-header")}</p>
        <p></p>
      </div>
      <p></p>

      <input
        className="form-control border mb-3"
        placeholder={t("placeholder-email")}
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <textarea className="form-control border" rows={4} placeholder={t("your-message")}
        value={contactMessage} onChange={(e) => setContactMessage(e.target.value)}/>

      <div className={styles.login__check}>
          <button
            className={`button btn__default`}
            onClick={() => handleSubmit()}
          >
            {t("submit")}
          </button>
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

export default ContactInfo;
