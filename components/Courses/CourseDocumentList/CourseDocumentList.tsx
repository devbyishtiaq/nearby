import React from "react";
import Link from "next/link";
import { useRouter  } from "next/router";
import styles from "./CourseDocumentList.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CourseDocumentListProps{
    documentList: any,
    setDocumentList: (documentList: any) => void,
    baseUrl: string;
    downloadFunc: (documentId: string) => void;
    }

const CourseDocumentList: React.FC<CourseDocumentListProps> = ({ documentList, setDocumentList,
    baseUrl, downloadFunc }) => {
    return (
        <div className="m-5">
            {
                documentList.map((document: any, index: any) => {
                    const documentUrl: string = document.document;
                    let documentType: string = "/img/document/file-pdf.png";
                    if (documentUrl.endsWith(".docx")){
                        documentType = "/img/document/word.png";
                    } else if (documentUrl.endsWith(".ppt") || documentUrl.endsWith("pptx")){
                        documentType = "/img/document/powerpoint.png";
                    }
                    return (
                        <div className="d-flex align-items-center gap-2 m-3 border p-2 rounded" key={index}>
                            <Image src={documentType} width={25} height={25} alt="Document" />
                            <span>{document.document_title}</span>
                            <button onClick={() => downloadFunc(document.id)} className="ms-auto me-2">
                                <Image src="/img/general/cloud-download-green.png" width={18} height={15}
                                    alt="Download Document" />
                            </button>
                        </div>
                    );
                })
            }
        </div>
    );
}


export default CourseDocumentList;