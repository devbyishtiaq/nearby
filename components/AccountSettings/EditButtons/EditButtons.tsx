import React from "react";
import Image from "next/image";
import styles from "./EditButtons.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

interface EditButtonsProps{
    inEditMode: boolean,
    setInEditMode: (value: boolean) => void,
    editUserDetails: () => void,
}

const EditButtons: React.FC<EditButtonsProps> = ({ inEditMode, setInEditMode, editUserDetails }) => {
    return (
        <div className="d-flex align-items-center">
            <button className="btn btn-outline-secondary me-3" onClick={() => setInEditMode(!inEditMode)}>Cancel</button>
            <button className="btn btn-success" onClick={() => editUserDetails()}>
                <FontAwesomeIcon icon={faSave} className="me-2" />
                Save Changes
            </button>
        </div>
    )
}

export default EditButtons;