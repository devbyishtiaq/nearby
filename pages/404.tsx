import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Header from "../components/General/Header/Header";
import Footer from "../components/General/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";

import useTranslation from "next-translate/useTranslation";
import styles from "../styles/404.module.css";

const Custom404: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation("common");

  return (
    <div className={styles.parentDiv}>
      <Header />
      <div className={`${styles.container__404} container`}>
        {/* <Image src="/img/general/404.png" height={150} width={220} alt="404" /> */}
        <div className={styles.image__404}></div>
        <h2>{t("404__title")}</h2>
        <p>{t("404__description")}</p>
        <button
          onClick={() => router.push("/")}
          className="button btn__default"
        >
          <FontAwesomeIcon icon={faReply} />
          &nbsp;{t("404__button")}
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Custom404;
