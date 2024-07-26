import { NextPage } from "next";
import Header from "../components/General/Header/Header";
import InitialArticle from "../components/ExpertOpinions/InitialArticle/InitialArticle";
import TrustMe from "../components/ExpertOpinions/TrustMe/TrustMe";
import Footer from "../components/General/Footer/Footer";

import useTranslation from "next-translate/useTranslation";

const ExpertOpinionsPage: NextPage = () => {
  const { t } = useTranslation("expert-opinions");

  return (
    <>
      <Header />
      <InitialArticle
        articleTitle={t("article__title")}
        articleSubtitle1={t("article__subtitle1")}
        articleDescription1={t("article__description1")}
        articleSubtitle2={t("article__subtitle2")}
        articleDescription2={t("article__description2")}
        articleButton={t("article__button")}
        articleName={t("article__name")}
        articleProfession={t("article__profession")}
      />
      <TrustMe title={t("yt__title")} description={t("yt__description")} />
      <Footer />
    </>
  );
};

export default ExpertOpinionsPage;
