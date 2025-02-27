import React from "react";
import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
import { saveAs } from "file-saver";
import htmlToDocx from "html-to-docx";
import { Box, Typography } from "@mui/material";
import styles from "./TextEditorTopMenu.module.css";
import LoaderComponent from "../../General/loader/loader";
import useTranslation from "next-translate/useTranslation";
import CustomModal from "../../General/CustomModal/CustomModal";
import CustomAlert from "../../General/CustomAlert/CustomAlert";
const html2pdf = dynamic(() => import("html2pdf.js"), { ssr: false });

interface TextEditorTopMenuProps {
  email: string;
  token: string;
  documentId: string;
  fileContent: string;
  documentName: string;
  handleSaveDocument: any;
  setFolderId: (folderId: string) => void;
  setDocumentName: (documentName: string) => void;
  setCopyFileContent: (fileContent: string) => void;
  setCopyFileContent2: (fileContent: string) => void;
  setOriginalFileContent: (fileContent: string) => void;
}

const buttonIcons = [
  {
    alt: "Save",
    action: "saveDocument",
    src: "/img/creation-signing/save-02.svg",
  },
  {
    alt: "Share",
    action: "shareDocument",
    src: "/img/creation-signing/share-06.svg",
  },
  {
    alt: "Download",
    action: "downloadDocument",
    src: "/img/creation-signing/download-02.svg",
  },
  {
    alt: "Digital",
    action: "convertToDigital",
    src: "/img/creation-signing/noun-digital.svg",
  },
  {
    alt: "Clock",
    action: "revertChanges",
    src: "/img/creation-signing/clock-rewind.svg",
  },
  {
    alt: "User",
    action: "manageUsers",
    src: "/img/creation-signing/user-01.svg",
  },
];

