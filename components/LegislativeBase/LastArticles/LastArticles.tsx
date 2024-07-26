import React, { useState, useEffect, CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./LastArticles.module.css";
import Card from "../../AIKAGeneral/Card/Card";
import { legislationLastArticles } from "../../../services/legislationLastArticles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import ClockLoader from "react-spinners/ClockLoader";
import { capitalizeFirstLetter } from '../../../utils/utils';

const override: CSSProperties = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  margin: "0 auto",
  borderColor: "#339F5E;",
};

interface LastArticlesProp {
    token: string;
    header: string;
}

const LastArticles: React.FC<LastArticlesProp> = ({ token, header }) => {
    const [lastArticlesData, setLastArticlesData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await legislationLastArticles(token);
                setLastArticlesData(data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    return (
        <div className={styles.container}>
            <div className="d-flex">
                <h5>
                    { header }
                </h5>
                <FontAwesomeIcon icon={faEllipsisVertical} className={styles.elipsisIcon} />
            </div>
            <div className={`${styles.documents} mt-2`}>
                {
                    !loading
                    ?   <>{lastArticlesData?.map((document: any, index: any) => (
                            <Link href={`/legislative-base?article-id=${document[1].toString()}`}>
                                <div className="d-flex mb-3">
                                    <Image src="/img/general/file-pdf.png" width={15} height={20} alt="File PDF icon"
                                        className="me-3 mt-1" />
                                    <span className={`${styles.documentName} me-1`}>{ capitalizeFirstLetter(document[0]) }</span>
                                </div>
                            </Link>
                        ))}</>
                    :   <div className="my-5 py-5 d-flex justify-content-center align-items-center">
                            <ClockLoader color="#36d7b7" />
                        </div>
                }

            </div>
        </div>
    );
}

export default LastArticles;
