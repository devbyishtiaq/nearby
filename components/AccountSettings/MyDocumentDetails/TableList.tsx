import React, { useState } from "react";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/router";
import { StyledTableCell } from "./style";
import useTranslation from "next-translate/useTranslation";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Pagination from "../../General/pagination/Pagination";
import CustomMenuList from "../../General/menuList/MenuList";
import CustomAlert from "../../General/CustomAlert/CustomAlert";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";

const TableList = ({
  data,
  value,
  props,
  searchType,
  deleteFolder,
  handleChangePage,
}: any) => {
  const router = useRouter();
  const { t } = useTranslation("account-settings");
  const [fileList, setFileList] = useState<any>([]);
  const [openFolderId, setOpenFolderId] = useState<number | null>(null);
  const [alertBox, setAlertBox] = useState({
    type: "",
    text: "",
    title: "",
    isOpen: false,
  });

  const actions = [
    {
      action: "download",
      text: t("download"),
      icon: "/img/general/download-cloud.svg",
    },
    { icon: "/img/general/trash.svg", text: t("delete"), action: "delete" },
  ];

  const FolderDetails = ({ folder }: any) => (
    <Box sx={{ gap: "10px", display: "flex", alignItems: "center" }}>
      <Image
        width={40}
        height={40}
        alt="folder"
        src="/img/general/folder.svg"
      />
      <Typography
        sx={{
          display: "flex",
          fontWeight: 500,
          fontSize: "14px",
          color: "#324A51",
          lineHeight: "22px",
          fontFamily: "Mulish",
          flexDirection: "column",
          textTransform: "capitalize",
        }}
      >
        {folder?.folder_name}
        <span
          style={{
            fontWeight: 400,
            fontSize: "8px",
            color: "#768F97",
            lineHeight: "12px",
          }}
        >
          {folder?.files?.length} {t("document")}
        </span>
      </Typography>
    </Box>
  );

  const FileDetails = ({ file }: any) => (
    <TableRow
      sx={{ cursor: "pointer" }}
      onClick={() =>
        router.push(`/ready-made-document?document-template=${file?.id}`)
      }
    >
      <StyledTableCell>
        <Box
          sx={{
            pl: "45px",
            gap: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Image
            width={40}
            alt="file"
            height={40}
            src="/img/general/file.svg"
          />
          <Typography
            sx={{
              display: "flex",
              fontWeight: 500,
              fontSize: "14px",
              color: "#324A51",
              lineHeight: "22px",
              alignItems: "center",
              fontFamily: "Mulish",
              flexDirection: "column",
            }}
          >
            {file.document_title}
          </Typography>
        </Box>
      </StyledTableCell>
      <StyledTableCell align="left">
        {dayjs(file?.created_date).format("DD-MM-YYYY")}
      </StyledTableCell>
      <StyledTableCell>
        <Box
          sx={{
            gap: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Image
            width={40}
            height={40}
            alt="signing"
            src={`/img/general/${file?.is_signed_by_owner ? "signed.svg" : "not-signed.svg"}`}
          />
          <Typography
            sx={{
              display: "flex",
              fontWeight: 500,
              fontSize: "14px",
              color: "#324A51",
              lineHeight: "22px",
              alignItems: "center",
              fontFamily: "Mulish",
              flexDirection: "column",
            }}
          >
            {file?.is_signed_by_owner ? t("signed") : t("not-signed")}
          </Typography>
        </Box>
      </StyledTableCell>
      <StyledTableCell align="left">
        <CustomMenuList
          id={file.id}
          options={actions}
          handleTableMenu={handleTableMenu}
        />
      </StyledTableCell>
    </TableRow>
  );

  const handleTableMenu = (id: number, action: string) => {
    if (action === "download") {
      downloadFile(id);
    } else if (action === "delete") {
      deleteFile(id);
    }
  };

  const Row = ({ row }: any) => {
    const isOpen = openFolderId === row.id;
    return (
      <>
        <TableRow>
          <StyledTableCell>
            <Box sx={{ gap: "10px", display: "flex", alignItems: "center" }}>
              <IconButton
                size="small"
                aria-label="expand row"
                onClick={() => {
                  const newOpenFolderId = isOpen ? null : row.id;
                  setOpenFolderId(newOpenFolderId);
                  if (!isOpen) {
                    getFileList(row.id);
                  }
                }}
              >
                {isOpen ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
              </IconButton>
              <FolderDetails folder={row} />
            </Box>
          </StyledTableCell>
          <StyledTableCell align="center">
            {dayjs(row?.added_date).format("DD-MM-YYYY")}
          </StyledTableCell>
          <StyledTableCell align="center">
            <IconButton onClick={() => deleteFolder(row.id)}>
              <Image
                width={20}
                height={20}
                alt="trash"
                src="/img/general/trash.svg"
              />
            </IconButton>
          </StyledTableCell>
        </TableRow>

        <TableRow sx={{ "&:last-child th, &:last-child td": { border: 0 } }}>
          <TableCell sx={{ p: 0, border: "none" }} colSpan={3}>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              <Box>
                <Table size="small" aria-label="purchases">
                  <TableBody>
                    {fileList?.files?.map((file: any) => (
                      <FileDetails key={file.id} file={file} />
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
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

  const deleteFile = async (id: number) => {
    const { email, token } = props;
    const response = await handleApiRequest(`/api/file-delete`, {
      email,
      token,
      document_id: id,
    });
    if (response?.status === 200) {
      getFileList(openFolderId);
      setAlertBox({
        isOpen: true,
        type: "success",
        title: t("deleted"),
        text: t("file-deleted-successfully"),
      });
    }
  };

  const downloadFile = async (fileId: number) => {
    const { email, token } = props;
    const response = await handleApiRequest(`/api/download-document-profile`, {
      email,
      token,
      file_id: fileId,
    });
    const data = await response?.json();
    if (response?.status === 200) {
      const html2pdf = (await import("html2pdf.js")).default;
      const element = document.createElement("div");
      element.innerHTML = data?.data;

      html2pdf()
        .from(element.innerHTML)
        .set({
          margin: 1,
          filename: `file.pdf`,
          html2canvas: { scale: 2 },
          jsPDF: { orientation: "portrait" },
        })
        .save()
        .then(() => {
          document.body.removeChild(element);
        });
    } else {
      setAlertBox({
        isOpen: true,
        type: "danger",
        title: t("error-download"),
        text: t("failed-download"),
      });
    }
  };

  const getFileList = async (folderId: any) => {
    const { email, token } = props;
    const response = await handleApiRequest(`/api/saved-document-list`, {
      email,
      token,
      page: 1,
      search_type: 2,
      document_type: value + 1,
      parent_folder_id: folderId,
    });
    const data = await response?.json();
    if (response?.status === 200) {
      setFileList(data);
    }
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: "none",
        borderRadius: "6px",
        border: "1px solid #F4F4F4",
      }}
    >
      <Table aria-label="collapsible table">
        <TableHead sx={{ background: "#339F5E14" }}>
          <TableRow>
            <StyledTableCell align="left">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "12px",
                    color: "#324A51",
                    lineHeight: "16px",
                    fontFamily: "Mulish",
                    textTransform: "capitalize",
                  }}
                >
                  {t("upload-file")}
                </Typography>
                <IconButton onClick={() => router.push("/ready-made-document")}>
                  <CloudUploadOutlinedIcon sx={{ color: "#339F5E" }} />
                </IconButton>
              </Box>
            </StyledTableCell>
            <StyledTableCell align="center">
              {t("date-of-addition")}
            </StyledTableCell>
            <StyledTableCell align="center">{t("action")}</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.folders?.map((item: any) => <Row key={item.id} row={item} />)}
        </TableBody>
      </Table>
      {data?.total_pages > 0 && (
        <Pagination
          page={data?.page}
          count={data?.total_pages}
          onPageChange={handleChangePage}
        />
      )}
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
    </TableContainer>
  );
};

export default TableList;
