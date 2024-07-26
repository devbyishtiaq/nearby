import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./JudicialHeader.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface JudicialHeaderProps{
    makeSearch: () => void,
    queryText: string,
    setQueryText: (queryText: string) => void,
}

const JudicialHeader: React.FC<JudicialHeaderProps> = ({ makeSearch, queryText, setQueryText}) => {
    const router = useRouter();

    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            makeSearch();
        }
    }

    return (
        <div className={styles.container}>
            <button onClick={() => router.reload()}>
                <Image src="/img/judicial-acts/judicial-acts.png" width={50} height={50} alt="Judicial Acts" />
            </button>
            <span className={styles.headerText}>Database of Judicial Acts Of Republic of Kazakistan</span>
            <div className={`input-group ${styles.inputGroup}`}>
                <span className={`input-group-text ${styles.inputIcon}`} id="basic-addon1">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </span>
                <input type="text" className={`form-control ${styles.input}`} placeholder="Search"
                    value={queryText} onChange={(e) => setQueryText(e.target.value)}
                    onKeyDown={handleKeyPress} />
            </div>
            <button className={`btn btn-success ${styles.searchButton}`}
                onClick={() => {makeSearch()}}>Search</button>
        </div>
    )
}

export default JudicialHeader;