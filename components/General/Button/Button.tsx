import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  label: string;
  type: string;
}

const Button: React.FC<ButtonProps> = ({ label, type }) => {
  return (
    <div>
      {type === "submit" ? (
        <input className={styles.buttonStyle} type="submit" value={label} />
      ) : (
        <a className={styles.buttonStyle}>{label}</a>
      )}
    </div>
  );
};

export default Button;
