import { styled } from "@mui/system";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

export const StyledTableCell = styled(TableCell)(({ align }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: "12px",
    color: "#324A51",
    textAlign: align,
    fontWeight: "700",
    lineHeight: "16px",
    fontStyle: "normal",
    padding: "14px 60px",
    whiteSpace: "nowrap",
    borderBottom: "none",
    fontFamily: "Mulish",
    "@media screen and (max-width: 520px)": {
      fontSize: "12px",
    },
  },
  [`&.${tableCellClasses.body}`]: {
    padding: "16px",
    fontWeight: 500,
    fontSize: "14px",
    color: "#324A51",
    textAlign: align,
    lineHeight: "22px",
    whiteSpace: "nowrap",
    fontFamily: "Mulish",
    borderBottom: "1px solid #F4F4F4",
    "@media screen and (max-width: 520px)": {
      fontSize: "12px",
    },
  },
}));
