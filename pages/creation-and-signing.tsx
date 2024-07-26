import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import {useState} from "react";
import Sidebar from "../components/AIKAGeneral/Sidebar/Sidebar";
import Topbar from "../components/AIKAGeneral/Topbar/Topbar";
import Breadcrumbs from "../components/AIKAGeneral/Breadcrumbs/Breadcrumbs";
import CreationHeader from "../components/CreationAndSigning/CreationHeader/CreationHeader";
import { useSidebar } from '../components/Context/SidebarContext';

import useTranslation from "next-translate/useTranslation";
import styles from "../styles/creation-and-signing.module.css";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const CreationAndSigning: NextPage = (props: any) => {
  const { t } = useTranslation("common");
  const { sidebarHidden, setSidebarHidden } = useSidebar();

  useEffect(() => {
    const fetchData = async () => {
      const { email, token } = props;
      console.log(props);
      try {
        const response = await fetch("/api/get-saved-document-list", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, token }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchData();
  }, []);
  const urls = [
    { urlName: t("creation-signing"), urlLink: "/creation-and-signing" },
  ];

  return (
    <div className="aika-general-container">
      <div className={sidebarHidden ? "col-md-2" : ""}>
        <Sidebar email={props.email}
            username={props.username}
            profilePicture={props.profilePicture}
            baseUrl={props.baseUrl}
            sidebarHidden={sidebarHidden}
            setSidebarHidden={setSidebarHidden} />
      </div>
      <div className={sidebarHidden ? "col-md-10" : "col-12 col-md-12" }>
        <Topbar username={props.username} sidebarHidden={sidebarHidden}
            setSidebarHidden={setSidebarHidden}
             />
        <Breadcrumbs urlList={urls} />
        <div className={styles.creationSigningContainer}>
          <div>
            <CreationHeader />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreationAndSigning;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const token: string = context.req.cookies.token || "";
  const decodedToken = jwtDecode(token) as { userId: string; access: string };
  const accessToken = decodedToken["access"];

  return { props: { email: decodedToken.userId, token: accessToken } };
};
