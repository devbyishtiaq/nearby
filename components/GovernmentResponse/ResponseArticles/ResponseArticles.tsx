import React, { CSSProperties } from "react";
import Link from "next/link";
import ClockLoader from "react-spinners/ClockLoader";
import styles from "./ResponseArticles.module.css";
import Accordion from 'react-bootstrap/Accordion';
import useTranslation from "next-translate/useTranslation";

const override: CSSProperties = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  margin: "0 auto",
  borderColor: "#339F5E;",
};

interface ResponseArticlesProps{
    articleList: any[],
    totalPagination: number,
    activePage: number,
    setActivePage: (activePage: number) => void,
    isLoading: boolean,
}

const ResponseArticles: React.FC<ResponseArticlesProps> = ({ articleList,
    totalPagination, activePage, setActivePage, isLoading }) => {

    const { t } = useTranslation("government-response");
    return (
        <div className={styles.container}>
            {
                isLoading
                ?   <div className="my-5 py-5 d-flex justify-content-center align-items-center">
                        <ClockLoader color="#36d7b7" />
                    </div>
                :   <>{
                        totalPagination > 1
                        ?   <div className={`d-flex align-items-center ${styles.paginationContainer}`}>
                                <div>
                                    {t("page")} {activePage} {t("of")} {totalPagination}
                                </div>
                                <div className="d-flex ms-auto me-2 gap-2">
                                    <button className={styles.paginationButton}
                                        onClick={() => setActivePage(activePage - 1)}
                                        disabled={activePage === 1}>
                                        {t("previous")}
                                    </button>
                                    <button className={styles.paginationButton}
                                        onClick={() => setActivePage(activePage + 1)}
                                        disabled={activePage === totalPagination}>
                                        {t("next")}
                                    </button>
                                </div>
                            </div>
                        : null
                    }

                    {
                        articleList.length !== 0
                        ? <Accordion defaultActiveKey="0">
                            {articleList.map((article, index) => (
                                <Accordion.Item key={index} eventKey={index.toString()} className={`mt-2 ${styles.articleContainer}`}>
                                    <Accordion.Header className={styles.articleHeader}>
                                        {index + ((activePage - 1) * 20) + 1}. { article.law_header }. { article.law_description }
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div dangerouslySetInnerHTML={{ __html: article.law_article }}></div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                            </Accordion>
                        : <p className="text-center mt-5">There is no answer available, yet.</p>
                    }</>
            }

        </div>
    )
}

export default ResponseArticles;
