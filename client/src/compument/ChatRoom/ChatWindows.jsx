import React, { useContext, useEffect, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import ChatInput from "./ChatInput";
import ChatContent from "./ChatContent";
import { AuthContext } from "../../context/AuthProvider";
import { useLoaderData, useLocation } from "react-router-dom";

export default function ChatWindows({selectedUser}) {
  const dataRoom = useLoaderData();
  const [listMessage, setListMessage] = useState([]);
  const [message, setMessage] = useState("");
  const { user } = useContext(AuthContext);

  const handleSendMessage = () => {
    console.log("send message");
  }
  useEffect(() => {
    if (dataRoom) {
      setListMessage(dataRoom.listMessage);
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
        <ChatContent listMessage={listMessage} />
      </Box>
      <Box>
        <ChatInput
        setMessage = {setMessage}
        handleSendMessage = {handleSendMessage}
        message = {message}
        />
      </Box>
    </Box>
  );
}
