import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import TextArea from "./TextArea";
import { useRouter } from "next/router";
import TextEditorTopMenu from "./TextEditorTopMenu";
import styles from "./ReadyMadeTextEditor.module.css";
import LoaderComponent from "../../General/loader/loader";
import useTranslation from "next-translate/useTranslation";
import CustomAlert from "../../General/CustomAlert/CustomAlert";

interface DesignerTextEditorProps {
  email: string;
  token: string;
  baseUrl: string;
}

const ReadyMadeTextEditor: React.FC<DesignerTextEditorProps> = ({
  email,
  token,
  baseUrl,
}) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const [folderId, setFolderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [documentId, setDocumentId] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileContent, setFileContent] = useState<string>("");
  const [documentName, setDocumentName] = useState<string>("");
  const [alertBox, setAlertBox] = useState({
    type: "",
    text: "",
    title: "",
    isOpen: false,
  });
  const [padding, setPadding] = useState({
    top: 2.5,
    left: 2.5,
    right: 2.5,
    bottom: 2.5,
  });

  const handleSaveDocument = async (callback?: any) => {
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
          fileContent: fileContent,
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
        text: t("went-wrong"),
        title: t("network-error"),
      }));
    }
  };

  const handleFileUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoading(true);
      try {
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("Authorization", `Token ${token}`);

        const formdata = new FormData();
        formdata.append("file", file);

        const requestOptions: RequestInit = {
          method: "POST",
          body: formdata,
          headers: myHeaders,
        };
        const response = await fetch(
          `${baseUrl}/v1/document/convert-doc-to-html/`,
          requestOptions,
        );
        const responseJson = await response.json();
        setFileContent(responseJson?.html);
      } catch (error) {
        setAlertBox((prev) => ({
          ...prev,
          isOpen: true,
          type: "danger",
          text: t("went-wrong"),
          title: t("network-error"),
        }));
      } finally {
        setLoading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    }
  };

  const getDocumentContent = async (documentTemplate: string) => {
    try {
      const response = await fetch(`/api/get-constructed-document`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          token,
          document_id: documentTemplate,
        }),
      });

      const data = await response.json();
      if (response.status === 200) {
        setFileContent(data?.final_data?.document_content);
        setDocumentName(data?.final_data?.document_title);
      }
    } catch (error) {
      setAlertBox((prev: any) => ({
        ...prev,
        isOpen: true,
        type: "danger",
        text: t("went-wrong"),
        title: t("network-error"),
      }));
    }
  };

  useEffect(() => {
    if (router.query["document-template"]) {
      const documentTemplate: any = router.query["document-template"];
      setDocumentId(documentTemplate);
      getDocumentContent(documentTemplate);
    }
  }, [router.query]);

  return (
    <div className={styles.container}>
      <div className="d-flex mb-3 align-items-center justify-content-between">
        <h3 className="h5">{t("ready-made-document")}</h3>
        <label htmlFor="fileUpload">
          <input
            type="file"
            id="file-input"
            name="fileUpload"
            ref={fileInputRef}
            accept=".doc,.docx,.pdf"
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
          <div
            className={styles.uploadBtn}
            onClick={() => {
              const fileInput = document.getElementById("file-input");
              if (fileInput) {
                fileInput.click();
              }
            }}
          >
            <Image
              width={20}
              height={20}
              alt="Document sign"
              src="/img/creation-signing/upload.svg"
            />
            {t("upload-from-my-documents")}
          </div>
        </label>
      </div>
      <div className={styles.madeDocumentEditor}>
        <TextEditorTopMenu
          email={email}
          token={token}
          documentId={documentId}
          setFolderId={setFolderId}
          fileContent={fileContent}
          documentName={documentName}
          setFileContent={setFileContent}
          setDocumentName={setDocumentName}
          handleSaveDocument={handleSaveDocument}
        />
        <TextArea
          padding={padding}
          setPadding={setPadding}
          fileContent={fileContent}
          setFileContent={setFileContent}
        />
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
      {loading && <LoaderComponent />}
    </div>
  );
};

export default ReadyMadeTextEditor;
