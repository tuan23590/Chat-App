import {
  Avatar,
  Box,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { AuthContext } from "./../../context/AuthProvider";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { APIDeleteMessage } from "../../utils/MessageUtils";
import { FORMAT_TIME } from "../../function";
import HtmlTooltip from './../HtmlTooltip';

export default function ChatContent({ listMessage, setListMessage }) {
  const [anchorEl, setAnchorEl] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const {
    user: { uid },
  } = useContext(AuthContext);
  const handleDeleteMessage = () => {
    const res = APIDeleteMessage(selectedMessage.id);
    if (!res) alert("Xóa tin nhắn không thành công");
    setListMessage(
      listMessage.map((message) => {
        if (message.id === selectedMessage.id) {
          return { ...message, isDeleted: true, content: "" };
        }
        return message;
      })
    );
    handleClose();
  };
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
            key={message.id}
            sx={{
              display: "flex",
              justifyContent:
                message.sender.uid === uid ? "flex-end" : "flex-start",
              alignItems: "center",
              marginY: 0.2,
              "&:hover .more-icon": {
                opacity: 1,
              },
            }}
          >
            <Box sx={{ width: 25, height: 25, marginX: 1 }}>
              {message.sender.uid == uid ||
              message.sender.uid ==
                listMessage[index + 1]?.sender.uid ? null : (
                <Avatar
                  src={message.sender.photoURL}
                  sx={{ width: "100%", height: "100%" }}
                />
              )}
            </Box>
            {message.sender.uid == uid && (
              <>
              
              <MoreHorizIcon
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
                onClick={(e) => {
                  setAnchorEl(e.currentTarget);
                  setSelectedMessage(message);
                }}
              />
              <Box mr={1}>
              {message.seen?.length == message.receiver?.length ? <DoneAllIcon fontSize="small" /> : <DoneIcon fontSize="small" />} 
              </Box>
              </>
            )}
            <HtmlTooltip 
              title={
                <React.Fragment>
                  <Typography color="inherit">{FORMAT_TIME(message.createdAt)}</Typography>
                </React.Fragment>
              }
            >
            <Box
              sx={{
                maxWidth: "70%",
                paddingY: 1,
                paddingX: 2,
                borderRadius:
                  message.sender.uid == uid
                    ? message.sender.uid !== listMessage[index + 1]?.sender.uid
                      ? message.sender.uid !==
                        listMessage[index - 1]?.sender.uid
                        ? "30px 30px 30px 30px"
                        : "30px 0px 30px 30px"
                      : message.sender.uid !==
                          listMessage[index - 1]?.sender.uid ||
                        message.sender.uid !==
                          listMessage[index + 1]?.sender.uid
                      ? "30px 30px 0px 30px"
                      : "30px 0px 0px 30px"
                    : message.sender.uid === listMessage[index + 1]?.sender.uid
                    ? message.sender.uid === listMessage[index - 1]?.sender.uid
                      ? "0px 30px 30px 0px"
                      : "30px 30px 30px 0px"
                    : message.sender.uid ===
                        listMessage[index - 1]?.sender.uid ||
                      message.sender.uid === listMessage[index + 1]?.sender.uid
                    ? "0px 30px 30px 30px"
                    : "30px 30px 30px 30px",
                backgroundColor: message.isDeleted ? "" : message.sender.uid === uid ? "primary.main" : "grey.300",
                border: message.isDeleted ? "1px solid black" : "none",
                color: message.isDeleted ? "black" : message.sender.uid === uid ? "white" : "black",
              }}
            >
              <Typography variant="body1">{message.isDeleted ? "Tin nhắn đã bị xóa": message.content }</Typography>
            </Box>
            </HtmlTooltip>
            {message.sender.uid !== uid && (
              <>
              <Box ml={1}>
              {message.seen?.length == message.receiver?.length ? <DoneAllIcon fontSize="small" /> : <DoneIcon fontSize="small" />}
              </Box>
              <MoreHorizIcon
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
                onClick={(e) => {
                  setAnchorEl(e.currentTarget);
                  setSelectedMessage(message);
                }}
              />
              </>
            )}
          </Box>
      ))}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {selectedMessage?.sender.uid === uid && selectedMessage?.isDeleted === false && (
          <>
          <MenuItem onClick={handleDeleteMessage}>Xóa tin nhắn</MenuItem>
          <MenuItem onClick={null}>Chỉnh sửa tin nhắn</MenuItem>
          </>
        )}
      </Menu>
    </Box>
  );
}
