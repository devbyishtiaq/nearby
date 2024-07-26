import {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
import Sidebar from "../components/AIKAGeneral/Sidebar/Sidebar";
import Footer from "../components/General/Footer/Footer";
import Topbar from "../components/AIKAGeneral/Topbar/Topbar";
import Breadcrumbs from "../components/AIKAGeneral/Breadcrumbs/Breadcrumbs";
import AccountLinks from "../components/AccountSettings/AccountLinks/AccountLinks";
import MyTariffDetails from "../components/AccountSettings/MyTariffDetails/MyTariffDetails";
import { useSidebar } from "../components/Context/SidebarContext";

import useTranslation from "next-translate/useTranslation";
import styles from "../styles/account-settings.module.css";

const MyTariffPage: NextPage = (props: any) => {
  const { t } = useTranslation("account-settings");
  const { sidebarHidden, setSidebarHidden } = useSidebar();
  const email = props.email;
  const token = props.token;
  const router = useRouter();
  const [userType, setUserType] = useState();
  const [isPaidUser, setIsPaidUser] = useState<boolean>(props.isPaid);
  const [telephone, setTelephone] = useState<string>("");
  const [lastPaymentDate, setLastPaymentDate] = useState<string>("");
  const [expirationDate, setExpirationDate] = useState<string>("");
  const [paymentAmount, setPaymentAmount] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  const checkPaymentStatus = async () => {
    try {
      const apiResponse = await fetch("/api/auth/check-payment-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, token }),
      });

      if (!apiResponse.ok) {
        throw new Error(`HTTP error! status: ${apiResponse.status}`);
      }

      const apiResponseJson = await apiResponse.json();
      if (apiResponseJson["isPaid"]) {
        setIsPaidUser(true);
      } else {
        setIsPaidUser(false);
      }
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };

  const cancelSubscription = async () => {
    try {
      const apiResponse = await fetch("/api/auth/cancel-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, token }),
      });

      if (!apiResponse.ok) {
        throw new Error(`HTTP error! status: ${apiResponse.status}`);
      }

      const apiResponseJson = await apiResponse.json();
      router.reload();
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };

  const startSubscription = async () => {
    try {
      console.log("Starting subscription");
      const apiResponse = await fetch("/api/auth/create-payment-view", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!apiResponse.ok) {
        throw new Error(`HTTP error! status: ${apiResponse.status}`);
      }

      const apiResponseJson = await apiResponse.json();
      const redirectUrl = apiResponseJson["pg_redirect_url"];
      router.push(redirectUrl);
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };

  const fetchData = async () => {
    try {
      const token = props.token;

      const apiResponse = await fetch("/api/get-profile-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, token }),
      });

      if (!apiResponse.ok) {
        throw new Error(`HTTP error! status: ${apiResponse.status}`);
      }

      const data = await apiResponse.json();
      setTelephone(data["phone_number"]);
      setUserType(data["user_type"]);
      setExpirationDate(data["payment_expire_date"]);
      setPaymentAmount(data["payment_amount"]);
      setPaymentMethod(data["payment_method"]);
      setLastPaymentDate(data["last_payment_date"]);
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
    checkPaymentStatus();
  }, []);

  const urls = [
    { urlName: t("account-settings"), urlLink: "/account-settings" },
    { urlName: t("my-tariff"), urlLink: "/my-tariff" },
  ];

  return (
    <div>
      <div className="aika-general-container">
        <div className={sidebarHidden ? "col-md-2" : ""}>
          <Sidebar
            email={props.email}
            username={props.username}
            profilePicture={props.profilePicture}
            baseUrl={props.baseUrl}
            sidebarHidden={sidebarHidden}
            setSidebarHidden={setSidebarHidden}
          />
        </div>
        <div className={sidebarHidden ? "col-md-10" : "col-12 col-md-12"}>
          <Topbar
            username={props.username}
            sidebarHidden={sidebarHidden}
            setSidebarHidden={setSidebarHidden}
          />
          <Breadcrumbs urlList={urls} />
          <div className={styles.accountSettingsContainer}>
            <div>
              <AccountLinks userType={userType} />
              <MyTariffDetails
                email={email}
                telephone={telephone}
                paymentAmount={paymentAmount}
                expirationDate={expirationDate}
                paymentMethod={paymentMethod}
                isPaid={isPaidUser}
                startSubscription={startSubscription}
                cancelSubscription={cancelSubscription}
                lastPaymentDate={lastPaymentDate}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyTariffPage;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const token: string = context.req.cookies.token || "";
  const decodedToken: any = jwtDecode(token) as {
    userId: string;
    access: string;
    profilePicture: string;
  };
  const accessToken: string = decodedToken["access"] || "";
  const baseUrl: string = process.env.BASE_URL || "";
  const profilePicture: string = decodedToken["profilePicture"] || "";
  return {
    props: {
      email: decodedToken.userId,
      token: accessToken,
      username: decodedToken.username,
      baseUrl: baseUrl,
      profilePicture: profilePicture,
      isPaid: decodedToken.isPaid,
    },
  };
};
