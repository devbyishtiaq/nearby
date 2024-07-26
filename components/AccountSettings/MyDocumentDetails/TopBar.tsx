import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CustomModal from "../../General/CustomModal/CustomModal";
import CustomAlert from "../../General/CustomAlert/CustomAlert";
const TableList = dynamic(() => import("./TableList"), { ssr: false });
import { Box, Button, IconButton, Tab, Tabs, Typography } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box pt={2}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const TopBar = ({ props }: any) => {
  const inputRef = useRef<any>(null);
  const [value, setValue] = useState(0);
  const { t } = useTranslation("account-settings");
  const searchDebounceTimerRef = useRef<any>(null);
  const [folderName, setFolderName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<any>("");
  const [folderList, setFolderList] = useState<any>([]);
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
    actionType: "",
  });

  const createContent = () => (
    <>
      <label
        htmlFor="folder"
        style={{
          fontWeight: 500,
          fontSize: "14px",
          color: "#768F97",
          lineHeight: "22px",
          marginBottom: "10px",
          fontFamily: "Mulish",
        }}
      >
        {t("folder-name")}
      </label>
      <input
        id="folder"
        type="text"
        name="folder"
        value={folderName}
        placeholder={t("folder-name")}
        onChange={(e) => setFolderName(e.target.value)}
        style={{
          width: "100%",
          outline: "none",
          fontWeight: 400,
          fontSize: "16px",
          color: "#000000",
          lineHeight: "24px",
          borderRadius: "8px",
          padding: "10px 14px",
          fontFamily: "Mulish",
          border: "1px solid #F4F4F4",
        }}
      />
    </>
  );

  const filterContent = () => (
    <Box>
      <Box
        onClick={() => setSearchType(1)}
        sx={{
          p: 2,
          cursor: "pointer",
          borderRadius: "6px",
          backgroundColor: searchType === 1 ? "#339f5e14" : "transparent",
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
          {t("search-by-folders")}
        </Typography>
      </Box>
      <Box
        onClick={() => setSearchType(2)}
        sx={{
          p: 2,
          cursor: "pointer",
          borderRadius: "6px",
          backgroundColor: searchType === 2 ? "#339f5e14" : "transparent",
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
          {t("search-by-files")}
        </Typography>
      </Box>
    </Box>
  );

  const handleChangePage = (event: any, newPage: any) => {
    fetchDocuments(newPage);
  };

  const handleApiRequest = async (url: string, body: any) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });
      return response;
    } catch (error) {
      setAlertBox({
        isOpen: true,
        type: "danger",
        text: t("went-wrong"),
        title: t("network-error"),
      });
    }
  };

  const fetchDocuments = async (newPage?: any) => {
    const { email, token } = props;
    const response: any = await handleApiRequest(`/api/saved-document-list`, {
      email,
      token,
      page: newPage || 1,
      document_type: value + 1,
      search_type: searchType || 1,
      keyword: searchType ? searchQuery : "",
    });
    const data = await response.json();
    if (response.status === 200) {
      setFolderList(data);
    }
  };

  const deleteFolder = async (id: number) => {
    const { token } = props;
    const response: any = await handleApiRequest(`/api/folder-delete`, {
      token,
      folder_id: id,
    });

    if (response.status === 200) {
      fetchDocuments();
      setAlertBox((prev: any) => ({
        ...prev,
        isOpen: true,
        type: "success",
        title: t("deleted"),
        text: t("deleted-successfully"),
      }));
    }
  };

  const createFolder = async () => {
    const { token } = props;
    const response: any = await handleApiRequest(`/api/folder-create`, {
      token,
      folder_type: value + 1,
      folder_name: folderName,
    });

    if (response.status === 200) {
      fetchDocuments();
      setFolderName("");
      setCustomModalData((prev: any) => ({
        ...prev,
        desc: "",
        title: "",
        btnText: "",
        open: false,
        actionType: "",
      })),
        setAlertBox((prev: any) => ({
          ...prev,
          isOpen: true,
          type: "success",
          title: t("created"),
          text: t("created-successfully"),
        }));
    }
  };

  const handleDocumentActionPerform = () => {
    switch (customModalData.actionType) {
      case "create":
        createFolder();
        break;
      case "filter":
        setCustomModalData((prev: any) => ({
          ...prev,
          desc: "",
          title: "",
          btnText: "",
          actionType: "",
          open: !prev.open,
        }));
        break;
      default:
        console.log("Unknown action");
    }
  };

  useEffect(() => {
    if (searchQuery) {
      clearTimeout(searchDebounceTimerRef.current);
      searchDebounceTimerRef.current = setTimeout(fetchDocuments, 1000);
    } else {
      fetchDocuments();
    }
    return () => clearTimeout(searchDebounceTimerRef.current);
  }, [searchQuery, value]);

  return (
    <Box sx={{ pt: 3 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Tabs
          value={value}
          aria-label="basic tabs example"
          onChange={(event: React.SyntheticEvent, newValue: number) => {
            setSearchType("");
            setValue(newValue);
            setSearchQuery("");
            inputRef.current.value = null;
          }}
          sx={{
            ".MuiTabs-indicator": { display: "none" },
            ".MuiTabs-flexContainer": {
              gap: "20px",
            },
            ".MuiTab-root": {
              fontWeight: 500,
              color: "#536C73",
              fontSize: "14px",
              minHeight: "38px",
              lineHeight: "22px",
              padding: "8px 9px",
              borderRadius: "8px",
              fontFamily: "Mulish",
              textTransform: "capitalize",
            },
            ".Mui-selected": {
              fontWeight: 700,
              background: "#339F5E08",
              color: "#072027 !important",
            },
          }}
        >
          <Tab label={t("incoming-documents")} {...a11yProps(0)} />
          <Tab label={t("outgoing-documents")} {...a11yProps(1)} />
        </Tabs>
        <Box
          sx={{
            gap: 1,
            width: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              gap: "10px",
              width: "63%",
              display: "flex",
              padding: "3px 12px",
              borderRadius: "8px",
              alignItems: "center",
              background: "#339F5E08",
              border: "1px solid #EFEFEF",
            }}
          >
            <Image
              width={16}
              height={16}
              alt="search"
              src="img/general/search.svg"
            />
            <input
              type="text"
              ref={inputRef}
              placeholder={`${t("search")}...`}
              onChange={() =>
                setSearchQuery(inputRef.current.value.toLowerCase())
              }
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                fontWeight: 500,
                fontSize: "12px",
                color: "#768F97",
                lineHeight: "16px",
                fontFamily: "Mulish",
              }}
            />
            <IconButton
              onClick={() =>
                setCustomModalData((prev: any) => ({
                  ...prev,
                  desc: "",
                  open: true,
                  title: t("filter"),
                  btnText: t("search"),
                  actionType: "filter",
                }))
              }
            >
              <Image
                width={16}
                height={16}
                alt="slider"
                src="img/general/slider.svg"
              />
            </IconButton>
          </Box>
          <Button
            startIcon={<AddOutlinedIcon />}
            onClick={() =>
              setCustomModalData((prev: any) => ({
                ...prev,
                open: true,
                btnText: t("create"),
                actionType: "create",
                title: t("create-folder"),
                desc: t("create-a-new-folder"),
              }))
            }
            sx={{
              width: "150px",
              height: "42px",
              fontWeight: 700,
              fontSize: "14px",
              color: "#FFFFFF",
              lineHeight: "22px",
              whiteSpace: "nowrap",
              borderRadius: "25px",
              fontFamily: "Mulish",
              background: "#339F5E",
              textTransform: "capitalize",
              ":hover": { background: "#339F5E" },
            }}
          >
            {t("create-folder")}
          </Button>
        </Box>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <TableList
          value={value}
          props={props}
          data={folderList}
          deleteFolder={deleteFolder}
          handleChangePage={handleChangePage}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TableList
          value={value}
          props={props}
          data={folderList}
          deleteFolder={deleteFolder}
          handleChangePage={handleChangePage}
        />
      </CustomTabPanel>

      <CustomModal
        show={customModalData.open}
        title={customModalData.title}
        description={customModalData.desc}
        actionBtnText={customModalData.btnText}
        onActionPerform={handleDocumentActionPerform}
        onCancel={() => {
          setSearchType("");
          setFolderName("");
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
        {customModalData.actionType === "create"
          ? createContent()
          : customModalData.actionType === "filter" && filterContent()}
      </CustomModal>

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
    </Box>
  );
};

export default TopBar;
