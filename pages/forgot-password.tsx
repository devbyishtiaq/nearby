import { NextPage } from "next";
import ForgotPassword from "../components/Register/ForgotPassword/ForgotPassword";
import Header from "../components/General/Header/Header";
import RegisterImg from "../components/Register/RegisterImg/RegisterImg";
import Footer from "../components/General/Footer/Footer";

import styles from "../styles/register.module.css";

const ForgotPasswordPage: NextPage = () => {
  return (
    <div className={styles.parentDiv}>
      <Header isAuth={true} />
      <div className={styles.register__container}>
        <div className={`${styles.register__content}`}>
          <ForgotPassword />
          <RegisterImg />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;
