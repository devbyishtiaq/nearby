import React from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import styles from "./UnderDevelopment.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ServiceCard from "../ServiceCard/ServiceCard";

const UnderDevelopment: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  return (
    <div className={`${styles.container}`}>
        <div className={styles.contentContainer}>
            <Image src="/img/general/nearby.png" width={200} height={70} alt="Nearby" />
            <h3>{t("in-development")}</h3>
            <p>{t("better-place")}</p>
            <button className={styles.goBackButton} onClick={() => router.back()}>
                <FontAwesomeIcon icon={faArrowLeft} /> {t("go-back")}
            </button>
        </div>
        <div className={styles.servicesContainer}>
            <div className="col-md-4">
                <ServiceCard imageSrc="/img/AIKA/justice-green.png"
                    title={t("legislative-base")}
                    linkDirection="/legislative-base"
                    linkText={t("learn-more")} />
            </div>
            <div className="col-md-4">
                <ServiceCard imageSrc="/img/AIKA/box-green.png"
                    title={t("government-response")}
                    linkDirection="/government-body-responses"
                    linkText={t("learn-more")} />
            </div>

            <div className="col-md-4">
                <ServiceCard imageSrc="/img/AIKA/person.png"
                    title={t("judicial-acts")}
                    linkDirection="/judicial-acts"
                    linkText={t("learn-more")} />
            </div>
        </div>
    </div>
  );
};

export default UnderDevelopment;
