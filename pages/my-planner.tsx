import {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
import Sidebar from "../components/AIKAGeneral/Sidebar/Sidebar";
import Footer from "../components/General/Footer/Footer";
import Topbar from "../components/AIKAGeneral/Topbar/Topbar";
import Breadcrumbs from "../components/AIKAGeneral/Breadcrumbs/Breadcrumbs";
import AccountLinks from "../components/AccountSettings/AccountLinks/AccountLinks";
import MyPlannerDetails from "../components/AccountSettings/MyPlannerDetails/MyPlannerDetails";
import { useSidebar } from "../components/Context/SidebarContext";

import useTranslation from "next-translate/useTranslation";
import styles from "../styles/account-settings.module.css";

const MyPlannerPage: NextPage = (props: any) => {
  const { t } = useTranslation("account-settings");
  const router = useRouter();
  const [userType, setUserType] = useState();
  const [noteContent, setNoteContent] = useState<string>("");
  const { sidebarHidden, setSidebarHidden } = useSidebar();

  const urls = [
    { urlName: t("account-settings"), urlLink: "/account-settings" },
    { urlName: t("my-planner"), urlLink: "/my-planner" },
  ];

  const fetchData = async () => {
    try {
      const token = props.token;
      const email = props.email;

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
      setUserType(data["user_type"]);
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
              <MyPlannerDetails
                email={props.email}
                token={props.token}
                noteContent={noteContent}
                setNoteContent={setNoteContent}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyPlannerPage;

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
    },
  };
};
