import {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import styles from "../styles/creation-and-signing.module.css";
import Sidebar from "../components/AIKAGeneral/Sidebar/Sidebar";
import Topbar from "../components/AIKAGeneral/Topbar/Topbar";
import Breadcrumbs from "../components/AIKAGeneral/Breadcrumbs/Breadcrumbs";
import DesignerDocumentList from "../components/CreationAndSigning/DesignerDocumentList/DesignerDocumentList";
import { useSidebar } from "../components/Context/SidebarContext";

const DocumentDesigner: NextPage = (props: any) => {
  const [parentFolders, setParentFolders] = useState<any>([]);
  const { sidebarHidden, setSidebarHidden } = useSidebar();

  async function getParentFolders() {
    const apiUrl = `/api/get-designer-documents`;
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setParentFolders(data);
    } catch (error: any) {
      console.error("Error:", error.message);
      return null;
    }
  }

  useEffect(() => {
    getParentFolders();
  }, []);

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
            { urlName: "Creation/Signing", urlLink: "/creation-and-signing" },
            {
              urlName: "Use the document designer",
              urlLink: "/document-designer",
            },
          ]}
        />
        <div className={styles.creationSigningContainer}>
          <div>
            <DesignerDocumentList parentFolders={parentFolders} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentDesigner;

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
