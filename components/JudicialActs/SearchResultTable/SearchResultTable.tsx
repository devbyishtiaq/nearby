import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import useTranslation from "next-translate/useTranslation";
import styles from "./SearchResultTable.module.css";
import Paginator from "../../General/Paginator/Paginator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faSort,
  faArrowLeft,
  faArrowRight,
  faCircleXmark,
  faFilePdf
} from "@fortawesome/free-solid-svg-icons";
import Accordion from "react-bootstrap/Accordion";
import * as XLSX from "xlsx";
import Modal from 'react-modal';
import ContentInModal from "../ContentInModal/ContentInModal";
import Loader from "../../General/loader/loader";

const customStyles: any = {
  content: {
    top: '50%',
    width: '80%',
    height: '80%',
    overflowY: 'auto',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    borderRadius: "15px",
    border: "0.2px solid #198754",
    transform: 'translate(-50%, -50%)',
  },
};

interface SearchResultTableProps {
  result: any[];
  currentStartPoint: any;
  setCurrentStartPoint: (currentStartPoint: any) => void;
  isLoading: boolean;
  totalCount: any;
  activeHeader: any;
  setActiveHeader: (activeHeader: any) => void;
  sortOrder: any;
  setSortOrder: (sortOrder: any) => void;
  makeSearch: () => void;
}

