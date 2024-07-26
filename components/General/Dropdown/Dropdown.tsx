import React from "react";
import styles from "./Dropdown.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface DropdownProps{
    dropdownLabel: string,
}

const Dropdown: React.FC<DropdownProps> = ({ dropdownLabel }) => {
    return (
        <div className="dropdown">
            <button className={`${styles.dropdownButton}`} type="button" 
                id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                { dropdownLabel }
                <FontAwesomeIcon icon={faChevronDown} />
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a className="dropdown-item" href="#">Select a {dropdownLabel}</a></li>
            </ul>
        </div>
    )
}

export default Dropdown;