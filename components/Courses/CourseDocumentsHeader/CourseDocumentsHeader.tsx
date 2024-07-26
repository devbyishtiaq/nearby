import React from "react";
import Link from "next/link";
import { useRouter  } from "next/router";
import styles from "./CourseDocumentsHeader.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CourseDocumentsHeader: React.FC = () => {
    const router = useRouter();
    return (
        <div className="d-flex align-items-center">
            <button onClick={() => router.back()} className={styles.backButton} >
                <Image src="/img/general/left up.png" width={25} height={25} alt="Back" />
            </button>
            <h4>Nearby Documents</h4>
            <div className="ms-auto">
                <Link className={styles.downloadButton} href="/course-documents">
                    <Image src="/img/general/cloud-download.png" width={18} height={18} alt="Download icon" />
                        &nbsp;&nbsp;Download All
                </Link>
            </div>
        </div>
    );
}


export default CourseDocumentsHeader;