import React, { useState } from "react";
import Image from "next/image";
import { Box, Button, Typography } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CustomModal from "../../General/CustomModal/CustomModal";
import CustomAlert from "../../General/CustomAlert/CustomAlert";

const TopBar = ({ props, getDepartmentDocumentList }: any) => {
  const { t } = useTranslation("account-settings");
  const [departmentName, setDepartmentName] = useState("");
  const [customModalData, setCustomModalData] = useState<any>({
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

  const createContent = () => (
    <>
      <label
        htmlFor="department"
        style={{
          fontWeight: 500,
          fontSize: "14px",
          color: "#768F97",
          lineHeight: "22px",
          marginBottom: "10px",
          fontFamily: "Mulish",
        }}
      >
        {t("department-name")}
      </label>
      <input
        type="text"
        id="department"
        name="department"
        value={departmentName}
        placeholder={t("department-name")}
        onChange={(e) => setDepartmentName(e.target.value)}
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

  async function createDepartment() {
    const { email, token } = props;
    try {
      const response = await fetch(`/api/document-department`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          token,
          operation_type: 2,
          department_name: departmentName,
        }),
      });

      if (response.status === 200) {
        setDepartmentName("");
        getDepartmentDocumentList();
        setCustomModalData((prev: any) => ({
          ...prev,
          desc: "",
          title: "",
          btnText: "",
          actionType: "",
          open: !prev.open,
        })),
          setAlertBox((prev: any) => ({
            ...prev,
            isOpen: true,
            type: "success",
            title: t("created"),
            text: t("department-created-successfully"),
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
  }

  const handleDocumentActionPerform = () => {
    switch (customModalData.actionType) {
      case "create":
        createDepartment();
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

  return (
    <Box
      sx={{
        py: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "14px",
          color: "#072027",
          lineHeight: "22px",
          fontFamily: "Mulish",
        }}
      >
        {t("departments")}
      </Typography>

      <Box sx={{ width: "63%" }}>
        <Box
          sx={{
            gap: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              gap: "10px",
              width: "50%",
              display: "flex",
              padding: "12px 7px",
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
              placeholder={`${t("search")}...`}
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
            <Image
              width={16}
              height={16}
              alt="slider"
              src="img/general/slider.svg"
            />
          </Box>
          <Button
            startIcon={<AddOutlinedIcon />}
            onClick={() =>
              setCustomModalData((prev: any) => ({
                ...prev,
                open: true,
                btnText: t("create"),
                actionType: "create",
                desc: t("new-department"),
                title: t("create-department"),
              }))
            }
            sx={{
              height: "42px",
              fontWeight: 700,
              fontSize: "14px",
              color: "#FFFFFF",
              lineHeight: "22px",
              padding: "6px 16px",
              borderRadius: "25px",
              fontFamily: "Mulish",
              background: "#339F5E",
              textTransform: "capitalize",
              ":hover": { background: "#339F5E" },
            }}
          >
            {t("create-department")}
          </Button>
        </Box>
      </Box>

      <CustomModal
        show={customModalData.open}
        title={customModalData.title}
        description={customModalData.desc}
        actionBtnText={customModalData.btnText}
        onActionPerform={handleDocumentActionPerform}
        onCancel={() => {
          setDepartmentName("");
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
          : customModalData.actionType === "filter" && null}
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
