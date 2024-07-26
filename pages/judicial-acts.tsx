import {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Sidebar from "../components/AIKAGeneral/Sidebar/Sidebar";
import Topbar from "../components/AIKAGeneral/Topbar/Topbar";
import Footer from "../components/General/Footer/Footer";
import Breadcrumbs from "../components/AIKAGeneral/Breadcrumbs/Breadcrumbs";
import JudicialHeader from "../components/JudicialActs/JudicialHeader/JudicialHeader";
import JudicialAdvanced from "../components/JudicialActs/JudicialAdvanced/JudicialAdvanced";
import SearchResultTable from "../components/JudicialActs/SearchResultTable/SearchResultTable";
import { useSidebar } from '../components/Context/SidebarContext';

import useTranslation from "next-translate/useTranslation";
import styles from "../styles/judicial-acts.module.css";

const JudicialActs: NextPage = (props: any) => {
  const { sidebarHidden, setSidebarHidden } = useSidebar();
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentStartPoint, setCurrentStartPoint] = useState<any>(0);
  const [queryText, setQueryText] = useState<any>(null);
  const [cityList, setCityList] = useState<any>([]);
  const [activeCity, setActiveCity] = useState<any>(null);
  const [courtList, setCourtList] = useState<any>([]);
  const [caseCategoryList, setCaseCategoryList] = useState<any>([]);
  const [activeCaseCategory, setActiveCaseCategory] = useState<any>(null);
  const [activeCourt, setActiveCourt] = useState<any>(null);
  const [activeTypeOfProceedings, setActiveTypeOfProceedings] =
    useState<any>(null);
  const [activeInstance, setActiveInstance] = useState<any>(null);
  const [resultList, setResultList] = useState<any>(null);
  const [activeResult, setActiveResult] = useState<any>(null);
  const [caseNumber, setCaseNumber] = useState<any>(null);
  const [caseDate, setCaseDate] = useState<any>(null);
  const [plaintiff, setPlaintiff] = useState<any>(null);
  const [defendant, setDefendant] = useState<any>(null);
  const [lawyer, setLawyer] = useState<any>(null);
  const [activeHeader, setActiveHeader] = useState<any>(null);
  const [sortOrder, setSortOrder] = useState<any>(null);

  const { t } = useTranslation("common");

  async function getCityList() {
    const token: string = props.token;
    try {
      const response = await fetch("/api/judicial-acts/get-city-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setCityList(data.cities);
    } catch (error: any) {
      console.error("Error:", error.message);
      return null;
    }
  }

  async function getCourtList() {
    const token: string = props.token;
    try {
      const response = await fetch("/api/judicial-acts/get-court-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ activeCity, token }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setCourtList(data.courts);
    } catch (error: any) {
      console.error("Error:", error.message);
      return null;
    }
  }

  async function getCaseCategoryList() {
    const token: string = props.token;
    try {
      const response = await fetch("/api/judicial-acts/get-category-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setCaseCategoryList(data.case_categories);
    } catch (error: any) {
      console.error("Error:", error.message);
      return null;
    }
  }

  async function getResultTypeList() {
    const token: string = props.token;
    try {
      const response = await fetch("/api/judicial-acts/get-result-type-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setResultList(data.case_result_types);
    } catch (error: any) {
      console.error("Error:", error.message);
      return null;
    }
  }

  async function makeSearch() {
    setIsSearched(true);
    setIsLoading(true);
    console.log(activeHeader, sortOrder);
    const token: string = props.token;
    try {
      const response = await fetch("/api/judicial-acts/make-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          queryText,
          currentStartPoint,
          activeCity,
          activeCaseCategory,
          activeCourt,
          activeInstance,
          caseNumber,
          caseDate,
          activeResult,
          plaintiff,
          defendant,
          lawyer,
          activeHeader,
          sortOrder,
          token,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      console.log(data);
      setTotalCount(data.numFound);
      console.log(data);
      const docs = data.docs;
      const result = Array.isArray(docs) ? docs : [docs];
      setResult(result);
      setIsLoading(false);
    } catch (error: any) {
      console.error("Error:", error.message);
      setIsLoading(false);
      return null;
    }
  }

  useEffect(() => {
    getCityList();
    getCaseCategoryList();
    getResultTypeList();
  }, []);

  useEffect(() => {
    setActiveCourt(null);
    getCourtList();
  }, [activeCity]);

  const urls = [{ urlName: t("judicial-acts"), urlLink: "/judicial-acts" }];

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
            setSidebarHidden={setSidebarHidden}/>
          <Breadcrumbs urlList={urls} />
          <div className={styles.judicialActsContainer}>
            <div>
              <JudicialHeader
                makeSearch={makeSearch}
                queryText={queryText}
                setQueryText={setQueryText}
              />
              {isSearched ? (
                <SearchResultTable
                  result={result}
                  totalCount={totalCount}
                  currentStartPoint={currentStartPoint}
                  setCurrentStartPoint={setCurrentStartPoint}
                  isLoading={isLoading}
                  makeSearch={makeSearch}
                  activeHeader={activeHeader}
                  setActiveHeader={setActiveHeader}
                  sortOrder={sortOrder}
                  setSortOrder={setSortOrder}
                />
              ) : (
                <JudicialAdvanced
                  cityList={cityList}
                  activeCity={activeCity}
                  setActiveCity={setActiveCity}
                  courtList={courtList}
                  activeCourt={activeCourt}
                  setActiveCourt={setActiveCourt}
                  caseCategoryList={caseCategoryList}
                  setCaseCategoryList={setCaseCategoryList}
                  activeCaseCategory={activeCaseCategory}
                  setActiveCaseCategory={setActiveCaseCategory}
                  activeTypeOfProceedings={activeTypeOfProceedings}
                  setActiveTypeOfProceedings={setActiveTypeOfProceedings}
                  activeInstance={activeInstance}
                  setActiveInstance={setActiveInstance}
                  resultList={resultList}
                  activeResult={activeResult}
                  setActiveResult={setActiveResult}
                  caseNumber={caseNumber}
                  setCaseNumber={setCaseNumber}
                  caseDate={caseDate}
                  setCaseDate={setCaseDate}
                  plaintiff={plaintiff}
                  setPlaintiff={setPlaintiff}
                  defendant={defendant}
                  setDefendant={setDefendant}
                  lawyer={lawyer}
                  setLawyer={setLawyer}
                  makeSearch={makeSearch}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JudicialActs;

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
