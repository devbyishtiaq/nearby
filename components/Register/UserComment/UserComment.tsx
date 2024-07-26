import React from "react";
import Rating from "../../General/Rating/Rating";

import useTranslation from "next-translate/useTranslation";
import styles from "./UserComment.module.css";

const UserComment: React.FC = () => {
  const { t } = useTranslation("auth");

  return (
    <div className={styles.comment__container}>
      <div className={styles.avatar__container}>
        <div className={styles.avatar}></div>
        <div className={styles.avatar__name}>
          <p>{t("comment__name")}</p>
          <p>{t("comment__date")}</p>
        </div>
      </div>
      <Rating ratingCount={5} />
      <p>{t("comment")}</p>
    </div>
  );
};

export default UserComment;
