import React, { useContext, useState } from "react";
import { AuthContext } from "./../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Menu, MenuItem, Typography } from "@mui/material";

export default function UserMenu() {
  const {
    user: { displayName, photoURL, auth,email },
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
        }}
        onClick={handleOpen}
      >
        <Avatar
          alt="Avatar"
          src={photoURL}
          sx={{ width: "35px", height: "35px", marginRight: "5px" }}
        />
      </Box>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} sx={{
        
      }}>
        <MenuItem disabled>{displayName || email}</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}
