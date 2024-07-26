import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import styles from "./AccountLinks.module.css";
import CustomAlert from "../../General/CustomAlert/CustomAlert";

const AccountLinks = ({ userType }: any) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const [activeLink, setActiveLink] = useState<string>("");
  const [alertBox, setAlertBox] = useState({
    type: "",
    text: "",
    title: "",
    isOpen: false,
  });

  useEffect(() => {
    setActiveLink(router.pathname);
  }, [router.pathname]);

  return (
    <div className={styles.container}>
      <Link href="/account-settings">
        <span
          className={`${activeLink === "/account-settings" ? styles.activeLinkStyle : null}`}
        >
          <span>{t("my-profile")}</span>
        </span>
      </Link>
      <Link href="/my-tariff">
        <span
          className={`${activeLink === "/my-tariff" ? styles.activeLinkStyle : null}`}
        >
          <span>{t("my-tariff")}</span>
        </span>
      </Link>
      <Link href="/my-planner">
        <span
          className={`${activeLink === "/my-planner" ? styles.activeLinkStyle : null}`}
        >
          <span>{t("my-planner")}</span>
        </span>
      </Link>
      {/* <Link href="/payment-details">
        <span
          className={`${activeLink === "/payment-details" ? styles.activeLinkStyle : null}`}
        >
          <span>{t("payment-details")}</span>
        </span>
      </Link> */}

      {userType === 1 && (
        <Link href="/department-documents">
          <span
            className={`${activeLink === "/department-documents" ? styles.activeLinkStyle : null}`}
          >
            <span>{t("department-documents")}</span>
          </span>
        </Link>
      )}

      {userType === 2 && (
        <Link href="/my-documents">
          <span
            className={`${activeLink === "/my-documents" ? styles.activeLinkStyle : null}`}
          >
            <span>{t("my-documents")}</span>
          </span>
        </Link>
      )}

      {alertBox.isOpen && (
        <CustomAlert
          type={alertBox.type}
          text={alertBox.text}
          title={alertBox.title}
          setAlertShow={() =>
            setAlertBox((prev: any) => ({
              ...prev,
              type: "",
              text: "",
              title: "",
              isOpen: !prev.isOpen,
            }))
          }
        />
      )}
    </div>
  );
};

export default AccountLinks;
