import React, { useEffect, useState } from "react";
import Tabs from "./Tabs";
import TopBar from "./TopBar";
import useTranslation from "next-translate/useTranslation";
import CustomMenuList from "../../General/menuList/MenuList";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CustomAlert from "../../General/CustomAlert/CustomAlert";
import CustomModal from "../../General/CustomModal/CustomModal";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import {
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";

const Index = ({ props }: any) => {
  const [value, setValue] = useState(0);
  const { t } = useTranslation("account-settings");
  const [inputValue, setInputValue] = useState("");
  const [departmentsList, setDepartmentsList] = useState([]);
  const [departmentId, setDepartmentId] = useState<any>(null);
  const [activeDepartment, setActiveDepartment] = useState<any>(null);
  const [customModalData, setCustomModalData] = useState({
    desc: "",
    title: "",
    open: false,
    btnText: "",
    actionType: "",
  });
  const [alertBox, setAlertBox] = useState({
    type: "",
    text: "",
    title: "",
    isOpen: false,
  });

  const options = [
    {
      action: "createFolder",
      text: t("create-folder"),
      icon: <AddOutlinedIcon />,
    },
    {
      text: t("rename"),
      action: "rename",
      icon: <DriveFileRenameOutlineIcon />,
    },
    { icon: "/img/general/trash.svg", text: t("delete"), action: "delete" },
  ];

  const inputStyle = {
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
  };

  const renderInputContent = (
    label: string,
    placeholder: string,
    value: string,
  ) => (
    <>
      <label
        htmlFor="input"
        style={{
          fontWeight: 500,
          fontSize: "14px",
          color: "#768F97",
          lineHeight: "22px",
          marginBottom: "10px",
          fontFamily: "Mulish",
        }}
      >
        {label}
      </label>
      <input
        id="input"
        type="text"
        name="input"
        value={value}
        style={inputStyle}
        placeholder={placeholder}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </>
  );

  const handleTableMenu = (id: number, action: string) => {
    if (action === "createFolder" || action === "rename") {
      const modalData = {
        open: true,
        btnText: action === "createFolder" ? t("create") : t("rename"),
        actionType: action === "createFolder" ? "create" : "rename",
        title:
          action === "createFolder"
            ? t("create-folder")
            : t("rename-department"),
        desc:
          action === "createFolder"
            ? t("create-a-new-folder")
            : t("rename-the-department"),
      };
      setDepartmentId(id);
      setCustomModalData(modalData);
      if (action === "rename") {
        const filteredData: any = departmentsList.find(
          (item: any) => item.id === id,
        );
        setInputValue(filteredData?.department_name);
      }
    } else if (action === "delete") {
      deleteDepartment(id);
    }
  };

  const handleDocumentActionPerform = () => {
    const actions: any = {
      create: createFolder,
      rename: renameDepartment,
    };
    actions[customModalData.actionType]?.();
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

  const createFolder = async () => {
    const { token } = props;
    const response = await handleApiRequest("/api/folder-create", {
      token,
      folder_type: value + 1,
      folder_name: inputValue,
      department_id: departmentId,
    });
    if (response?.status === 200) {
      setInputValue("");
      getDepartmentDocumentList();
      setCustomModalData({
        desc: "",
        title: "",
        btnText: "",
        open: false,
        actionType: "",
      });
      setAlertBox({
        isOpen: true,
        type: "success",
        title: t("created"),
        text: t("created-successfully"),
      });
    }
  };

  const deleteFolder = async (id: number) => {
    const { token } = props;
    const response = await handleApiRequest("/api/folder-delete", {
      token,
      folder_id: id,
    });
    if (response?.status === 200) {
      getDepartmentDocumentList();
      setAlertBox({
        isOpen: true,
        type: "success",
        title: t("deleted"),
        text: t("deleted-successfully"),
      });
    }
  };

  const renameDepartment = async () => {
    const { email, token } = props;
    const response = await handleApiRequest("/api/document-department", {
      email,
      token,
      operation_type: 3,
      department_name: inputValue,
      department_id: departmentId,
    });
    if (response?.status === 200) {
      setInputValue("");
      getDepartmentDocumentList();
      setCustomModalData({
        desc: "",
        title: "",
        btnText: "",
        open: false,
        actionType: "",
      });
      setAlertBox({
        isOpen: true,
        type: "success",
        title: t("renamed"),
        text: t("department-renamed-successfully"),
      });
    }
  };

  const deleteDepartment = async (id: number) => {
    const { email, token } = props;
    const response = await handleApiRequest("/api/document-department", {
      email,
      token,
      operation_type: 4,
      department_id: id,
    });
    if (response?.status === 200) {
      getDepartmentDocumentList();
      setAlertBox({
        isOpen: true,
        type: "success",
        title: t("deleted"),
        text: t("department-deleted-successfully"),
      });
    }
  };

  const getDepartmentDocumentList = async () => {
    const { email, token } = props;
    const response: any = await handleApiRequest("/api/document-department", {
      email,
      token,
      operation_type: 1,
    });
    const data = await response.json();
    if (response?.status === 200) {
      setDepartmentsList(data?.data);
      setActiveDepartment(
        data?.data?.find((item: any) => item.id === activeDepartment?.id) ||
          data?.data[0],
      );
    }
  };

  useEffect(() => {
    getDepartmentDocumentList();
  }, []);

  return (
    <div>
      <TopBar
        props={props}
        getDepartmentDocumentList={getDepartmentDocumentList}
      />
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: "25%" }}>
          <List sx={{ p: 0 }}>
            {departmentsList.map((department: any) => (
              <ListItemButton
                key={department.id}
                onClick={() => setActiveDepartment(department)}
                sx={{
                  mb: 2,
                  borderLeft:
                    activeDepartment?.id === department.id
                      ? "4px solid #339F5E"
                      : "none",
                  background:
                    activeDepartment?.id === department.id
                      ? "#339F5E1A"
                      : "transparent",
                  "&:hover": {
                    background:
                      activeDepartment?.id === department.id
                        ? "#339F5E1A"
                        : "transparent",
                  },
                }}
              >
                <ListItemText
                  sx={{
                    m: 0,
                    span: {
                      fontWeight: 700,
                      fontSize: "18px",
                      color: "#111111",
                      lineHeight: "26px",
                      textTransform: "capitalize",
                      fontFamily: "Mulish !important",
                    },
                  }}
                >
                  {department.department_name}
                  <span
                    style={{
                      display: "block",
                      fontWeight: 500,
                      fontSize: "12px",
                      color: "#536C73",
                      lineHeight: "16px",
                      fontFamily: "Mulish",
                    }}
                  >
                    1 {t("document")}
                  </span>
                </ListItemText>
                <IconButton
                  size="small"
                  aria-label="expand row"
                  onClick={(e) => e.stopPropagation()}
                >
                  <CustomMenuList
                    options={options}
                    id={department?.id}
                    handleTableMenu={handleTableMenu}
                  />
                </IconButton>
              </ListItemButton>
            ))}
          </List>
        </Box>
        <Box
          sx={{
            p: 3,
            width: "75%",
            background: "#339F5E1A",
            borderRadius: "0 16px 16px 16px",
          }}
        >
          <Tabs
            props={props}
            value={value}
            setValue={setValue}
            deleteFolder={deleteFolder}
            activeDepartment={activeDepartment}
          />
        </Box>
      </Box>

      <CustomModal
        show={customModalData.open}
        title={customModalData.title}
        description={customModalData.desc}
        actionBtnText={customModalData.btnText}
        onActionPerform={handleDocumentActionPerform}
        onCancel={() => {
          setInputValue("");
          setCustomModalData((prev: any) => ({
            ...prev,
            desc: "",
            title: "",
            btnText: "",
            open: false,
            actionType: "",
          }));
        }}
      >
        {renderInputContent(
          customModalData.actionType === "create"
            ? t("folder-name")
            : t("department-name"),
          customModalData.actionType === "create"
            ? t("enter-folder-name")
            : t("enter-department-name"),
          inputValue,
        )}
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
              isOpen: false,
            }))
          }
        />
      )}
    </div>
  );
};

export default Index;
