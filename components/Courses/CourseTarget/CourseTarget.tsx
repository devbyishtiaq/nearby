import React from "react";

import useTranslation from "next-translate/useTranslation";
import styles from "./CourseTarget.module.css";

const CourseTarget: React.FC = () => {
  const { t } = useTranslation("nearby-courses");

  return (
    <div className="mt-2">
      <h4>{t("target")}</h4>
      <p>{t("goal")}</p>
    </div>
  );
};

export default CourseTarget;
