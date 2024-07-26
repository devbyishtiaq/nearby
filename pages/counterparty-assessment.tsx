import React, { useEffect, useState } from "react";
import { NextPage, GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { getCounterparty } from "../services/getCounterParty";
import Header from "../components/General/Header/Header";
import Footer from "../components/General/Footer/Footer";
import CounterpartyForm from "../components/CounterpartyAssessment/CounterpartyForm/CounterpartyForm";
import CounterpartyDetails from "../components/CounterpartyAssessment/CounterpartyDetails/CounterpartyDetails";

import styles from "../styles/counterpartyAssessment.module.css";

const CounterPartyAssessmentPage: NextPage = (props: any) => {
  const [iibnNumber, setIibnNumber] = useState<string>("");
  const [activeButton, setActiveButton] = useState<string>("company");
  const [demand, setDemand] = useState<string>("");
  const [resultData, setResultData] = useState<any>([]);
  const [searchingStatus, setSearchingStatus] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const makeCounterpartySearch = async (
    user_type: string,
    demand_url: string,
  ) => {
    try {

      setIsLoading(true);
      const companyData = await getCounterparty(
        user_type,
        iibnNumber,
        demand_url,
      );
      setResultData((resultData: any) => [
        ...resultData,
        {
          user_type: activeButton,
          iibnNumber: iibnNumber,
          demand_url: demand_url,
          data: companyData.adata.data,
        },
      ]);
    } catch (error) {
      console.log("Search error.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (demand !== "" && iibnNumber !== "") {
      makeCounterpartySearch(activeButton, demand);
    }
  }, [demand]);

  return (
    <div className={styles.parentDiv}>
      <Header />
      <CounterpartyForm
        iibnNumber={iibnNumber}
        setIibnNumber={setIibnNumber}
        makeCounterpartySearch={makeCounterpartySearch}
        activeButton={activeButton}
        setActiveButton={setActiveButton}
        searchingStatus={searchingStatus}
        setSearchingStatus={setSearchingStatus}
        setResultData={setResultData}
      />
      <CounterpartyDetails
        activeButton={activeButton}
        demand={demand}
        setDemand={setDemand}
        searchingStatus={searchingStatus}
        setSearchingStatus={setSearchingStatus}
        userType={activeButton}
        iibnNumber={iibnNumber}
        resultData={resultData}
        setResultData={setResultData}
        baseUrl={props.baseUrl}
        isLoading={isLoading}
      />
      <Footer />
    </div>
  );
};

export default CounterPartyAssessmentPage;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {

  return { props: { baseUrl: process.env.BASE_URL } };
};