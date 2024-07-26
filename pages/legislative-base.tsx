import {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Sidebar from "../components/AIKAGeneral/Sidebar/Sidebar";
import Topbar from "../components/AIKAGeneral/Topbar/Topbar";
import Footer from "../components/General/Footer/Footer";
import Breadcrumbs from "../components/AIKAGeneral/Breadcrumbs/Breadcrumbs";
import LegislativeHeader from "../components/LegislativeBase/LegislativeHeader/LegislativeHeader";
import Card from "../components/AIKAGeneral/Card/Card";
import DocumentCount from "../components/LegislativeBase/DocumentCount/DocumentCount";
import TaxRates from "../components/LegislativeBase/TaxRates/TaxRates";
import CardWithGreenHeader from "../components/AIKAGeneral/CardWithGreenHeader/CardWithGreenHeader";
import ExchangeRates from "../components/LegislativeBase/ExchangeRates/ExchangeRates";
import BetsRates from "../components/LegislativeBase/BetsRates/BetsRates";
import LastArticles from "../components/LegislativeBase/LastArticles/LastArticles";
import PopularArticles from "../components/LegislativeBase/PopularArticles/PopularArticles";
import ArticleDetail from "../components/LegislativeBase/ArticleDetail/ArticleDetail";
import SearchedArticles from "../components/LegislativeBase/SearchedArticles/SearchedArticles";
import NotesBaseContainer from "../components/LegislativeBase/NotesBaseContainer/NotesBaseContainer";
import SavedLegislationsContainer from "../components/LegislativeBase/SavedLegislationsContainer/SavedLegislationsContainer";
import useTranslation from "next-translate/useTranslation";
import styles from "../styles/legislative-base.module.css";
import { useSidebar } from '../components/Context/SidebarContext';

const LegislativeBase: NextPage = (props: any) => {
  const { t } = useTranslation("legislative-base");
  const [articleId, setArticleId] = useState<any>(null);
  const [articleList, setArticleList] = useState<any>([]);
  const router = useRouter();
  const [queryText, setQueryText] = useState<any>(router.query?.query || null);
  const { sidebarHidden, setSidebarHidden } = useSidebar();

  useEffect(() => {
    const articleId: any = router.query["article-id"];
    const query = router.query["query"] as string | undefined;

    if (articleId) {
      setArticleId(articleId);
    } else {
      setArticleId(null);
    }

    if (query) {
      setQueryText(query);
    } else {
      setQueryText(null);
    }
  }, [router.query]);

  const urls = [
    { urlName: t("legislative-title"), urlLink: "/legislative-base" },
  ];

  return (
    <div>
      <div className="aika-general-container">
        <div className={sidebarHidden ? "col-md-2" : ""}>
          <Sidebar email={props.email}
            username={props.username}
            profilePicture={props.profilePicture}
            baseUrl={props.baseUrl}
            sidebarHidden={sidebarHidden}
            setSidebarHidden={setSidebarHidden} />
        </div>
        <div className={sidebarHidden ? "col-md-10" : "col-12 col-md-12" }>
          <Topbar username={props.username} sidebarHidden={sidebarHidden}
            setSidebarHidden={setSidebarHidden}
             />
          <Breadcrumbs urlList={urls} />
          {articleId ? (
            <div className="row">
              <div className="col-md-12">
                <div className={styles.legislativeContainer}>
                  <ArticleDetail
                    email={props.email}
                    articleId={articleId}
                    token={props.token}
                  />
                </div>
              </div>
            </div>
          ) : queryText ? (
              <div className="row">
                  <div className="col-md-12">
                    <div className={styles.legislativeContainer}>
                        <SearchedArticles queryText={queryText} token={props.token}
                            header={`${queryText}`} />
                    </div>
                  </div>
              </div>
              ) : (
            <div className="row">
              <div className="col-md-8 d-flex justify-content-center">
                <div className={styles.legislativeContainer}>
                  <div>
                    <LegislativeHeader header={t("legislation-database")} />
                    <LastArticles
                      token={props.token || ""}
                      header={t("new-documents")}
                    />
                    <PopularArticles
                      token={props.token || ""}
                      header={t("popular-documents")}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4 d-flex justify-content-center mt-5">
                  <div>
                    <DocumentCount token={props.token} />
                    <NotesBaseContainer
                      token={props.token || ""}
                      header={t("notes")}
                    />
                    <SavedLegislationsContainer
                      email={props.email}
                      token={props.token || ""}
                      header={t("saved-legislations")}
                    />
                    <BetsRates
                      token={props.token || ""}
                      header={t("rates")}
                    />
                    <ExchangeRates
                      cardHeader={t("exchange-rates")}
                      token={props.token || ""}
                    />
                    <TaxRates
                      token={props.token || ""}
                      header={t("tax-rates")}
                    />
                  </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LegislativeBase;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const token: string = context.req.cookies.token || "";
  const decodedToken: any = jwtDecode(token) as {
    userId: string;
    access: string;
    profilePicture: string;
  };
  const accessToken: string = decodedToken["access"] || "";
  const baseUrl: string = process.env.BASE_URL || "";
  const profilePicture: string = decodedToken["profilePicture"] || "";
  return {
    props: {
      email: decodedToken.userId,
      token: accessToken,
      username: decodedToken.username,
      baseUrl: baseUrl,
      profilePicture: profilePicture,
    },
  };
};
