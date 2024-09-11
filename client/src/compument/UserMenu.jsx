import React, { useContext, useState } from "react";
import { AuthContext } from "./../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Menu, MenuItem, Typography } from "@mui/material";

export default function UserMenu() {
  const {
    user: { displayName, photoURL, auth },
  } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(false);
  const navigate = useNavigate();
  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(false);
  };
  const handleLogout = () => {
    auth.signOut();
    setAnchorEl(false);
    navigate("/login");
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingY: 2,
          cursor: "pointer",
          ":hover": {
            backgroundColor: "rgba(0,0,0,0.1)",
            borderRadius: "5px",
            transition: "0.5s",
          },
        }}
        onClick={handleOpen}
      >
        <Avatar
          alt="Avatar"
          src={photoURL}
          sx={{ width: "25px", height: "25px", marginRight: "5px" }}
        />
      </Box>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} sx={{
        
      }}>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}
