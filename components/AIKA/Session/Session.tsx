import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import styles from "./Session.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPen, faTrashCan, faPlus, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { deleteChatGptSession } from "../../../services/deleteChatGptSession";
import { updateSessionTitle } from "../../../services/updateSessionTitle";

interface SessionProps{
    email: string,
    token: string,
    session_id: string,
    session_title: string,
    activeSessionId: string,
    setActiveSessionId: (value: string) => void,
    setActiveSessionName: (value: string | undefined) => void,
}

const Session: React.FC<SessionProps> = ({ email, token, session_id, session_title,
    activeSessionId, setActiveSessionId, setActiveSessionName }) => {
    const router = useRouter();
    const { query } = router;
    const [inEditMode, setInEditMode] = useState<boolean>(false);
    const [sessionTitle, setSessionTitle] = useState<string>(session_title);

    return (
        <div className={`row d-flex align-items-center mb-2 py-2 border-bottom ${activeSessionId === session_id ? styles.activeSessionContainer : null }`}>
            <div className="col-1 ps-3">
                <button onClick={() => {
                    setActiveSessionId(session_id);
                    setActiveSessionName(session_title);
                    }}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="me-2" />
                </button>
            </div>
            <div className="col-8 text-center">
                {
                    !inEditMode
                    ?   <button onClick={() => {
                                setActiveSessionId(session_id);
                                setActiveSessionName(session_title);
                            }} >
                            <span className={`me-2 ${styles.sessionTitleText}`}>{ session_title }</span>
                        </button>
                    :   <div className="d-flex">
                            <input className={`form-control me-2 ${styles.sessionTitleText}`} value={sessionTitle}
                                onChange={(e) => setSessionTitle(e.target.value)} />
                        </div>
                }

            </div>
            <div className="col-1">
                {
                    !inEditMode
                    ?   <button
                            onClick={() => {
                                setInEditMode(!inEditMode);
                                }} >
                            <FontAwesomeIcon icon={faPen} className="me-2" />
                        </button>
                    :   <button
                            onClick={() => {
                                setInEditMode(!inEditMode);
                                updateSessionTitle(email, token, session_id, sessionTitle);
                                router.reload();
                                }} >
                            <FontAwesomeIcon icon={faCircleCheck} className="me-2" />
                        </button>
                }
            </div>
            <div className="col-1">
                <button
                    onClick={() => {
                        deleteChatGptSession(email, token, session_id);
                        router.reload()}}>
                    <FontAwesomeIcon icon={faTrashCan} className="me-2" />
                </button>
            </div>
        </div>
    )
}

export default Session;