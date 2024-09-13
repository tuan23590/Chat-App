import React, { useContext, useEffect, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import ChatInput from "./ChatInput";
import ChatContent from "./ChatContent";
import { AuthContext } from "../../context/AuthProvider";
import { useLoaderData, useLocation } from "react-router-dom";

export default function ChatWindows() {
  const dataRoom = useLoaderData();
  const roomId = useLocation().pathname.split("/")[2];
  const [selectedUser, setSelectedUser] = useState([]);
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setMessages([]);
    setSelectedUser([]);
  }, [roomId]);
  useEffect(() => {
    const chatContent = document.getElementById("chat-content");
    chatContent.scrollTop = chatContent.scrollHeight;
  }, [messages]);
  useEffect(() => {
    if (dataRoom) {
      setMessages(dataRoom.listMessage || []);
    }
  }, [dataRoom]);
  return (
    <Box height={"99.8%"} sx={{ display: "flex", flexDirection: "column" }}>
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            paddingX: 2,
            ":hover": {
              backgroundColor: "#f1f1f1",
            },
          }}
        >
          <Avatar
            sx={{ marginX: 1 }}
            src={dataRoom?.name || dataRoom?.listUser[1]?.photoURL}
          />
          <Box>
            <Typography variant="h6">
              {dataRoom?.name ||
                dataRoom?.listUser.find((u) => u.uid !== user.uid)?.name}
            </Typography>
            <Typography>
              {dataRoom?.listUser[1]?.status || "Đang hoạt động"}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        id="chat-content"
        border={1}
        sx={{ flexGrow: 1, overflowY: "scroll", height: 2 }}
      >
        <ChatContent messages={messages} setMessages={setMessages} />
      </Box>
      <Box>
        <ChatInput
          messages={messages}
          setMessages={setMessages}
          uid={user?.uid}
          roomId={roomId}
          selectedUser={selectedUser}
        />
      </Box>
    </Box>
  );
}
