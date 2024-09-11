import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Avatar, Box, Menu, MenuItem, Typography } from "@mui/material";

export default function UserMenu() {
  const {
    user: { displayName, photoURL, auth },
  } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleLogout = async () => {
    await auth.signOut();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
      <Box onClick={handleClick} sx={{ display: "flex", alignItems: "center", cursor: 'pointer'}}>
        <Typography>{displayName}</Typography>
        <Avatar
          sx={{ width: "30px", height: "30px", marginLeft: 1 }}
          alt={displayName}
          src={photoURL}
        />
      </Box>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}
