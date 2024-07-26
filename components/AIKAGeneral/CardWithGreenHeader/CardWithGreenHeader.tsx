import React, { CSSProperties } from "react";
import styles from "./CardWithGreenHeader.module.css";
import ClockLoader from "react-spinners/ClockLoader";
import useTranslation from "next-translate/useTranslation";

const override: CSSProperties = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  margin: "0 auto",
  borderColor: "#339F5E;",
};

interface CardWithGreenHeaderProps {
    cardHeader: string;
    contentList: { name: string; desc?: string; value: string }[];
}

const CardWithGreenHeader: React.FC<CardWithGreenHeaderProps> = ({ cardHeader, contentList }) => {

    const { t } = useTranslation("legislative-base");
    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <span className={styles.cardTitle}>{cardHeader}</span>
            </div>
            <div className={styles.cardContent}>
                {
                    contentList.length > 0
                    ?   <>
                            {
                                contentList.map((content, index) => (
                                    <div key={index} className={`d-flex mt-2 ${styles.contentContainer}`}>
                                        <span>{t(content.name)}</span>
                                        <span className={styles.valueText}>{content.value}</span>
                                    </div>
                                ))
                            }
                        </>
                    :   <div className="my-5 py-5 d-flex justify-content-center align-items-center">
                            <ClockLoader color="#36d7b7" />
                        </div>
                }

            </div>
        </div>
    );
}

export default CardWithGreenHeader;
