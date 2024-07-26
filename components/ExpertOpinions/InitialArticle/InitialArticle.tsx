import React from "react";
import Link from "next/link";
import styles from "./InitialArticle.module.css";
import useTranslation from "next-translate/useTranslation";

interface InitialArticleProps {
  articleTitle: string;
  articleSubtitle1: string;
  articleDescription1: string;
  articleSubtitle2: string;
  articleDescription2: string;
  articleButton: string;
  articleName: string;
  articleProfession: string;
}

const InitialArticle: React.FC<InitialArticleProps> = ({
  articleTitle,
  articleSubtitle1,
  articleDescription1,
  articleSubtitle2,
  articleDescription2,
  articleButton,
  articleName,
  articleProfession,
}) => {
    const { t } = useTranslation("expert-opinions");

  return (
    <div className={styles.parentDiv}>
      <div className={styles.initial__container}>
        <h2 className={styles.initial__title}>{t("article__title")}</h2>
        <div className={styles.initial__content}>
          <h5>{t("article__subtitle1")}</h5>
          <p>{t("article__description1")}</p>
          <h5>{t("article__subtitle2")}</h5>
          <p>{t("article__description2")}</p>
        </div>
        <Link href="https://api.siriusai.kz/static/docs/expert-opinion-article.pdf"
            className="button btn__default" target="_blank">
            {t("article__button")}
        </Link>
      </div>
      <div className={styles.initial__imgWrapper}>
        <img src="/img/expert-opinions/lawyer.jpeg" alt="lawyer" />
        <h3>{t("article__name")}</h3>
        <p>{t("article__profession")}</p>
      </div>
    </div>
  );
};

export default InitialArticle;
