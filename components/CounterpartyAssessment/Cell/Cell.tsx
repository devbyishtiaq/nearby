import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import FromArrayToTable from "../FromArrayToTable/FromArrayToTable";
import useTranslation from "next-translate/useTranslation";

interface CellProps {
    data: any;
    demand: any;
}

const renderObjectAsString = (obj: any) => {
    return (
        <span>
            {Object.keys(obj).map((objKey, objIndex) => (
                <React.Fragment key={objIndex}>
                    <strong>{objKey}:</strong>{" "}
                    {typeof obj[objKey] === "object" && obj[objKey] !== null
                        ? renderObjectAsString(obj[objKey]) // Recursively render nested object
                        : obj[objKey]}{" "}
                </React.Fragment>
            ))}
        </span>
    );
};

const Cell: React.FC<CellProps> = ({ data, demand }) => {
    const { t } = useTranslation("counterparty-assessment");
    console.log(data, demand, typeof data)
    return (
        <>
            {
                data && data.toString().includes("adata.kz") ? (
                    <></>
                ) : data === "true" || data === true ? (
                    <FontAwesomeIcon icon={faCheck} style={{ color: "#339e5e" }} />
                ) : data === "false" || data === false ? (
                    <FontAwesomeIcon icon={faTimes} style={{ color: "#ff0000" }} />
                ) : Array.isArray(data) && data.length === 0 || data === 0 || data === null ? (
                    <span> - </span>
                ):  Array.isArray(data) && data.length > 0 ? (
                    <FromArrayToTable data={data} demand={demand} />
                ) : typeof data === 'object' && data !== null
                    ? renderObjectAsString(data)
                    : typeof data === "string"
                        ?   <span>{t(data)}</span>
                        :   typeof data === "number"
                            ?   <>{data}</>
                            :   <>{data}</>
            }
        </>
    );
}

export default Cell;
