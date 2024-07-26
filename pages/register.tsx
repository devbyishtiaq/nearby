import { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import RegisterInfo from "../components/Register/RegisterInfo/RegisterInfo";
import Header from "../components/General/Header/Header";
import RegisterImg from "../components/Register/RegisterImg/RegisterImg";
import Footer from "../components/General/Footer/Footer";
import AlertBox from "../components/General/AlertBox/AlertBox";
import styles from "../styles/register.module.css";


const RegisterPage: NextPage = () => {
  const router = useRouter();
  const [userType, setUserType] = useState<string>("2");
  const [companyName, setCompanyName] = useState<string>("");
  const [binNumber, setBinNumber] = useState<string>("");
  const [userPosition, setUserPosition] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [alertText, setAlertText] = useState<string>("");
  const [alertShow, setAlertShow] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<string>("success");

  const handleRegister = async () => {
        const { locale } = router;
        try{
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({ companyName, binNumber, userPosition,
                    username, email, password, confirmPassword, userType, locale }),
            });
            const responseText = await response.text();
            const responseJson = JSON.parse(responseText);
            if (response.status === 200) {
                setAlertText(responseJson["status"])
                setAlertType("success");
                setAlertShow(true);
                }
            else {
                setAlertText(responseJson["error"])
                setAlertType("danger");
                setAlertShow(true);
                }
        } catch{
            setAlertText("There is a problem with your internet connection. Please try again.")
            setAlertType("danger");
            setAlertShow(true);
        }

    };

  return (

    <div>
        <div className={styles.parentDiv}>
          <Header isAuth={true} />
          <div className={styles.register__container}>
            <div className={`${styles.register__content}`}>
              <RegisterInfo userType={userType} setUserType={setUserType}
                companyName={companyName} setCompanyName={setCompanyName}
                binNumber={binNumber} setBinNumber={setBinNumber}
                userPosition={userPosition} setUserPosition={setUserPosition}
                username={username} setUsername={setUsername}
                email={email} setEmail={setEmail}
                password={password} setPassword={setPassword}
                confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
                handleRegister={handleRegister} />
              <RegisterImg />
            </div>
          </div>
          {/* <Footer /> */}
          {
            alertShow && (
              <AlertBox
                label={alertText}
                type={alertType}
                setAlertShow={setAlertShow}
              />
            )
          }
        </div>
        <Footer />
    </div>
  );
};

export default RegisterPage;
