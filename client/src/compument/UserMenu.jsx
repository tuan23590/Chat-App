import React, { useContext, useState } from "react";
import { AuthContext } from "./../context/AuthProvider";
import { Avatar, Box, Menu, MenuItem } from "@mui/material";
import StyledBadge from "./StyledBadge ";

export default function UserMenu() {
  const {
    user: { displayName, photoURL, auth,email },
  } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(false);
  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(false);
  };
  const handleLogout = () => {
    auth.signOut();
    setAnchorEl(false);
    window.location.href = "/login";
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        onClick={handleOpen}
      >
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
          invisible = {false}
        >
        <Avatar
          alt="Avatar"
          src={photoURL}
          sx={{ width: "35px", height: "35px", marginRight: "5px" }}
        />
        </StyledBadge>
      </Box>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} sx={{
        
      }}>
        <MenuItem disabled>{displayName || email}</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}
