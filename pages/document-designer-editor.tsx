import { NextPage, GetServerSideProps, GetServerSidePropsContext } from "next";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getLocalizedFileName } from "../utils/utils";
import Topbar from "../components/AIKAGeneral/Topbar/Topbar";
import styles from "../styles/creation-and-signing.module.css";
import Sidebar from "../components/AIKAGeneral/Sidebar/Sidebar";
import CustomAlert from "../components/General/CustomAlert/CustomAlert";
import Breadcrumbs from "../components/AIKAGeneral/Breadcrumbs/Breadcrumbs";
import { documentGetFileContent } from "../services/documentGetFileContent";
import DesignerEditor from "../components/CreationAndSigning/DesignerEditor/DesignerEditor";
import { useSidebar } from "../components/Context/SidebarContext";
import useTranslation from "next-translate/useTranslation";

const DocumentDesignerEditor: NextPage = (props: any) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const [folderId, setFolderId] = useState("");
  const [documentId, setDocumentId] = useState("");
  const [inputList, setInputList] = useState<any>([]);
  const [fileName, setFileName] = useState<string>("");
  const [documentName, setDocumentName] = useState<string>("");
  const [copyFileContent, setCopyFileContent] = useState<string>("");
  const [parentFolderName, setParentFolderName] = useState<string>("");
  const [secondFolderName, setSecondFolderName] = useState<string>("");
  const [orginialFileContent, setOriginalFileContent] = useState<string>("");
  const { sidebarHidden, setSidebarHidden } = useSidebar();
  const [alertBox, setAlertBox] = useState({
    type: "",
    text: "",
    title: "",
    isOpen: false,
  });

  async function getFileContent(documentTemplate: any) {
    try {
      const data = await documentGetFileContent(documentTemplate);
      setFileName(data.file_name);
      // const updatedInputList = data.input_list.map((input: any) =>
      //   input.replaceAll(" ", "-"),
      // );
      setInputList(data.input_list);
      setCopyFileContent(data.file_content);
      setParentFolderName(data.parent_folder);
      setSecondFolderName(data.second_folder);
      setOriginalFileContent(data.file_content);
    } catch (error: any) {
      console.error("Error:", error.message);
      return null;
    }
  }

  const handleSaveDocument = async (callback?: any) => {
    const { email, token } = props;
    try {
      const response = await fetch(`/api/save-document`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          token,
          folderId,
          documentId,
          documentName,
          fileContent: copyFileContent,
        }),
      });

      const data = await response.json();
      if (response.status === 200) {
        callback && callback();
        setDocumentId(data?.document_id);
        setAlertBox((prev: any) => ({
          ...prev,
          isOpen: true,
          type: "success",
          title: t("document-saved"),
          text: t("saved-successfully"),
        }));
      }
    } catch (error) {
      setAlertBox((prev: any) => ({
        ...prev,
        isOpen: true,
        type: "danger",
        title: t("network-error"),
        text: t("went-wrong"),
      }));
    }
  };

  useEffect(() => {
    if (router.query["document-template"]) {
      const documentTemplate: any = router.query["document-template"];
      getFileContent(documentTemplate);
    }
  }, [router.query]);

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
              urlName: t("document-designer"),
              urlLink: "/document-designer",
            },
            {
              urlLink: "/document-designer",
              urlName: `${getLocalizedFileName(parentFolderName, router.locale)}`,
            },
            {
              urlLink: "/document-designer",
              urlName: `${getLocalizedFileName(secondFolderName, router.locale)}`,
            },
          ]}
        />
        <div className={styles.creationSigningContainer}>
          <div>
            <DesignerEditor
              fileName={fileName}
              email={props.email}
              token={props.token}
              inputList={inputList}
              documentId={documentId}
              setFolderId={setFolderId}
              documentName={documentName}
              setDocumentName={setDocumentName}
              copyFileContent={copyFileContent}
              webSocketUrl={props.webSocketUrl}
              setCopyFileContent={setCopyFileContent}
              handleSaveDocument={handleSaveDocument}
              originalFileContent={orginialFileContent}
              setOriginalFileContent={setOriginalFileContent}
            />
          </div>
        </div>
      </div>
      {alertBox.isOpen && (
        <CustomAlert
          type={alertBox.type}
          text={alertBox.text}
          title={alertBox.title}
          setAlertShow={() =>
            setAlertBox((prev: any) => ({
              ...prev,
              type: "",
              text: "",
              title: "",
              isOpen: !prev.isOpen,
            }))
          }
        />
      )}
    </div>
  );
};

export default DocumentDesignerEditor;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const token: string = context.req.cookies.token || "";
  const decodedToken = jwtDecode(token) as { userId: string; access: string };
  const accessToken = decodedToken["access"];
  // const webSocketUrl = process.env.WEBSOCKET_URL;

  return {
    props: {
      email: decodedToken.userId,
      token: accessToken,
      // webSocketUrl: webSocketUrl,
    },
  };
};
