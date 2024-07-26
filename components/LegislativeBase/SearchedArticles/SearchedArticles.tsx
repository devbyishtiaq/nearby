import React, { useState, useEffect, CSSProperties } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import Image from "next/image";
import styles from "./SearchedArticles.module.css";
import { legislationPopularArticles } from "../../../services/legislationPopularArticles";
import BackButton from "../../General/BackButton/BackButton";
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

interface SearchedArticlesProp {
    queryText: string;
    token: string;
    header: string;
}

const SearchedArticles: React.FC<SearchedArticlesProp> = ({ queryText, token, header }) => {
    const router = useRouter();
    const { t } = useTranslation("legislative-base");
    const [searchedArticlesData, setSearchedArticlesData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [pageCount, setPageCount] = useState<number>(0);
    const [page, setPage] = useState<number>(parseInt(router.query?.page as string, 10) || 1);

    async function legislationSearchFunc() {
        setLoading(true);
        try {
          const response = await fetch("/api/legislative-base/legislation-search", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ queryText, page, token }),
          });

          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }

          const data = await response.json();
          setSearchedArticlesData(data.law_articles);
          setPageCount(Math.ceil(data.result_count / 10));
          setLoading(false);
        } catch (error: any) {
          console.error("Error:", error.message);
          return null;
        }
        setLoading(false);
      }

    const navigateNextPage = () => {
        setPage(page + 1);
    }

    const navigatePreviousPage = () => {
        setPage(page - 1);
    }

    useEffect(() => {
        legislationSearchFunc();
        }, [queryText, page])

    return (
        <div className={styles.container}>
            <div className="d-flex align-items-center mb-5">
                <BackButton />
                <h5>
                    {t("searching-for")} { header } {t("searching-for-after")}
                </h5>
                <div className="ms-auto">
                    <span>{page} {t("of")} {pageCount}</span>
                    <button className="btn btn-light ms-2" onClick={navigatePreviousPage}>
                        {t("previous")}
                    </button>
                    <button className="btn btn-light ms-2" onClick={navigateNextPage}>
                        {t("next")}
                    </button>
                </div>
            </div>
            <div className={`${styles.documents} mt-2`}>
                {
                    !loading
                    ?   <>{searchedArticlesData?.map((document: any, index: any) => (
                            <Link href={`/legislative-base?article-id=${document[1].toString()}`}>
                                <div className="d-flex mb-3 pb-2 border-bottom">
                                    <Image src="/img/general/file-pdf.png" width={15} height={20} alt="File PDF icon"
                                        className="me-3 mb-auto" />
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

export default SearchedArticles;
