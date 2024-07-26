import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

interface CardProps{
    cardHeader: string,
    documentsList: string[]
}

const Card: React.FC<CardProps> = ({ cardHeader, documentsList }) => {
    return (
        <div className={styles.container}>
            <div className="d-flex">
                <h5>
                    { cardHeader }
                </h5>
                <FontAwesomeIcon icon={faEllipsisVertical} className={styles.elipsisIcon} />
            </div>
            <div className={`${styles.documents} mt-2`}>
                {documentsList?.map(document => (
                    <Link href="/">
                        <div className="d-flex mb-3">
                            <Image src="/img/general/file-pdf.png" width={15} height={20} alt="File PDF icon" 
                                className="me-3 mt-1" />
                            <span className={`${styles.documentName} me-1`}>{ document }</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Card;