const SearchResultTable: React.FC<SearchResultTableProps> = ({
  result,
  currentStartPoint,
  setCurrentStartPoint,
  isLoading,
  totalCount,
  activeHeader,
  setActiveHeader,
  sortOrder,
  setSortOrder,
  makeSearch,
}) => {
  const [expandedRow, setExpandedRow] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(currentStartPoint / 10 + 1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredResult, setFilteredResult] = useState<any[]>(result);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalData, setModalData] = useState<any>();

  function openModal(res: any) {
    setModalData(res);
    setIsOpen(true);
  }

  function afterOpenModal() {

  }

  function closeModal() {
    setIsOpen(false);
  }

  const totalPages = Math.ceil(totalCount / 10);
  const { t } = useTranslation("judicial-acts");

  useEffect(() => {
    setCurrentStartPoint((currentPage - 1) * 10);
    makeSearch();
  }, [currentPage, sortOrder]);

  useEffect(() => {
    if (result) {
      const newFilteredResult = result.filter(
        (item) =>
          item &&
          typeof item === "object" &&
          Object.keys(item).length > 0 &&
          Object.keys(item).some(
            (key) =>
              item[key] &&
              item[key]
                .toString()
                .toLowerCase()
                .includes(searchQuery.toLowerCase()),
          ),
      );
      setFilteredResult(newFilteredResult);
    }
  }, [searchQuery, result]);

  const handlePageChange = (targetStartPoint: any) => {
    setCurrentStartPoint(targetStartPoint);
  };

  const handleHeaderClick = (header: any) => {
    setActiveHeader(header === activeHeader ? null : header);
  };

  const handleSort = (order: any, header: any) => {
    setSortOrder(order);
    setActiveHeader(header);
    makeSearch();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const exportToExcel = (data: any[]): void => {
    const currentDate = new Date();
    const dateString = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
    const timeString = `${currentDate.getHours()}-${currentDate.getMinutes()}-${currentDate.getSeconds()}`;
    const fileName = `export_${dateString}_${timeString}.xlsx`;

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, fileName);
  };

  const [pdfGenerating, setPdfGenerating] = useState(false);

  const generatePdf = async () => {
    try {
      setPdfGenerating(true);

      // Select the content to be converted to PDF
      const contentElement = document.getElementById('content-to-pdf');
      if (!contentElement) {
        throw new Error('Content element not found');
      }

      // Extract HTML content from the selected element
      const htmlContent = contentElement.innerHTML;

      // Send POST request using fetch
      const response = await fetch('/api/judicial-acts/create-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          html: htmlContent,
          title: "Case Details"
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Convert response to blob
      const blob = await response.blob();

      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a link element and trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'case-detail-from-nearby.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setPdfGenerating(false);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setPdfGenerating(false);
    }
  };

  return (
    <div className={`pb-5 ${styles.container}`}>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Case Content"
      >
        <div className="d-flex mb-3">
            <div className="px-5">
                <button className="p-2" onClick={generatePdf}>
                    <FontAwesomeIcon
                        icon={faFilePdf} style={{color: "#dc3545",}} size="xl" />
                    {
                        pdfGenerating
                        ?   <Loader />
                        :   <></>
                    }
                </button>
                <div id="content-to-pdf">
                    <table className="table table-hover mt-5">
                        <tbody>
                            <tr>
                              <td><b>{t("case")}</b></td>
                              <td>{modalData?.jsoup_act_number}</td>
                            </tr>
                            <tr>
                              <td><b>{t("column-date")}</b></td>
                              <td>{modalData?.jsoup_act_date.split("T")[0]}</td>
                            </tr>
                            <tr>
                              <td><b>{t("plaintiff")}</b></td>
                              <td>{modalData?.jsoup_act_plaintiff}</td>
                            </tr>
                            <tr>
                              <td><b>{t("defendant")}</b></td>
                              <td>{modalData?.jsoup_act_defendant}</td>
                            </tr>
                            <tr>
                              <td><b>{t("category")}</b></td>
                              <td>{modalData?.jsoup_act_civil_category}</td>
                            </tr>
                            <tr>
                              <td><b>{t("area")}</b></td>
                              <td>{modalData?.jsoup_act_region}</td>
                            </tr>
                            <tr>
                              <td><b>{t("court")}</b></td>
                              <td>{modalData?.jsoup_act_court}</td>
                            </tr>
                            <tr>
                              <td><b>{t("type")}</b></td>
                              <td>{modalData?.jsoup_act_type}</td>
                            </tr>
                            <tr>
                              <td><b>{t("instance")}</b></td>
                              <td>{modalData?.jsoup_act_instance}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <ContentInModal content={modalData?.exactContent}
                            date={modalData?.jsoup_act_date.split("T")[0]}
                            actNumber={modalData?.jsoup_act_number}
                            documentType={modalData?.jsoup_act_type}
                            regionText={modalData?.jsoup_act_region}
                        />
                    </div>
                </div>
            </div>
            <button className="ms-auto mb-auto" onClick={closeModal}>
                <FontAwesomeIcon icon={faCircleXmark} style={{color: "#dc3545",}}
                    size="xl" />
            </button>
        </div>
      </Modal>
      <div className="d-flex align-items-center p-3">
        <h5>{t("search-result")}</h5>
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
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <button
          className={`btn btn-success ${styles.searchButton} ${styles.buttonStyle}`}
          onClick={() => exportToExcel(filteredResult)}
        >
          <Image
            src="/img/general/cloud-download.png"
            width={18}
            height={18}
            alt="Download icon"
          />
          &nbsp;&nbsp;{t("export")}
        </button>
      </div>
      <div className="">
        <table className={`${styles.tableStyle} table table-hover text-center`}>
          {/* SEARCH TABLE */}
          <thead>
            <tr>
              <th onClick={() => handleHeaderClick("jsoup_act_number")}>
                {t("case")}#&nbsp;&nbsp;
                <FontAwesomeIcon icon={faSort} />
                {
                    totalPages > 1
                    ?   <>{activeHeader === "jsoup_act_number" && (
                          <div className={styles.dropdown}>
                            <div>
                              <button onClick={() => handleSort("asc", "jsoup_act_number")}>{t("asc")}</button>
                            </div>
                            <div>
                              <button onClick={() => handleSort("desc", "jsoup_act_number")}>{t("desc")}</button>
                            </div>
                          </div>
                        )}</>
                    :   <></>
                }
              </th>
              <th onClick={() => handleHeaderClick("jsoup_act_date")}>
                {t("column-date")}&nbsp;&nbsp;
                <FontAwesomeIcon icon={faSort} />
                {
                    totalPages > 1
                    ?   <>{activeHeader === "jsoup_act_date" && (
                          <div className={styles.dropdown}>
                            <div>
                              <button onClick={() => handleSort("asc", "jsoup_act_date")}>{t("asc")}</button>
                            </div>
                            <div>
                              <button onClick={() => handleSort("desc", "jsoup_act_date")}>{t("desc")}</button>
                            </div>
                          </div>
                        )}</>
                    :   <></>
                }
              </th>
              <th onClick={() => handleHeaderClick("jsoup_act_plaintiff")}>
                {t("plaintiff")}&nbsp;&nbsp;
                <FontAwesomeIcon icon={faSort} />
                {
                    totalPages > 1
                    ?   <>{activeHeader === "jsoup_act_plaintiff" && (
                          <div className={styles.dropdown}>
                            <div>
                              <button onClick={() => handleSort("asc", "jsoup_act_plaintiff")}>{t("asc")}</button>
                            </div>
                            <div>
                              <button onClick={() => handleSort("desc", "jsoup_act_plaintiff")}>{t("desc")}</button>
                            </div>
                          </div>
                        )}</>
                    :   <></>
                }
              </th>
              <th onClick={() => handleHeaderClick("jsoup_act_defendant")}>
                {t("defendant")}&nbsp;&nbsp;
                <FontAwesomeIcon icon={faSort} />
                {
                    totalPages > 1
                    ?   <>{activeHeader === "jsoup_act_defendant" && (
                          <div className={styles.dropdown}>
                            <div>
                              <button onClick={() => handleSort("asc", "jsoup_act_defendant")}>{t("asc")}</button>
                            </div>
                            <div>
                              <button onClick={() => handleSort("desc", "jsoup_act_defendant")}>{t("desc")}</button>
                            </div>
                          </div>
                        )}</>
                    :   <></>
                }
              </th>
              <th onClick={() => handleHeaderClick("jsoup_act_civil_category")}>
                {t("category")}&nbsp;&nbsp;
                <FontAwesomeIcon icon={faSort} />
                {
                    totalPages > 1
                    ?   <>{activeHeader === "jsoup_act_civil_category" && (
                          <div className={styles.dropdown}>
                            <div>
                              <button onClick={() => handleSort("asc", "jsoup_act_civil_category")}>{t("asc")}</button>
                            </div>
                            <div>
                              <button onClick={() => handleSort("desc", "jsoup_act_civil_category")}>{t("desc")}</button>
                            </div>
                          </div>
                        )}</>
                    :   <></>
                }
              </th>
              <th onClick={() => handleHeaderClick("jsoup_act_region")}>
                {t("area")}&nbsp;&nbsp;
                <FontAwesomeIcon icon={faSort} />
                {
                    totalPages > 1
                    ?   <>{activeHeader === "jsoup_act_region" && (
                          <div className={styles.dropdown}>
                            <div>
                              <button onClick={() => handleSort("asc", "jsoup_act_region")}>{t("asc")}</button>
                            </div>
                            <div>
                              <button onClick={() => handleSort("desc", "jsoup_act_region")}>{t("desc")}</button>
                            </div>
                          </div>
                        )}</>
                    :   <></>
                }
              </th>
              <th onClick={() => handleHeaderClick("jsoup_act_court")}>
                {t("court")}&nbsp;&nbsp;
                <FontAwesomeIcon icon={faSort} />
                {
                    totalPages > 1
                    ?   <>{activeHeader === "jsoup_act_court" && (
                          <div className={styles.dropdown}>
                            <div>
                              <button onClick={() => handleSort("asc", "jsoup_act_court")}>{t("asc")}</button>
                            </div>
                            <div>
                              <button onClick={() => handleSort("desc", "jsoup_act_court")}>{t("desc")}</button>
                            </div>
                          </div>
                        )}</>
                    :   <></>
                }
              </th>
              <th onClick={() => handleHeaderClick("jsoup_act_type")}>
                {t("type")}&nbsp;&nbsp;
                <FontAwesomeIcon icon={faSort} />
                {
                    totalPages > 1
                    ?   <>{activeHeader === "jsoup_act_type" && (
                          <div className={styles.dropdown}>
                            <div>
                              <button onClick={() => handleSort("asc", "jsoup_act_type")}>{t("asc")}</button>
                            </div>
                            <div>
                              <button onClick={() => handleSort("desc", "jsoup_act_type")}>{t("desc")}</button>
                            </div>
                          </div>
                        )}</>
                    :   <></>
                }
              </th>
              <th onClick={() => handleHeaderClick("jsoup_act_instance")}>
                {t("instance")}&nbsp;&nbsp;
                <FontAwesomeIcon icon={faSort} />
                {
                    totalPages > 1
                    ?   <>{activeHeader === "jsoup_act_instance" && (
                          <div className={styles.dropdown}>
                            <div>
                              <button onClick={() => handleSort("asc", "jsoup_act_instance")}>{t("asc")}</button>
                            </div>
                            <div>
                              <button onClick={() => handleSort("desc", "jsoup_act_instance")}>{t("desc")}</button>
                            </div>
                          </div>
                        )}</>
                    :   <></>
                }
              </th>
            </tr>
          </thead>
          <tbody className={styles.tbodyStyle}>
            {isLoading ? (
              <tr
                className={`mt-5 text-center text-success ${styles.loadingText}`}
              >
                <td colSpan={9}>
                  <p>
                    {t("search_text_1")}
                    <br></br>
                    {t("search_text_2")}
                  </p>
                </td>
              </tr>
            ) : (
              <>
                {totalCount === "0" ? (
                  <tr className="text-center mt-5 h6">
                    <td colSpan={9}>{t("no_result_text")}</td>
                  </tr>
                ) : (
                  <>
                    {filteredResult?.map((res, index) => (
                      <>
                        <tr
                          key={index}
                          onClick={() => openModal(res)}
                        >
                          <td>{res.jsoup_act_number}</td>
                          <td>{res.jsoup_act_date}</td>
                          <td>{res.jsoup_act_plaintiff}</td>
                          <td>{res.jsoup_act_defendant}</td>
                          <td>{res.jsoup_act_civil_category}</td>
                          <td>{res.jsoup_act_region}</td>
                          <td>{res.jsoup_act_court}</td>
                          <td>{res.jsoup_act_type}</td>
                          <td>{res.jsoup_act_instance}</td>
                        </tr>
                      </>
                    ))}
                  </>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
      {!isLoading && totalPages > 1 ? (
        <div className="d-flex align-items-center justify-content-between">
          <button
            className={`btn btn-light ${styles.searchButton}`}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1} // Assuming currentPage starts at 1
          >
            <FontAwesomeIcon icon={faArrowLeft} /> {t("previous")}
          </button>
          <div className="d-flex align-items-center justify-content-center flex-grow-1">
            <Paginator
              numberofReviews={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
          <button
            className={`btn btn-light ${styles.searchButton}`}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {t("next")} <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default SearchResultTable;
