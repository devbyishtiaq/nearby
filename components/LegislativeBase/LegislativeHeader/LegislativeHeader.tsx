import React from "react";
import styles from "./LegislativeHeader.module.css";

interface LegislativeHeader {
    header: string;
    }

const LegislativeHeader: React.FC<LegislativeHeader> = ({ header }) => {
    return (
        <div className="d-flex p-3">
            <h5>{ header }</h5>
        </div>
    )
}

export default LegislativeHeader;