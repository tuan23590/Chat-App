import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import { Avatar, Box, Typography } from "@mui/material";
import ChatInput from "./ChatInput";
import ChatContent from "./ChatContent";
import { AuthContext } from "../../context/AuthProvider";
import { APICreateRoom, APIGetRoom } from "./../../utils/RoomUtil";
import { APIGetMessages } from "../../utils/MessageUtils";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

export default function ChatWindows() {
  const dataRoom = useLoaderData();
  const roomId = useLocation().pathname.split("/")[2];
  const [selectedUser, setSelectedUser] = useState([]);
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    setMessages([]);
    setSelectedUser([]);
  }, [roomId]);
  const createRoom = async () => {
    const formData = {
      uid: [user.uid, ...selectedUser.map((user) => user.uid)],
      messages: JSON.stringify(messages),
    };
    const res = await APICreateRoom(formData);
    if (!res) {
      alert("Tạo phòng chat thất bại");
    } else navigate(`/ListChat/${res.id}`);
  };
  useEffect(() => {
    if (selectedUser.length > 0) {
      createRoom();
    }
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
        {roomId == "newChat" ? (
          <Header setSelectedUser={setSelectedUser} selectedUser={selectedUser} />
        ) : (
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
                {dataRoom?.name || (dataRoom?.listUser.find((u) => u.uid !== user.uid)?.name)}
              </Typography>
              <Typography>
                {dataRoom?.listUser[1]?.status || "Đang hoạt động"}
              </Typography>
            </Box>
          </Box>
        )}
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
        />
      </Box>
    </Box>
  );
}
