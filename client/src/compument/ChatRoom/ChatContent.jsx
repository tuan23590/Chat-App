import { Avatar, Box, Menu, MenuItem, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { AuthContext } from "./../../context/AuthProvider";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export default function ChatContent({ listMessage ,setListMessage}) {
  const [anchorEl, setAnchorEl] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const {
    user: { uid },
  } = useContext(AuthContext);
  const handleDeleteMessage = () => {
    setListMessage(listMessage.filter((message) => message.id !== selectedMessage.id));
    handleClose();
  }
  const handleClose = () => {
    setAnchorEl(false);
    setSelectedMessage(null);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        paddingX: 2,
        paddingY: 2,
      }}
    >
      {listMessage.map((message, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            justifyContent: message.sender.uid === uid ? "flex-end" : "flex-start",
            alignItems: "center",
            marginY: 0.2,
            "&:hover .more-icon": {
              opacity: 1,
            },
          }}
        >
          <Box sx={{ width: 25, height: 25, marginX: 1 }}>
            {message.sender.uid == uid ||
            message.sender.uid == listMessage[index + 1]?.sender.uid ? null : (
              <Avatar
                src={message.sender.photoURL}
                sx={{ width: "100%", height: "100%" }}
              />
            )}
          </Box>
          {message.sender.uid == uid && (<MoreHorizIcon
            className="more-icon"
            cursor="pointer"
            sx={{
              width: 35,
              height: 35,
              padding: 1,
              marginX: 1,
              opacity: 0,
              borderRadius: 5,
              ":hover": {
                backgroundColor: "grey.300",
              },
            }}
            onClick={(e) => { setAnchorEl(e.currentTarget); setSelectedMessage(message) }}
          />)}
          <Box
            sx={{
              maxWidth: "70%",
              paddingY: 1,
              paddingX: 2,
              borderRadius:
                message.sender.uid == uid
                  ? message.sender.uid !== listMessage[index + 1]?.sender.uid
                    ? message.sender.uid !== listMessage[index - 1]?.sender.uid
                      ? "30px 30px 30px 30px"
                      : "30px 0px 30px 30px"
                    : message.sender.uid !== listMessage[index - 1]?.sender.uid ||
                      message.sender.uid !== listMessage[index + 1]?.sender.uid
                    ? "30px 30px 0px 30px"
                    : "30px 0px 0px 30px"
                  : message.sender.uid === listMessage[index + 1]?.sender.uid
                  ? message.sender.uid === listMessage[index - 1]?.sender.uid
                    ? "0px 30px 30px 0px"
                    : "30px 30px 30px 0px"
                  : message.sender.uid === listMessage[index - 1]?.sender.uid ||
                    message.sender.uid === listMessage[index + 1]?.sender.uid
                  ? "0px 30px 30px 30px"
                  : "30px 30px 30px 30px",
              backgroundColor:
                message.sender.uid === uid ? "primary.main" : "grey.300",
              color: message.sender.uid === uid ? "white" : "black",
            }}
          >
            <Typography variant="body1">{message.content}</Typography>
          </Box>
          {message.sender.uid !== uid && (<MoreHorizIcon
            className="more-icon"
            cursor="pointer"
            sx={{
              width: 35,
              height: 35,
              padding: 1,
              marginX: 1,
              opacity: 0,
              borderRadius: 5,
              ":hover": {
                backgroundColor: "grey.300",
              },
            }}
            onClick={(e) => { setAnchorEl(e.currentTarget); setSelectedMessage(message) }}
          />)}
        </Box>
      ))}
      <Menu 
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleDeleteMessage}>Delete</MenuItem>
      </Menu>
    </Box>
  );
}
