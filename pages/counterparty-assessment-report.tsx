// @ts-nocheck
import React, { useEffect, useState, CSSProperties  } from "react";
import { useRouter } from "next/router";
import { NextPage, GetServerSideProps, GetServerSidePropsContext } from "next";
import Header from "../components/General/Header/Header";
import Footer from "../components/General/Footer/Footer";
import styles from "../styles/counterpartyAssessment.module.css";
import '@react-pdf-viewer/core/lib/styles/index.css';
import dynamic from 'next/dynamic';
import ClockLoader from "react-spinners/ClockLoader";
import BackButton from "../components/General/BackButton/BackButton";
import useTranslation from "next-translate/useTranslation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFilePdf} from "@fortawesome/free-solid-svg-icons";

const override: CSSProperties = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  margin: "0 auto",
  borderColor: "#339F5E;",
};

// @ts-ignore
const Viewer = dynamic(() => import('@react-pdf-viewer/core').then(module => module.Viewer as any), { ssr: false });
const Worker = dynamic(() => import('@react-pdf-viewer/core').then(module => module.Worker as any), { ssr: false });


const CounterPartyAssessmentReportPage: NextPage = (props: any) => {
    const router = useRouter();
    const [userType, setUserType] = useState<any>("");
    const [iibnNumber, setIibnNumber] = useState<any>("");
    const [pdfData, setPdfData] = useState<any>(null);
    const { t } = useTranslation("counterparty-assessment");

    useEffect(() => {
        const query = router.query;
        setUserType(query["user-type"] || "");
        setIibnNumber(query["iibn-number"] || "");
        const fetchPdf = async () => {
            try {
                const apiResponse = await fetch("/api/counterparty/get-counterparty-report", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ userType, iibnNumber }),
                });
                const data = await apiResponse.json();
                setPdfData(data.pdf);
            } catch (error) {
                console.error('Error fetching PDF:', error);
            }
        };
        if (userType !== "" && iibnNumber !== ""){
            fetchPdf();
        }
    }, [userType, iibnNumber]);

    const pdfBlob = new Blob([new Uint8Array(atob(pdfData).split('').map(char => char.charCodeAt(0)))], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(pdfBlob);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'Counterparty-assessment-report.pdf';
        link.click();
    };

    return (
        <div className={styles.parentDiv}>
            <Header />
            {
                !pdfData
                ? <div className="my-5 py-5 d-flex flex-column justify-content-center align-items-center">
                        <ClockLoader color="#36d7b7" /><br></br>
                        <p className={styles.pleaseWaitText}>{t("please-wait-report")}</p>
                    </div>
                    // @ts-ignore
                : <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                    <div
                        style={{
                            height: '750px',
                            width: '100%',
                        }}>
                        <button className="ms-5 mb-3 border border-danger p-2 rounded" onClick={handleDownload}>
                            <FontAwesomeIcon
                                icon={faFilePdf} style={{color: "#dc3545",}} size="xl" />
                            <span className="text-danger ms-2">{t("download-pdf")}</span>
                        </button>
                        <Viewer fileUrl={pdfUrl} />
                    </div>
                  </Worker>
            }
            <Footer />
        </div>
    );
};

export default CounterPartyAssessmentReportPage;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    return { props: { baseUrl: process.env.BASE_URL } };
};
