import React from "react";
import Image from "next/image";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  const { t } = useTranslation("common");
  return (
    <div className={styles.footer}>
      <div className={`${styles.footer__container} container`}>
        <div className={styles.footer__logo}>
          <Image
            src="/img/general/nearby.png"
            width={180}
            height={60}
            alt="Nearby Logo"
          />
          <div className={styles.footer__policy}>
            <div>
              <span>{t("footer__policyDLC1")}</span>
              <Link href="/payment-refund-rules">
                <span className="text-dark">{t("footer__policyDLC2")}</span>
              </Link>
            </div>
            <div>
              <a href="/terms-of-use" className="text-dark"
                target="_blank">
                {t("footer__policy1")}
              </a>
              <Link href="/privacy-policy" className="text-dark">
                {t("footer__policy2")}
              </Link>
              <a href="/cookies-policy" className="text-dark"
                target="_blank">
                {t("footer__policy3")}
              </a>
            </div>
          </div>
          <span className={styles.footer__rights}>{t("footer__rights")}</span>
        </div>
        <div className={styles.footer__getApp}>
          <span>{t("get-the-app")}</span>
          <Link href="#">
            <Image
              src="/img/footer/faq-appstore.svg"
              width={150}
              height={60}
              alt="Apple Icon"
            />
          </Link>
          <Link href="#">
            <Image
              src="/img/footer/faq-playstore.svg"
              width={150}
              height={60}
              alt="Google Play Icon"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
