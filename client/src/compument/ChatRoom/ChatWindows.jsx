import React, { useContext, useEffect, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import ChatInput from "./ChatInput";
import ChatContent from "./ChatContent";
import { AuthContext } from "../../context/AuthProvider";
import { useLoaderData, useNavigate } from "react-router-dom";
import { APICreateRoom } from './../../utils/RoomUtil';

export default function ChatWindows({selectedUser}) {
  const dataRoom = useLoaderData();
  console.log("dataRoom: ",dataRoom);
  const [listMessage, setListMessage] = useState([]);
  const [message, setMessage] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSendMessage = () => {
    const formData = {
      message:{
        content: message,
        sender: user.uid,
        type: "text",
      },
      uid: [...selectedUser.map((user) => user.uid) , user.uid],
    };
    const res = APICreateRoom(formData);
    setListMessage([...listMessage, formData.message]);
    setMessage("");
    if (res) {
      navigate(`/${res.uid}`);
    }
  }
  useEffect(() => {
    if (dataRoom) {
      setListMessage(dataRoom.listMessage);
    }
  }, [dataRoom]);
  return (
    <Box height={"99.8%"} sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{padding: 2}}>
          {selectedUser && (
            <Typography variant="h6" fontWeight={"600"}>Tạo tin nhắn mới với: {selectedUser.map((user) => user.name).join(", ")}</Typography>
          )}
        </Box>
      <Box
        id="chat-content"
        border={1}
        sx={{ flexGrow: 1, overflowY: "scroll", height: 2 }}
      >
        <ChatContent listMessage={listMessage} setListMessage={setListMessage} />
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
