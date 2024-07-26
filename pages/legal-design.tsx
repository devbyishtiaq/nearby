import { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { sendContactMessage } from "../services/sendContactMessage";

import Header from "../components/General/Header/Header";
import LegalIntro from "../components/LegalDesign/LegalIntro/LegalIntro";
import WhereToUse from "../components/LegalDesign/WhereToUse/WhereToUse";
import Contact from "../components/LegalDesign/Contact/Contact";
import Footer from "../components/General/Footer/Footer";

const legalDesignPage: NextPage = () => {
  const router = useRouter();
  const { locale = "ru" } = router;
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const [alertText, setAlertText] = useState<string>("");
  const [alertShow, setAlertShow] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<string>("success");

  const handleContactSubmit = async () => {
    try {
      const contactResponse = await sendContactMessage(
        username,
        email,
        phone,
        comment,
        "legal-design",
        locale,
      );
      setUsername("");
      setEmail("");
      setPhone("");
      setComment("");

      if(contactResponse["error"]){
        setAlertText(contactResponse["error"]);
        setAlertType("danger");
      } else{
        setAlertText(contactResponse["status"]);
        setAlertType("success");
      }
      setAlertShow(true);
      console.log(contactResponse);
    } catch (error) {
      console.log("error in contact.");
      setAlertText("Please fill the inputs.");
      setAlertType("danger");
      setAlertShow(true);
    }
  };

  return (
    <>
      <Header />
      <LegalIntro />
      <WhereToUse />
      <Contact
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        phone={phone}
        setPhone={setPhone}
        comment={comment}
        setComment={setComment}
        handleContactSubmit={handleContactSubmit}
        alertType={alertType}
        alertText={alertText}
        alertShow={alertShow}
        setAlertShow={setAlertShow}
      />
      <Footer />
    </>
  );
};

export default legalDesignPage;
