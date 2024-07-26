import { NextPage, GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import { useState } from "react";
import { sendContactMessage } from "../services/sendContactMessage";

import Header from "../components/General/Header/Header";
import WhatIsLegalLab from "../components/LegalLab/WhatIsLegalLab/WhatIsLegalLab";
import WhatWeDo from "../components/LegalLab/WhatWeDo/WhatWeDo";
import Footer from "../components/General/Footer/Footer";
import Benefits from "../components/LegalLab/Benefits/Benefits";
import Internship from "../components/LegalLab/Internship/Internship";
import EventsCalendar from "../components/LegalLab/EventsCalendar/EventsCalendar";

const LegalLabPage: NextPage = (props: any) => {
  const router = useRouter();
  const { locale = "ru" } = router;
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [alertText, setAlertText] = useState<string>("");
  const [alertShow, setAlertShow] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<string>("success");

  const handleContactSubmit = async () => {
    try {
      setLoading(true);
      const contactResponse = await sendContactMessage(
        username,
        email,
        phone,
        "Message from legal-lab",
        "legal-lab",
        locale,
      );
      setUsername("");
      setEmail("");
      setPhone("");
      console.log(contactResponse);
      if (contactResponse["status"]){
          setAlertType("success");
          setAlertText(contactResponse["status"]);
     } else{
         setAlertType("danger");
         setAlertText(contactResponse["error"]);
         }
      setAlertShow(true);
    } catch (error) {
      console.log("error in contact.");
      setAlertText("Please fill the information.");
      setAlertType("danger");
      setAlertShow(true);
    }
    setLoading(false);
  };
  return (
    <>
      <Header />
      <WhatIsLegalLab />
      <WhatWeDo />
      <Benefits
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        phone={phone}
        setPhone={setPhone}
        handleContactSubmit={handleContactSubmit}
        loading={loading}
        alertText={alertText}
        alertShow={alertShow}
        alertType={alertType}
        setAlertShow={setAlertShow}
      />
      <Internship />
      <EventsCalendar baseUrl={props.baseUrl} />
      <Footer />
    </>
  );
};

export default LegalLabPage;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const baseUrl = process.env.BASE_URL || "";
    return { props: { baseUrl: baseUrl } };
  };