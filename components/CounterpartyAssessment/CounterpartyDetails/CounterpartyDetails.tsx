import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import styles from "./CounterpartyDetails.module.css";
import Accordion from 'react-bootstrap/Accordion';
import DemandContainer from "../DemandContainer/DemandContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

interface CounterpartyDetailsProps {
  activeButton: string;
  demand: string;
  setDemand: (value: string) => void;
  searchingStatus: boolean;
  setSearchingStatus: (value: boolean) => void;
  userType: any;
  iibnNumber: any;
  resultData: any;
  setResultData: (resultData: any) => void;
  baseUrl?: string;
  isLoading: boolean;
}

const CounterpartyDetails: React.FC<CounterpartyDetailsProps> = ({
  activeButton, demand, setDemand,
  searchingStatus, setSearchingStatus, userType, iibnNumber,
  resultData, setResultData, baseUrl, isLoading
}) => {
  const router = useRouter();
  const [activeDemandList, setActiveDemandList] = useState<string[]>([]);
  const [currentData, setCurrentData] = useState<any>(null);
  const { t } = useTranslation("counterparty-assessment");

  const request_options: string[] = [
    "basic-info",
    "tax",
    "tax-deduction",
    "tax-deduction-kbk",
    "tax-estimated-wage-fund",
    "tax-company-profit",
    "tax-fines-penalties",
    "tax-market-dynamics",
    "tax-deduction-kbk-line",
    "risk-factor",
    "courtcase",
    "extended-courtcase",
    "trustworthy",
    "trustworthy-plus",
    "founder",
    "beneficiary",
    "trustworthy-analytics",
    "relation",
    "affiliation-mass",
    "director-in-companies",
    "relation-scheme",
    "contract",
    "extended-contract",
    "contract-status",
    "participation-in-purchases",
    "license",
    "extended-license",
    "licenses-certificates",
    "enforcement-debt",
    "report",
    "vat-payer",
    "director-history",
    "founder-history",
    "change-history",
    "company-rating",
    "requisites",
    "company-sanction",
    "designation",
    "registration"
  ];

  const individual_ent_options: string[] = [
    "basic-info",
    "risk-factor",
    "courtcase",
    "trustworthy",
    "trustworthy-plus",
    "relation",
    "affiliation-mass",
    "director-in-companies",
    "relation-scheme",
    "contract",
    "extended-contract",
    "contract-status",
    "participation-in-purchases",
    "license",
    "extended-license",
    "licenses-certificates",
    "enforcement-debt",
    "report",
    "vat-payer",
    "requisites",
    "designation",
    "registration"
  ];

  const individual_request: string[] = [
    "basic-info",
    "trustworthy",
    "affiliation",
    "personal-data",
    "report",
    "court-case",
    "court-case-details"
  ];

  useEffect(() => {
    if (activeButton === "company") {
      setActiveDemandList(request_options);
    } else if (activeButton === "individual-ent") {
      setActiveDemandList(individual_ent_options);
    } else if (activeButton === "individual") {
      setActiveDemandList(individual_request);
    }
  }, [activeButton]);

  useEffect(() => {
    setCurrentData(null);
    resultData.forEach((result: any) => {
      if (result["user_type"] === userType && result["iibnNumber"] === iibnNumber && result["demand_url"] === demand) {
        setCurrentData(result["data"]);
      }
    });
  }, [demand, resultData, userType, iibnNumber]);

  return (
    <div className="row d-flex justify-content-center pb-5">
      <div className="col-md-7">
        {searchingStatus ? (
          <Accordion>
            {activeDemandList.map((currentDemand, index) => (
              <div key={index}>
                <DemandContainer index={index} demand={demand}
                 setDemand={setDemand}
                 currentDemand={currentDemand}
                 data={currentData}
                 resultData={resultData}
                 userType={userType}
                 iibnNumber={iibnNumber}
                 isLoading={isLoading} />
              </div>
            ))}
          </Accordion>
        ) :
          <div>

          </div>
        }
      </div>
      {
        searchingStatus
        ?   <div className="col-md-1 mt-3">
                <Link className={`btn btn-outline-danger`} target="_blank"
                  href={`/counterparty-assessment-report?user-type=${userType}&iibn-number=${iibnNumber}`}>
                  <FontAwesomeIcon icon={faFilePdf} />
                  <span className={styles.downloadPngText}>{t("download-pdf")}</span>
                </Link>
              </div>
        :    <></>
      }

    </div>
  );
};

export default CounterpartyDetails;