const TextEditorTopMenu: React.FC<TextEditorTopMenuProps> = ({
  email,
  token,
  documentId,
  fileContent,
  setFolderId,
  documentName,
  setDocumentName,
  handleSaveDocument,
  setCopyFileContent,
  setCopyFileContent2,
  setOriginalFileContent,
}) => {
  const { t } = useTranslation("common");
  const [loading, setLoading] = useState(false);
  const [modalContent, setModalContent] = useState<any>("");
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);
  const [shareDocumentData, setShareDocumentData] = useState({
    email: "",
    letter: "",
  });
  const [alertBox, setAlertBox] = useState({
    type: "",
    text: "",
    title: "",
    isOpen: false,
  });
  const [customModalData, setCustomModalData] = useState({
    desc: "",
    title: "",
    open: false,
    btnText: "",
    actionType: "save",
  });

  const translateOptions = [
    { label: t("to-kazakh"), abbreviation: "kz" },
    { label: t("to-russian"), abbreviation: "ru" },
    { label: t("to-english"), abbreviation: "en" },
  ];

  const aiOptions = [
    { label: t("paraphrase-the-fragment"), value: "1" },
    { label: t("create-a-new-template"), value: "2" },
    { label: t("create-a-quick-review"), value: "3" },
  ];

  const getFolderData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/get-saved-document-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setModalContent(getFolderContent(data.folders));
        setCustomModalData((prev: any) => ({
          ...prev,
          open: true,
          btnText: t("save"),
          actionType: "save",
          title: t("save-document"),
          desc: t("folder-to-save-document"),
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
    setLoading(false);
  };

  async function getDepartmentDocumentList() {
    try {
      setLoading(true);
      const response = await fetch(`/api/document-department`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          token,
          operation_type: 1,
        }),
      });

      const data = await response.json();
      if (response.status === 200) {
        setModalContent(getDepartmentList(data?.data));
        setCustomModalData((prev: any) => ({
          ...prev,
          open: true,
          btnText: t("confirm"),
          actionType: "getDepartment",
          title: t("select-department"),
          desc: t("depart-to-get-folders"),
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
    setLoading(false);
  }

  const translateDocument = async (targetLanguage: String) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/document-translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          token,
          documentContent: fileContent,
          targetLanguage: targetLanguage,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setCopyFileContent(data?.new_document_content);
        setCopyFileContent2(data?.new_document_content);
        setOriginalFileContent(data?.new_document_content);
      } else {
        setAlertBox((prev: any) => ({
          ...prev,
          isOpen: true,
          type: "warning",
          text: t("error-translation"),
          title: t("translation-failed"),
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
    setLoading(false);
  };

  const aiDocumentGenerator = async (value: String) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/document-ai-generator`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          token,
          methodType: value,
          documentContent: fileContent,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setCopyFileContent(data?.new_document_content);
      } else {
        setAlertBox((prev: any) => ({
          ...prev,
          isOpen: true,
          type: "warning",
          text: t("error-ai"),
          title: t("ai-failed"),
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
    setLoading(false);
  };

  const getProfileDetails = async () => {
    try {
      const response = await fetch("/api/profile/get-profile-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, token }),
      });

      const data = await response.json();

      if (response.status === 200) {
        if (data?.user_type === 1) {
          getDepartmentDocumentList();
        } else if (data?.user_type === 2) {
          getFolderData();
        }
      }
    } catch (error: any) {
      setAlertBox((prev: any) => ({
        ...prev,
        isOpen: true,
        type: "danger",
        text: t("went-wrong"),
        title: t("network-error"),
      }));
    }
  };

  const saveDocument = () => {
    if (!documentName) {
      setAlertBox((prev: any) => ({
        ...prev,
        isOpen: true,
        type: "warning",
        title: t("couldn't-save"),
        text: t("put-document-name-first"),
      }));
      return;
    }
    documentId ? handleSaveDocument() : getProfileDetails();
  };

  const shareDocument = () => {
    if (!documentId) {
      setAlertBox((prev: any) => ({
        ...prev,
        isOpen: true,
        type: "warning",
        title: t("couldn't-share"),
        text: t("save-document-first"),
      }));
    } else {
      setCustomModalData((prev: any) => ({
        ...prev,
        open: true,
        btnText: t("share"),
        actionType: "share",
        title: t("share-document"),
        desc: t("email-to-share-cover-letter"),
      }));
      setModalContent(getShareDocumentContent());
    }
  };

  const downloadDocument = async () => {
    const blob = await htmlToDocx(fileContent, null, {
      orientation: "portrait",
    });
    saveAs(blob, "download.docx");
  };

  const getDepartmentList = (data: any, selectedId?: number) => {
    return (
      <Box>
        {data?.map((item: any) => (
          <Box
            onClick={() => {
              setSelectedDepartment(item);
              setModalContent(getDepartmentList(data, item.id));
            }}
            sx={{
              p: 2,
              cursor: "pointer",
              borderRadius: "6px",
              backgroundColor:
                selectedId === item.id ? "#339f5e14" : "transparent",
            }}
          >
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: "14px",
                color: "#324A51",
                lineHeight: "22px",
                fontFamily: "Mulish",
              }}
            >
              {item?.department_name}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  };

  const getFolderContent = (folders: any[], selectedFolderId?: string) => {
    return (
      <>
        {folders.map((item: any) => (
          <div
            key={item.id}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setFolderId(item.id);
              setModalContent(getFolderContent(folders, item.id));
            }}
            className={`d-flex align-items-end gap-3 rounded-3 p-2 mb-3 ${
              item.id === selectedFolderId ? styles.selectedFolder : ""
            }`}
          >
            <div className={styles.folder}>
              <Image
                width={20}
                height={20}
                alt="folder"
                src="/img/creation-signing/folder.svg"
              />
            </div>
            <div>
              <p className={styles.folderText}>{item.folder_name}</p>
              <span className={styles.folderSpan}>
                {item.files?.length} {t("document")}
              </span>
            </div>
          </div>
        ))}
      </>
    );
  };

  const getShareDocumentContent = () => {
    return (
      <>
        <div className="mb-2">
          <label htmlFor="email" className={styles.label}>
            {t("email-to-share")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={styles.input}
            onChange={(e) =>
              setShareDocumentData((prev: any) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
        </div>
        <div className="mb-2">
          <label htmlFor="letter" className={styles.label}>
            {t("cover-letter")}
          </label>
          <textarea
            rows={4}
            cols={4}
            id="letter"
            name="letter"
            className={styles.input}
            onChange={(e) =>
              setShareDocumentData((prev: any) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
        </div>
      </>
    );
  };

  const handleShareDocument = async () => {
    try {
      const response = await fetch(`/api/share-document`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          token,
          documentId,
          coverLetter: shareDocumentData.letter,
          sharingEmail: shareDocumentData.email,
        }),
      });

      if (response.status === 200) {
        setCustomModalData((prev: any) => ({
          ...prev,
          desc: "",
          title: "",
          btnText: "",
          actionType: "",
          open: !prev.open,
        }));
        setAlertBox((prev: any) => ({
          ...prev,
          isOpen: true,
          type: "success",
          title: t("document-shared"),
          text: t("shared-successfully"),
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

  const handleButtonClick = (action: string) => {
    switch (action) {
      case "saveDocument":
        saveDocument();
        break;
      case "shareDocument":
        shareDocument();
        break;
      case "downloadDocument":
        downloadDocument();
        break;
      case "convertToDigital":
        break;
      case "revertChanges":
        break;
      case "manageUsers":
        break;
      default:
        console.log("Unknown action");
    }
  };

  const handleDocumentActionPerform = () => {
    switch (customModalData.actionType) {
      case "save":
        handleSaveDocument(() =>
          setCustomModalData((prev: any) => ({
            ...prev,
            desc: "",
            title: "",
            btnText: "",
            actionType: "",
            open: !prev.open,
          })),
        );
        break;
      case "share":
        handleShareDocument();
        break;
      case "getDepartment":
        setModalContent(getFolderContent(selectedDepartment?.incoming_folders));
        setCustomModalData((prev: any) => ({
          ...prev,
          open: true,
          btnText: t("save"),
          actionType: "save",
          title: t("save-document"),
          desc: t("folder-to-save-document"),
        }));
        break;
      default:
        console.log("Unknown action");
    }
  };

  return (
    <>
      <div className="d-flex mb-4 align-items-center gap-2 justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <input
            type="text"
            value={documentName}
            style={{ width: "130px" }}
            placeholder={t("document-name")}
            onChange={(e) => setDocumentName(e.target.value)}
          />
          <Image
            width={20}
            height={20}
            alt="Document sign"
            src="/img/creation-signing/edit.svg"
          />
        </div>

        <div className="d-flex align-items-center gap-2">
          <div className="dropdown">
            <button
              type="button"
              aria-expanded="false"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              className={`${styles.toggleBtn} dropdown-toggle`}
            >
              {t("translate")}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              {translateOptions.map((option) => (
                <li key={option.label} style={{ cursor: "pointer" }}>
                  <span
                    className="dropdown-item"
                    onClick={() => translateDocument(option.abbreviation)}
                  >
                    {option.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="dropdown">
            <button
              type="button"
              aria-expanded="false"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              className={`${styles.toggleBtn} dropdown-toggle`}
            >
              {t("AI")}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              {aiOptions.map((option) => (
                <li key={option.label} style={{ cursor: "pointer" }}>
                  <span
                    className="dropdown-item"
                    onClick={() => aiDocumentGenerator(option.value)}
                  >
                    {option.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {buttonIcons.map((button, index) => (
            <button
              key={index}
              className={`${styles.toggleBtn}`}
              onClick={() => handleButtonClick(button.action)}
            >
              <Image
                src={button.src}
                alt={button.alt}
                width={index === 3 ? 22 : 20}
                height={index === 3 ? 22 : 20}
              />
            </button>
          ))}
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

        <CustomModal
          show={customModalData.open}
          title={customModalData.title}
          description={customModalData.desc}
          actionBtnText={customModalData.btnText}
          onActionPerform={handleDocumentActionPerform}
          onCancel={() => {
            setFolderId("");
            setModalContent("");
            setCustomModalData((prev: any) => ({
              ...prev,
              desc: "",
              title: "",
              btnText: "",
              actionType: "",
              open: !prev.open,
            }));
          }}
        >
          {modalContent}
        </CustomModal>
      </div>
      {loading && <LoaderComponent />}
    </>
  );
};

export default TextEditorTopMenu;
