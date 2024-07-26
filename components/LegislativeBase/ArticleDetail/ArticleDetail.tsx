import React from "react";
import Image from "next/image";
import { useEffect, useState, CSSProperties, useRef } from "react";
import styles from "./ArticleDetail.module.css";
import BackButton from "../../General/BackButton/BackButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faDownload,
  faHeart,
  faPrint,
  faAngleUp,
  faAngleDown,
  faCircleXmark,
  faBookmark,
  faFileCirclePlus
} from "@fortawesome/free-solid-svg-icons";
import ClockLoader from "react-spinners/ClockLoader";
import LegislationNotes from "../LegislationNotes/LegislationNotes";
import useTranslation from "next-translate/useTranslation";

const override: CSSProperties = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  margin: "0 auto",
  borderColor: "#339F5E;",
};

interface ArticleDetailProps {
  email: string;
  articleId: string;
  token: string;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ email, articleId, token }) => {
  const [queryText, setQueryText] = useState<string>("");
  const selectedTextRef = useRef("");
  const [articleHeader, setArticleHeader] = useState<string>("");
  const [articleDescription, setArticleDescription] = useState<string>("");
  const [articleContent, setArticleContent] = useState<string>("");
  const [highlightedContent, setHighlightedContent] = useState<string>("");
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [currentHighlight, setCurrentHighlight] = useState(0);
  const [totalHighlights, setTotalHighlights] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const {t} = useTranslation("legislative-base");

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      searchInArticle();
    }
  };

  const downloadPdfFunc = async () => {
    const html = articleContent;
    const title = articleHeader;
    try {
      const response = await fetch('/api/legislative-base/create-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ html, title }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'document.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const saveDocumentFunc = async () => {
    let operationType = 1;
    if (isSaved) {
      operationType = 2;
    }
    try {
      const response = await fetch('/api/legislative-base/save-legislation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, operationType, articleId, articleHeader, token }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }
      setIsSaved(!isSaved);
      console.log(response)
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  useEffect(() => {
    if (isSearching) {
      navigateToHighlight(1);
      setCurrentHighlight(1);
      setIsSearching(false);
    }
  }, [highlightedContent]);

  const searchInArticle = () => {
    if (queryText.length < 2) {
      setHighlightedContent(articleContent);
      setTotalHighlights(0);
      return;
    }
    setIsSearching(true);
    let counter = 0;
    const regex = new RegExp(`(${queryText})`, "gi");
    const newContent = articleContent.replace(regex, (match) => {
      counter++;
      return `<mark id='searched-result-${counter}'>${match}</mark>`;
    });
    setHighlightedContent(newContent);
    setTotalHighlights(counter);
  };

  const navigateToHighlight = (index: any) => {
    const prevHighlight: any = document.getElementById(`searched-result-${currentHighlight}`);
    if (prevHighlight) {
      prevHighlight.classList.remove("current-highlight");
    }

    const newHighlight: any = document.getElementById(`searched-result-${index}`);
    if (newHighlight) {
      newHighlight.classList.add("current-highlight");
      newHighlight.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setCurrentHighlight(index);
  };

  const handleNext = () => {
    if (currentHighlight < totalHighlights) {
      navigateToHighlight(currentHighlight + 1);
    }
  };

  const handlePrevious = () => {
    if (currentHighlight > 1) {
      navigateToHighlight(currentHighlight - 1);
    }
  };

  const getArticleDetail = async () => {
    try {
      const apiResponse = await fetch(
        "/api/legislative-base/get-article-details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ articleId, token }),
        },
      );

      if (!apiResponse.ok) {
        throw new Error(`HTTP error! status: ${apiResponse.status}`);
      }

      const apiResponseJson = await apiResponse.json();
      const articleData = apiResponseJson["law_articles"];
      setArticleHeader(articleData["law_header"]);
      setArticleDescription(articleData["law_description"]);
      setArticleContent(articleData["law_article"]);
      setHighlightedContent(articleData["law_article"]);
      setIsSaved(articleData["is_saved"]);
      setIsLoading(false);
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    getArticleDetail();
  }, [articleId]);

  useEffect(() => {
    setIsSearching(true);
    searchInArticle();
  }, [queryText, articleContent]);

  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection();
      if (selection) {
        selectedTextRef.current = selection.toString();
      }
    };
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const noteButtonFunc = () => {
      console.log(selectedTextRef.current);
      setIsOpen(true);
  }

  return (
    <div className={styles.parentContainer}>
      <LegislationNotes articleId={articleId} token={token}
        modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}
        selectedText={selectedTextRef.current || ""} />
      <div className={styles.containerUp}>
          <div className={styles.container}>
              {
                isSearching && queryText != ""
                ? <div className={styles.searchResultNavigators}>
                    <div className="d-flex m-3">
                        <div className={styles.navigatorButtons}>
                          <span className="me-2">
                            <b>{t("searching-for")}</b> "{queryText}"
                          </span>
                          <span className="me-2">{currentHighlight}</span> / <span
                            className="me-2">{totalHighlights}</span>
                          <button
                            onClick={handlePrevious}
                            >
                            <FontAwesomeIcon icon={faAngleUp} size="2xs" />
                          </button>
                          <button
                            onClick={handleNext}
                            >
                            <FontAwesomeIcon icon={faAngleDown} size="2xs" />
                          </button>
                          <button onClick={() => setIsSearching(false)}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                          </button>
                        </div>
                    </div>
                  </div>
                : <></>
              }
            <BackButton />
            <div className={`input-group ${styles.inputGroup}`}>
              <span
                className={`input-group-text ${styles.inputIcon}`}
                id="basic-addon1"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </span>
              <input
                type="text"
                className={`form-control ${styles.input}`}
                placeholder={t("search")}
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </div>
            <button className={styles.searchButtons}>
              <FontAwesomeIcon icon={faDownload} onClick={downloadPdfFunc}/>
            </button>
            <button className={styles.searchButtons} onClick={saveDocumentFunc}>
              {
                  isSaved? (
                    <Image src="/img/general/filled-heart.png"
                        width={33} height={25} alt="Saved Documents" />
                  ) : (
                    <Image src="/img/general/empty-heart.png"
                        width={33} height={25} alt="Not Saved Documents" />
                  )
              }
            </button>
            <button className={styles.searchButtons} onClick={noteButtonFunc}>
              <FontAwesomeIcon icon={faFileCirclePlus} />
            </button>
            <button className={styles.searchButtons}>
              <FontAwesomeIcon icon={faPrint} />
            </button>
          </div>
      </div>
      {isLoading ? (
        <div className="my-5 py-5 d-flex justify-content-center align-items-center">
          <ClockLoader color="#36d7b7" />
        </div>
      ) : (
        <>
          <div className="mt-3 border-bottom pb-3">
            <h5>"{articleHeader}"</h5>
            <span className={styles.articleDescription}>
              <i>{articleDescription}</i>
            </span>
          </div>
          <div className="mt-3 border-bottom p-5">
            <span
              className={styles.articleContent}
              dangerouslySetInnerHTML={{ __html: highlightedContent }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ArticleDetail;
