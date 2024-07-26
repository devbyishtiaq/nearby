import {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import Sidebar from "../components/AIKAGeneral/Sidebar/Sidebar";
import Topbar from "../components/AIKAGeneral/Topbar/Topbar";
import Footer from "../components/General/Footer/Footer";
import Breadcrumbs from "../components/AIKAGeneral/Breadcrumbs/Breadcrumbs";
import ResponseHeader from "../components/GovernmentResponse/ResponseHeader/ResponseHeader";
import ResponseCategories from "../components/GovernmentResponse/ResponseCategories/ResponseCategories";
import ResponseArticles from "../components/GovernmentResponse/ResponseArticles/ResponseArticles";
import { useRouter } from "next/router";
import { useSidebar } from '../components/Context/SidebarContext';

import useTranslation from "next-translate/useTranslation";
import styles from "../styles/government-body-responses.module.css";

const GovernmentResponse: NextPage = (props: any) => {
  const { t } = useTranslation("common");
  const { sidebarHidden, setSidebarHidden } = useSidebar();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [articles, setArticles] = useState<any>([]);
  const [totalPagination, setTotalPagination] = useState<number>(0);
  const [activePage, setActivePage] = useState<number>(1);
  const [activeCategorySlug, setActiveCategorySlug] =
    useState<string>("labor");
  const [searchKeyword, setSearchKeyword] = useState<any>(null);

  async function getArticles() {
    setIsLoading(true);
    const token = props.token;

    console.log("Fetching articles with params:", {
      token,
      activeCategorySlug,
      searchKeyword,
      activePage,
    });

    try {
      let apiUrl = "/api/government-response-filter";
      if (searchKeyword && searchKeyword != ""){
        apiUrl = "/api/government-response/government-response-filter-post"
      }
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          activeCategorySlug,
          searchKeyword,
          activePage,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      console.log("Fetched articles:", data);

      setArticles(data.data);
      setTotalPagination(data.total_paginations);
      setIsLoading(false);
    } catch (error: any) {
      console.error("Error:", error.message);
      setIsLoading(false);
      return null;
    }
  }

  useEffect(() => {
    setActivePage(1);
    setTotalPagination(0);
  }, [activeCategorySlug]);

  useEffect(() => {
    if (activeCategorySlug !== "") {
      router.push(`government-body-responses?category=${activeCategorySlug}`);
      getArticles();
    }
  }, [activeCategorySlug, activePage]);

  useEffect(() => {
    router.push(`government-body-responses?category=${activeCategorySlug}`);
  }, []);

  useEffect(() => {
      if (router.query.query){
        console.log(router.query.query)
        setSearchKeyword(router.query.query);
      }
  }, [router.query.query]);

  useEffect(() => {
    getArticles();
  }, [searchKeyword])

  const urls = [
    {
      urlName: t(
        "database-of-responses-from-government-bodies-of-the-republic-of-kazakhstan",
      ),
      urlLink: "/government-body-responses",
    },
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
          <div className={styles.governmentResponseContainer}>
            <ResponseHeader />
            <div className="row">
              <div className={searchKeyword ? "d-none" : "col-12 col-md-3"}>
                  <ResponseCategories
                    activeCategorySlug={activeCategorySlug}
                    setActiveCategorySlug={setActiveCategorySlug}
                  />
              </div>
              <div className={searchKeyword ? "col-12" : "col-12 col-md-9"}>
                <ResponseArticles
                  articleList={articles}
                  totalPagination={totalPagination}
                  activePage={activePage}
                  setActivePage={setActivePage}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GovernmentResponse;

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
