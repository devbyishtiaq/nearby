import React from "react";
import dynamic from "next/dynamic";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
const TableList = dynamic(() => import("./TableList"), { ssr: false });

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CTabs = ({
  props,
  value,
  setValue,
  deleteFolder,
  activeDepartment,
}: any) => {
  const { t } = useTranslation("account-settings");
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
        {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <>
      <Typography
        sx={{
          mb: 2,
          fontWeight: 700,
          fontSize: "20px",
          color: "#111111",
          lineHeight: "30px",
          fontFamily: "Mulish",
          textTransform: "capitalize",
        }}
      >
        {activeDepartment?.department_name}
      </Typography>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        sx={{
          ".MuiTabs-indicator": { display: "none" },
          ".MuiTabs-flexContainer": {
            gap: "20px",
            padding: "4px",
            background: "white",
            borderRadius: "8px",
            width: "fit-content",
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
      <CustomTabPanel value={value} index={0}>
        <TableList
          value={value}
          props={props}
          deleteFolder={deleteFolder}
          data={activeDepartment?.incoming_folders}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TableList
          value={value}
          props={props}
          deleteFolder={deleteFolder}
          data={activeDepartment?.outgoing_folders}
        />
      </CustomTabPanel>
    </>
  );
};

export default CTabs;
