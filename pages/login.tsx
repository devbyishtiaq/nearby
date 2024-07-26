import { NextPage } from "next";
import { useState } from "react";
import LoginInfo from "../components/Register/LoginInfo/LoginInfo";
import Header from "../components/General/Header/Header";
import RegisterImg from "../components/Register/RegisterImg/RegisterImg";
import Footer from "../components/General/Footer/Footer";
import styles from "../styles/register.module.css";

const LoginPage: NextPage = () => {
  const [userType, setUserType] = useState<string>("Individual");

  return (

    <div>
        <div className={styles.parentDiv}>
          <Header isAuth={true} />
          <div className={styles.register__container}>
            <div className={`${styles.register__content}`}>
              <LoginInfo userType={userType} setUserType={setUserType} />
              <RegisterImg />
            </div>
          </div>
        </div>
        <Footer />
    </div>
  );
};

export default LoginPage;
