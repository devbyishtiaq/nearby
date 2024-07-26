import React from "react";
import Image from "next/image";
import Link from "next/link";

import useTranslation from "next-translate/useTranslation";
import styles from "./CourseHeader.module.css";

const CourseHeader: React.FC = () => {
  const { t } = useTranslation("nearby-courses");

  return (
    <div className={styles.container}>
      <div>
        <h4>{t("nearby-courses")}</h4>
        <p>{t("education-for-lawyers")}</p>
      </div>
      <div>
        <Link className={styles.downloadButton} href="/course-documents">
          <Image
            src="/img/general/cloud-download.png"
            width={18}
            height={18}
            alt="Download icon"
          />
          &nbsp;&nbsp;Nearby QLT
        </Link>
      </div>
    </div>
  );
};

export default CourseHeader;
