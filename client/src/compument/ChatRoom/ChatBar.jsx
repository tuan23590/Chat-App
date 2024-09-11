import React, { useState } from "react";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import TextsmsIcon from "@mui/icons-material/Textsms";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import TocIcon from "@mui/icons-material/Toc";
import { Box, Typography } from "@mui/material";
import UserMenu from "./../UserMenu";
import HtmlTooltip from './../HtmlTooltip';
import { useNavigate } from "react-router-dom";

export default function ChatBar() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const chatBarItems = [
    {
      id: 0,
      icon: <ChatBubbleIcon />,
      text: "Chat",
      path: "/ListChat",
    },
    {
      id: 1,
      icon: <TextsmsIcon />,
      text: "Tin nhắn chờ",
      path: "/Pending",
    },
    {
      id: 2,
      icon: <Inventory2Icon />,
      text: "Lưu trữ",
      path: "/Archive",
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
        <UserMenu />
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
