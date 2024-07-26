import { NextPage } from "next";
import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../styles/activateEmail.module.css";
import Header from "../../components/General/Header/Header";
import Footer from "../../components/General/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import useTranslation from "next-translate/useTranslation";

const ActivateEmail: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { locale } = router;
  const { t } = useTranslation("activate-email");

  async function activateAccount() {
    try {
        const response = await fetch('/api/auth-activate-account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ slug, locale })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();

    } catch (error: any) {
        console.error('Error:', error.message);
        return null;
    }
  }

  useEffect(() => {
    activateAccount();
  }, [])

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <Image
          src="/img/general/circled-tick.png"
          height={100}
          width={100}
          alt="Account activated."
        />
        <h3>{t("congratulations")}</h3>
        <p>{t("account-activated")}</p>
        <button
          onClick={() => router.push("/login")}
          className={`btn btn-success ${styles.okButton}`}
        >
          {t("ok")}&nbsp;
          <FontAwesomeIcon icon={faExclamation} />
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default ActivateEmail;
