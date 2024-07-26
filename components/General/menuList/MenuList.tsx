import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const TableMenu = ({ id = null, options, handleTableMenu }: any) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Open the menu when the icon button is clicked
  const handleIconButton = (e: any) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  // Handle menu item click
  const handleMenuItem = (e: any, action: string) => {
    setAnchorEl(null);
    e.stopPropagation();
    handleTableMenu(id, action);
  };

  // Close the menu
  const handleCloseMenu = (e: any) => {
    setAnchorEl(null);
    e.stopPropagation();
  };

  return (
    <React.Fragment>
      <IconButton
        aria-haspopup="true"
        onClick={handleIconButton}
        aria-expanded={open ? "true" : undefined}
        aria-controls={open ? "long-menu" : undefined}
      >
        <MoreVertIcon sx={{ color: "#536C73" }} />
      </IconButton>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        // MenuListProps={{ style: { padding: 0 } }}
      >
        {options?.map((option: any, index: number) => (
          <MenuItem
            key={index}
            onClick={(e) => handleMenuItem(e, option.action)}
          >
            {typeof option.icon === "string" ? (
              <img
                alt="icon"
                src={option.icon}
                style={{
                  width: "24px",
                  height: "24px",
                  marginRight: 4,
                  objectFit: "scale-down",
                }}
              />
            ) : (
              React.cloneElement(option.icon, { style: { marginRight: 4 } })
            )}
            <span
              style={{
                fontWeight: 500,
                fontSize: "12px",
                color: " #324A51",
                lineHeight: "16px",
                fontFamily: "Mulish",
              }}
            >
              {option.text}
            </span>
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
};

export default TableMenu;
