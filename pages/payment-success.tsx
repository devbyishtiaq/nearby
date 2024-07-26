import type { NextPage } from "next";
import Header from "../components/General/Header/Header";
import Footer from "../components/General/Footer/Footer";

import useTranslation from "next-translate/useTranslation";
import styles from "../styles/payment.module.css";

const PaymentSuccess: NextPage = () => {
  const { t } = useTranslation("common");

  return (
    <div className={styles.parentDiv}>
      <Header />
      <div className={`${styles.content} container`}>
        <img src="/img/general/success.svg" alt="successImg" />
        <div className={styles.message}>
          <h1>{t("payment__success__title")}</h1>
          <p>{t("payment__success__description")}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
