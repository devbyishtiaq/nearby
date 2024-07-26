import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import styles from "./Message.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPen, faTrashCan, faPlus } from "@fortawesome/free-solid-svg-icons";

interface MessageProps{
    message: any
}

const Message: React.FC<MessageProps> = ({ message }) => {
    return (
    <>
        {
            message.role === "user"
            ? <div className={`${styles.container} m-4 d-flex`}>
                <div className={`${styles.sentMessage} rounded-3 p-2`}>
                    { message.content }
                </div>
            </div>
            : <div className={`${styles.container} m-4 d-flex`}>
                    <div className={`${styles.recievedMessage} rounded-3 p-2`}>
                        { message.content }
                    </div>
                </div>
        }
    </>
        
    )
}

export default Message;