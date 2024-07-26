import React from 'react';
import styles from "./FromArrayToTable.module.css";
import useTranslation from "next-translate/useTranslation";

interface FromArrayToTableProps {
  data: any[];
  demand: any;
}

const renderObjectAsString = (obj: any): JSX.Element => {
  return (
    <span>
      {Object.keys(obj).map((key, index) => (
        <React.Fragment key={index}>
          <strong>{key}:</strong> {typeof obj[key] === "object" && obj[key] !== null
            ? renderObjectAsString(obj[key])
            : obj[key]}{" "}
        </React.Fragment>
      ))}
    </span>
  );
};

const FromArrayToTable: React.FC<FromArrayToTableProps> = ({ data, demand }) => {
  const columns = data.length > 0 ? Object.keys(data[0]) : [];
  const { t } = useTranslation("counterparty-assessment");
  console.log("from table to array", data)
  return (
      <div className={styles.container}>
        <table className={`table table-hover border p-2 ${styles.tableArray}`}>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th className="p-2" key={index}>{t(column)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {columns.map((column, columnIndex) => (
                  <td key={columnIndex} className="p-2">
                    {typeof item[column] === "string"
                      ? <>{t(item[column])}</>
                      : typeof item[column] === "number"
                        ?   <>{item[column]}</>
                        :   item[column] === null
                            ? <span>-</span>
                            : renderObjectAsString(item[column])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

  );
};

export default FromArrayToTable;
