import * as React from "react";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useTranslation from "next-translate/useTranslation";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const commonButtonStyles = {
  fontWeight: 700,
  fontSize: "14px",
  color: "#324A51",
  lineHeight: "22px",
  borderRadius: "8px",
  fontFamily: "Mulish",
  textTransform: "capitalize",
  border: "1px solid #F4F4F4",
  ":hover": { background: "transparent" },
};

const theme = createTheme({
  components: {
    MuiPagination: {
      styleOverrides: {
        root: {
          padding: "20px",
          ul: {
            "& li": {
              "&:first-child": {
                marginRight: "auto",
              },

              "&:last-child": {
                marginLeft: "auto",
              },
            },
          },
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          fontSize: "14px",
          color: "#536C73",
          lineHeight: "20px",
          fontFamily: "Inter !important",

          "&.Mui-selected": {
            color: "#339F5E",
            borderRadius: "8px",
            backgroundColor: "#339F5E14",
          },
          "&:hover": {
            borderRadius: "8px",
            background: "transparent",
          },
          "&:focus": {
            borderRadius: "8px",
            background: "transparent",
          },
        },
      },
    },
  },
});

export default function CustomPagination({ page, count, onPageChange }: any) {
  const { t } = useTranslation("account-settings");
  return (
    <ThemeProvider theme={theme}>
      <Pagination
        page={page}
        count={count}
        onChange={onPageChange}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            components={{
              previous: () => (
                <Button
                  startIcon={<ArrowBackIcon />}
                  sx={{ ...commonButtonStyles }}
                >
                  {t("previous")}
                </Button>
              ),
              next: () => (
                <Button
                  endIcon={<ArrowForwardIcon />}
                  sx={{ ...commonButtonStyles }}
                >
                  {t("next")}
                </Button>
              ),
            }}
          />
        )}
      />
    </ThemeProvider>
  );
}
