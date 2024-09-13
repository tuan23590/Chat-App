import React, { useContext, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import ChatInput from "./ChatInput";
import ChatContent from "./ChatContent";
import { AuthContext } from "../../context/AuthProvider";
import { useLoaderData, useNavigate } from "react-router-dom";
import { APICreateRoom } from "./../../utils/RoomUtil";
import { APICreateMessage, APINewMessage } from "../../utils/MessageUtils";

export default function ChatWindows({ setSelectedUser, selectedUser }) {
  const dataRoom = useLoaderData();
  const [listMessage, setListMessage] = useState([]);
  const [message, setMessage] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const {data} = APINewMessage();
  const createRoom = async () => {
    const formData = {
      message: {
        content: message,
        sender: user.uid,
        type: "text",
      },
      uid: [...selectedUser.map((user) => user.uid), user.uid],
    };
    console.log("formData: ", formData);
    const res = await APICreateRoom(formData);
    setListMessage([...listMessage, formData.message]);
    setMessage("");
    if (res) {
      setSelectedUser([]);
      navigate(`/${res.id}`);
    }
  };
  const createMessage = async () => {
    const formData = {
      content: message,
      type: "text",
      sender: user.uid,
      roomId: dataRoom.id,
    };
    const res = await APICreateMessage(formData);
    if (res) {
      setListMessage([...listMessage, res]);
      setMessage("");
    }else{
      alert("Gửi tin nhắn thất bại");
    }
  };
  const handleSendMessage = async () => {
    if (selectedUser) {
      createRoom();
    }else{
      createMessage();
    }
  };
  useEffect(() => {
    if (dataRoom) {
      setListMessage(dataRoom.listMessage);
    }
  }, [dataRoom]);
  useEffect(() => {
    if (data) {
      setListMessage([...listMessage, data.newMessage]);
    }
  }, [data]);
  return (
    <Box height={"99.8%"} sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ padding: 2 }}>
        {selectedUser ? (
          <Typography variant="h6" fontWeight={"600"}>
            Tạo tin nhắn mới với:{" "}
            {selectedUser.map((user) => user.name).join(", ")}
          </Typography>
        ) : (
          <Box>
            <Typography variant="h6" fontWeight={"600"}>
              {dataRoom.name}
            </Typography>
          </Box>
        )}
      </Box>
      <Box
        id="chat-content"
        border={1}
        sx={{ flexGrow: 1, overflowY: "scroll", height: 2 }}
      >
        <ChatContent
          listMessage={listMessage}
          setListMessage={setListMessage}
        />
      </Box>
      <Box>
        <ChatInput
          setMessage={setMessage}
          handleSendMessage={handleSendMessage}
          message={message}
        />
      </Box>
    </Box>
  );
}
