import { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import Header from "../components/General/Header/Header";
import Footer from "../components/General/Footer/Footer";
import AlertBox from "../components/General/AlertBox/AlertBox";
import ChangePasswordInfo from "../components/Register/ChangePasswordInfo/ChangePasswordInfo";
import styles from "../styles/register.module.css";

const ChangePasswordPage: NextPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [alertText, setAlertText] = useState<string>("");
  const [alertShow, setAlertShow] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<string>("success");

  const handleChangePassword = async () => {
        const { locale } = router;
        const token = router.query["token"];

        try{
            const response = await fetch('/api/auth/change-password', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({ email, password, confirmPassword, token, locale }),
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
          <div className="row d-flex justify-content-center">
            <div className="col-12 col-md-8">
                <ChangePasswordInfo
                    email={email} setEmail={setEmail}
                    password={password} setPassword={setPassword}
                    confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
                    handleChangePassword={handleChangePassword} />
            </div>
          </div>

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

export default ChangePasswordPage;
