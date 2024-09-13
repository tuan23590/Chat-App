import React, { useContext, useState } from "react";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import TextsmsIcon from "@mui/icons-material/Textsms";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import TocIcon from "@mui/icons-material/Toc";
import { Avatar, Box, Typography } from "@mui/material";
import HtmlTooltip from './../HtmlTooltip';
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import UserMenu from './../UserMenu';

export default function ChatBar() {
  const {user:{photoURL}} = useContext(AuthContext);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const path = useLocation().pathname.split("/")[2];
  const chatBarItems = [
    {
      id: 0,
      icon: <ChatBubbleIcon />,
      text: "Chat",
      path: "/ListChat/"+path,
    },
    {
      id: 1,
      icon: <TextsmsIcon />,
      text: "Tin nhắn chờ",
      path: "/Pending/"+path,
    },
    {
      id: 2,
      icon: <Inventory2Icon />,
      text: "Lưu trữ",
      path: "/Archive/"+path,
    },
  ];
  return (
    <Box
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <Box>
        {chatBarItems.map((item, index) => (
          <Box
            py={1.5}
            m={0.7}
            sx={{
              "&:hover": {
                backgroundColor: selectedIndex === index ? "#e0e0e0" : "#f5f5f5",
                borderRadius: "10px",
                cursor: "pointer",
              },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
              opacity: selectedIndex === index ? 1 : 0.6,
              backgroundColor: selectedIndex === index ? "#e0e0e0" : "white",
              transition: "all 0.3s",
            }}
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              navigate(item.path);
              setSelectedIndex(index);
            }}
          >
            <HtmlTooltip title={
              <React.Fragment>
                <Typography color="inherit">{item.text}</Typography>
              </React.Fragment>
            } placement="right">
            {item.icon}
            </HtmlTooltip>
          </Box>
        ))}
      </Box>
      <Box>
        <Box sx={{display: 'flex',justifyContent: 'center',cursor: "pointer", opacity: 0.7, ':hover':{
          backgroundColor: "#f5f5f5",
          borderRadius: "10px",
          opacity: 1
        }}}>
        <UserMenu/>
        </Box>
        <Box
          py={1.5}
          sx={{
            "&:hover": {
              backgroundColor: "#f5f5f5",
              borderRadius: "10px",
              cursor: "pointer",
            },
          }}
        >
          <TocIcon />
        </Box>
      </Box>
    </Box>
  );
}
