import React, { useState, useEffect, CSSProperties } from "react";
import CardWithGreenHeader from "../../AIKAGeneral/CardWithGreenHeader/CardWithGreenHeader";
import styles from "./NotesBaseContainer.module.css";
import Link from "next/link";
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

interface NotesBaseContainerProp {
    token: string;
    header: string
}

const NotesBaseContainer: React.FC<NotesBaseContainerProp> = ({ token, header }) => {
    const [notesData, setNotesData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useTranslation("legislative-base");

    function trimText(content: any, limit: any) {
        let words = content.split(' ');
        if (words.length > limit) {
            return words.slice(0, limit).join(' ') + '...';
        }
        return content;
    }

    useEffect(() => {
        const getLegislativeNotes = async () => {
            try {
              setIsLoading(true);
              const response = await fetch('/api/legislative-base/get-legislative-notes', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
              });

              if (!response.ok) {
                throw new Error('Failed to get legislative notes from API');
              }

              const responseJson = await response.json();
              setNotesData(responseJson["data"]);
            } catch (error) {
              console.error('Error to get legislative notes:', error);
            }
            setIsLoading(false);
          };
        getLegislativeNotes();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <span className={styles.cardTitle}>{header}</span>
            </div>
            <div className={styles.cardContent}>
                {
                    isLoading
                    ?   <div className="my-5 py-5 d-flex justify-content-center align-items-center">
                            <ClockLoader color="#36d7b7" />
                        </div>
                    :   <>
                            {
                                notesData?.length > 0
                                ?   <>
                                        {
                                            notesData.map((content: any, index: any) => (
                                                <Link href={`/legislative-base?article-id=${content.legislation_id}`}>
                                                    <div key={index} className={`d-flex mt-2 ${styles.contentContainer}`}>
                                                        <span className="text-dark">{trimText(content.note_content, 15)}</span>
                                                    </div>
                                                </Link>
                                            ))
                                        }
                                    </>
                                :   <div className="my-5 py-5 d-flex justify-content-center align-items-center">
                                        {t("there-is-note-yet")}
                                    </div>
                            }
                        </>
                }


            </div>
        </div>
    );
}

export default NotesBaseContainer;
