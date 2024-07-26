import React from "react";
import styles from "./InputNormal.module.css";

interface InputProps{
    inputType: string,
    placeholder: string
}

const Input:React.FC<InputProps> = ({inputType, placeholder}) =>{
    return (
        <input type={inputType} placeholder={placeholder} className={styles.input} />
    )
}

export default Input;