import { jwtDecode } from "jwt-decode";
import Topbar from "../components/AIKAGeneral/Topbar/Topbar";
import styles from "../styles/creation-and-signing.module.css";
import Sidebar from "../components/AIKAGeneral/Sidebar/Sidebar";
import Breadcrumbs from "../components/AIKAGeneral/Breadcrumbs/Breadcrumbs";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import ReadyMadeDocumentEditor from "../components/CreationAndSigning/ReadyMadeTextEditor/ReadyMadeTextEditor";
import { useSidebar } from "../components/Context/SidebarContext";
import useTranslation from "next-translate/useTranslation";

const ReadyMadeDocument: NextPage = (props: any) => {
  const { t } = useTranslation("common");
  const { sidebarHidden, setSidebarHidden } = useSidebar();

  return (
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
        <Breadcrumbs
          urlList={[
            {
              urlName: t("creation-signing"),
              urlLink: "/creation-and-signing",
            },
            {
              urlName: t("ready-made-document"),
              urlLink: "/ready-made-document",
            },
          ]}
        />
        <div className={styles.creationSigningContainer}>
          <ReadyMadeDocumentEditor
            email={props.email}
            token={props.token}
            baseUrl={props.baseUrl}
          />
        </div>
      </div>
    </div>
  );
};

export default ReadyMadeDocument;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const token: string = context.req.cookies.token || "";
  const decodedToken = jwtDecode(token) as { userId: string; access: string };
  const accessToken = decodedToken["access"];
  const baseUrl: string = process.env.BASE_URL || "";
  // const webSocketUrl = process.env.WEBSOCKET_URL;

  return {
    props: {
      email: decodedToken.userId,
      token: accessToken,
      baseUrl,
      // webSocketUrl: webSocketUrl,
    },
  };
};
