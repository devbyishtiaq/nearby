import React from "react";
import UserComment from "../UserComment/UserComment";

import styles from "./RegisterImg.module.css";

const RegisterImg: React.FC = () => {
  return (
    <div className={styles.img__container}>
      <img alt="PC" src="/img/register/pc.png" className={styles.pc__image} />
      <UserComment />
    </div>
  );
};

export default RegisterImg;
