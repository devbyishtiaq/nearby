import React, { useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import styles from "./DemandContainer.module.css";
import Accordion from 'react-bootstrap/Accordion';
import Cell from "../Cell/Cell";
import dynamic from 'next/dynamic';
import FromArrayToTable from "../FromArrayToTable/FromArrayToTable";
const BarChart = dynamic(() => import('../BarChart/BarChart'), { ssr: false });

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const graphPrepareFunc = (key: any, data: any, title: any) => {
  let labels: any = [];
  let datasets: any = [];
  let chartType: string = "line";
  if (key === "tax_details"){
      labels = data.map((item: any) => item.year);
      datasets = [
        {
          label: 'Tax Deduction',
          data: data.map((item: any) => item.amount),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ];
  } else if (["tax-deduction_tax_dynamics_by_year",
                "tax-deduction_tax_dynamics_by_period",
                "tax-estimated-wage-fund_bar",
                "tax-estimated-wage-fund_line",
                "tax-company-profit",
                "tax-market-dynamics_company",
                "tax-market-dynamics_market"].includes(key)){

      console.log(key, data, title)
      if (data){

          labels = data.map((item: any) => item.year);
          datasets = [
            {
              label: 'Tax Deduction',
              data: data.map((item: any) => item.amount),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
          ];
      }
  } else if (key === "tax-deduction-kbk_line"){
      try{
          console.log(data)
          labels = Array.from(new Set(data.flatMap((item: any) => item.value.map((val: any) => val.year))));
          datasets = data.map((item: any) => ({
            label: item.name,
            data: labels.map((year: any) => {
                const entry = item.value.find((val: any) => val.year === year);
                return entry ? entry.amount : 0;
            }),
            fill: false,
            borderColor: getRandomColor(),
            tension: 0.1
          }));
          console.log(labels, datasets)
      } catch {
        console.log("wating for the data")
      }

  } else if (key === "tax-deduction-kbk_pie"){
      labels = data.map((item: any) => item.bcc_name);
    datasets = [
      {
        label: 'Sum',
        data: data.map((item: any) => item.sum),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ];
    chartType = "pie";
  } else if (key === "tax-fines-penalties") {
      console.log(data)
      labels = data[0].value.map((item: any) => item.year);

      datasets = data.map((item: any) => ({
        label: item.name,
        data: item.value.map((v: any) => v.amount),
        borderColor: getRandomColor(),
        fill: false
      }));
  } else {

  }

  if (datasets.length === 0) {
      <></>
  } else {
      return (
          <>
            <BarChart labels={labels}
                datasets={datasets}
                chartType={chartType}
                title={title} />
          </>
      )
  }

};

interface DemandContainerProps {
  index: number;
  demand: string;
  data: any;
  setDemand: (data: any) => void;
  currentDemand: any;
  resultData: any;
  userType: any;
  iibnNumber: any;
  isLoading: boolean;
}

const DemandContainer: React.FC<DemandContainerProps> = ({
  index,
  demand,
  data,
  setDemand,
  currentDemand,
  resultData,
  userType,
  iibnNumber,
  isLoading
}) => {
  const [localData, setLocalData] = useState<any>(data);
  const { t } = useTranslation("counterparty-assessment");
  const graphFields: string[] = [
      "tax_details",
      "tax-deduction_tax_dynamics_by_year",
      "tax-deduction_tax_dynamics_by_period",
      "tax-deduction-kbk_line",
      "tax-deduction-kbk_pie",
      "tax-estimated-wage-fund_bar",
      "tax-estimated-wage-fund_line",
      "tax-market-dynamics_company",
      "tax-market-dynamics_market",
      "tax-deduction-kbk-line_details"];
  const graphDemand: string[] = [
      "tax-fines-penalties",
      "tax-company-profit"
      ]

  const formatString = (str: string) => {
    return str.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  };

  const handleAccordionClick = () => {
    setDemand(currentDemand);
  };

  useEffect(() => {
    if (resultData) {
      resultData.forEach((item: any) => {
        if (item.user_type === userType && item.iibnNumber === iibnNumber && item.demand_url === currentDemand) {
          setLocalData(item.data);
        }
      });
    }
  }, [resultData, userType, iibnNumber, currentDemand]);

  return (
    <Accordion.Item eventKey={index.toString()} className={`mt-3 ${styles.accordionButton}`}>
      <Accordion.Header onClick={handleAccordionClick}>
        {t(currentDemand)}
      </Accordion.Header>
      <Accordion.Body className="d-flex justify-content-center">
        {isLoading ? (
          <div className="text-center mt-3 mb-3">
            <p className={styles.loadingText}>{t("data-is-loading")}</p>
          </div>
        ) : !localData ? (
          <div className="text-center mt-3 mb-3">
            <p className="text-danger h6">{t("no-data-available")}</p>
          </div>
        ) : (
          <table className="table d-flex align-items-center justify-content-center">
            <tbody>
              {Object.entries(localData).map(([key, value]: [any, any]) => {
                console.log(`${demand}_${key}`, key, value, localData)
                if (typeof key === "string" && (key.toLowerCase().includes("adata.kz") || key.includes("not-show") || (typeof value === "string" && value.toLowerCase().includes("adata.kz")))) {
                  return null;
                } else if (demand === "affiliation") {
                  return (
                    <tr key={key} className={`border-bottom ${styles.smallText}`}>
                      <td className="px-2 py-2">
                        <Cell data={value.name} demand={demand} />
                      </td>
                      <td className="px-2 py-2">
                        <Cell data={value.bin} demand={demand} />
                      </td>
                      <td className="px-2 py-2">
                        <Cell data={value.director} demand={demand} />
                      </td>
                      <td className="px-2 py-2">
                        <Cell data={value.type} demand={demand} />
                      </td>
                    </tr>
                  );
                } else if (demand === "tax-company-profit"){
                    console.log("here", demand, localData, typeof key, value)
                    if (key === "0"){
                        return (
                            <tr key={`${demand}_${key}`}>
                                <FromArrayToTable data={localData} demand={demand} />
                            </tr>
                          );
                    }
                } else if (Array.isArray(value) && graphFields.includes(`${demand}_${key}`)) {
                  return (
                    <tr key={`${demand}_${key}`}>
                      <td colSpan={2}>
                        {graphPrepareFunc(`${demand}_${key}`, value, t(key))}
                      </td>
                    </tr>
                  );
                } else {
                  return (
                    <tr key={key} className="border-bottom">
                      <td className="px-2 py-2">
                        <Cell data={key} demand={demand} />
                      </td>
                      <td className="px-2 py-2">
                        <Cell data={value} demand={demand} />
                      </td>
                    </tr>
                  );
                }
              })}

            </tbody>
          </table>
        )}
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default DemandContainer;
