import React from "react";
import Image from "next/image";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import styles from "./Circle.module.css";

const Circle: React.FC = () => {
    const { t } = useTranslation("home-page");

    return (
        <div className={styles.circleContainer}>
            <Image src="/img/home/circle.png" width={300} height={300} alt="Nearby Home Circle"
                className={styles.circle} />
            <Image src="/img/general/nby_logo.png" width={170} height={170} alt="Nearby Short Logo"
                className={styles.nbyLogo} />
            <Image src="/img/home/vector-top-right.png" width={150} height={60} alt="Line Top Right" 
                className={styles.lineTopRight}/>
            <Image src="/img/home/vector-top-right.png" width={150} height={60} alt="Line Right" 
                className={styles.lineRight}/>
            <Image src="/img/home/vector-top-right.png" width={150} height={60} alt="Line Right 2" 
                className={styles.lineRight2}/>
            <Image src="/img/home/vector-down-right.png" width={150} height={60} alt="Line Down Right" 
                className={styles.lineDownRight}/>
            <Image src="/img/home/vector-down-left.png" width={150} height={60} alt="Line Down Left" 
                className={styles.lineDownLeft}/>
            <Image src="/img/home/vector-top-left.png" width={150} height={60} alt="Line Left" 
                className={styles.lineLeft}/>
            <Image src="/img/home/vector-top-left.png" width={150} height={60} alt="Line Left" 
                className={styles.lineLeft2}/>
            <Image src="/img/home/vector-top-left.png" width={150} height={60} alt="Line Top Left" 
                className={styles.lineTopLeft}/>
            
            <Link href="/judicial-acts">
                <div className={`${styles.serviceContainer} ${styles.serviceTopRight}`}>
                    <Image src="/img/AIKA/hammer.png" width={22} height={22} alt="Database of Judicial Acts" />
                    <span>{t("judicial-acts")}</span>
                </div>
            </Link>

            <Link href="/creation-and-signing">
                <div className={`${styles.serviceContainer} ${styles.serviceRight}`}>
                    <Image src="/img/AIKA/arrow-right.png" width={22} height={22} alt="Creation and Signing" />
                    <span>{t("creation-signing")}</span>
                </div>
            </Link>

            <Link href="/marketplace">
                <div className={`${styles.serviceContainer} ${styles.serviceRight2}`}>
                    <Image src="/img/AIKA/marketplace.png" width={22} height={22} alt="Marketplace" />
                    <span>{t("marketplace")}</span>
                </div>
            </Link>

            <Link href="/analysis-of-documents">
                <div className={`${styles.serviceContainer} ${styles.serviceDownRight}`}>
                    <Image src="/img/AIKA/analysis.png" width={22} height={22} alt="Analysis" />
                    <span>{t("analysis-of-documents")}</span>
                </div>
            </Link>

            <Link href="/search-specialist">
                <div className={`${styles.serviceContainer} ${styles.serviceDownLeft}`}>
                    <Image src="/img/AIKA/specialist.png" width={22} height={22} alt="Specialist" />
                    <span>{t("specialists-search")}</span>
                </div>
            </Link>
            
            <Link href="/government-body-responses">
                <div className={`${styles.serviceContainer} ${styles.serviceLeft}`}>
                    <Image src="/img/AIKA/box.png" width={22} height={22} alt="Documents" />
                    <span>{t("government-response")}</span>
                </div>
            </Link>

            <Link href="/ai-ka">
                <div className={`${styles.serviceContainer} ${styles.serviceLeft2}`}>
                    <Image src="/img/AIKA/aika.png" width={22} height={22} alt="AIKA" />
                    <span>{t("legal-consultant")}</span>
                </div>
            </Link>

            <Link href="/legislative-base">
                <div className={`${styles.serviceContainer} ${styles.serviceTopLeft}`}>
                    <Image src="/img/AIKA/justice.png" width={22} height={22} alt="Justice Logo" />
                    <span>{t("legislative-base")}</span>
                </div>
            </Link>
        </div>
    )
}

export default Circle;