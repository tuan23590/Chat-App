import React, { useContext, useEffect, useState } from "react";
import { Avatar, AvatarGroup, Badge, Box, Typography } from "@mui/material";
import ChatInput from "./ChatInput";
import ChatContent from "./ChatContent";
import { AuthContext } from "../../context/AuthProvider";
import { useLoaderData, useNavigate } from "react-router-dom";
import { APICreateRoom } from "./../../utils/RoomUtil";
import {
  APICreateMessage,
  APINewMessage,
  APISeenMessage,
} from "../../utils/MessageUtils";
import { AppContext } from "../../context/AppProvider";
import StyledBadge from "../StyledBadge ";

export default function ChatWindows({ setOpenRoom }) {
  const dataRoom = useLoaderData();
  const [listMessage, setListMessage] = useState([]);
  const [message, setMessage] = useState("");
  const { user } = useContext(AuthContext);
  const { selectedUser, setSelectedUser } = useContext(AppContext);
  const currentUid = user?.uid;
  const navigate = useNavigate();
  const { data } = APINewMessage(user.uid);

  const createRoom = async () => {
    const formData = {
      message: {
        content: message,
        sender: user.uid,
        type: "text",
      },
      uid: [...selectedUser.map((user) => user.uid)],
      sender: user.uid,
    };
    const res = await APICreateRoom(formData);
    setListMessage([...listMessage, formData.message]);
    setMessage("");
    if (res) {
      setSelectedUser([]);
      navigate(`/${res.id}`);
    }
  };
  const createMessage = async () => {
    if (!message) return;
    const formData = {
      content: message,
      type: "text",
      sender: user.uid,
      roomId: dataRoom.id,
    };
    setMessage("");
    const res = await APICreateMessage(formData);
    if (res) {
      setListMessage([...listMessage, res]);
    }
  };
  const handleSendMessage = async () => {
    if (selectedUser.length) {
      createRoom();
    } else {
      createMessage();
    }
  };
  const handleSeenMessage = async (roomId, userId) => {
    const res = await APISeenMessage(roomId, userId);
    if (!res) {
      alert("Đã xảy ra lỗi khi cập nhật trạng thái tin nhắn");
    }
  };
  useEffect(() => {
    if (dataRoom && user.uid) {
      setListMessage(dataRoom.listMessage);
      handleSeenMessage(dataRoom.id, user.uid);
    }
  }, [dataRoom, user?.uid]);

  useEffect(() => {
    if (
      data &&
      data.newMessage?.room?.id === dataRoom?.id &&
      data.newMessage?.sender?.uid !== user.uid &&
      !listMessage.map((message) => message.id).includes(data.newMessage.id)
    ) {
      handleSeenMessage(dataRoom.id, user.uid);
      setListMessage([...listMessage, data.newMessage]);
    }
  }, [data]);
  useEffect(() => {
    const chatContent = document.getElementById("chat-content");
    chatContent.scrollTop = chatContent.scrollHeight;
  }, [listMessage]);
  return (
    <Box
      height={"100vh"}
      sx={{
        display: "flex",
        flexDirection: "column",
        "@media (max-width: 600px)": {
          height: "92vh",
        },
      }}
    >
      <Box sx={{ padding: 2 }}>
        {selectedUser.length ? (
          <Typography variant="h6" fontWeight={"600"}>
            Tạo tin nhắn mới với:{" "}
            {selectedUser.map((user) => user.name).join(", ")}
          </Typography>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AvatarGroup max={2}>
              {dataRoom?.listUser
                ?.filter((user) => user.uid !== currentUid)
                .map((user) => (
                  <StyledBadge
                    overlap="circular"
                    key={user.uid}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                    invisible={!user.online}
                  >
                    <Avatar alt={user.name} src={user.photoURL} />
                  </StyledBadge>
                ))}
            </AvatarGroup>
            <Typography variant="h6" fontWeight={"600"} noWrap ml={2}>
              {dataRoom.name ||
                dataRoom?.listUser?.filter((user) => user.uid !== currentUid)[0]
                  ?.name}
            </Typography>
          </Box>
        )}
      </Box>
      <Box
        id="chat-content"
        border={1}
        sx={{ flexGrow: 1, overflowY: "scroll", minHeight: 2 }}
      >
        <ChatContent
          listMessage={listMessage}
          setListMessage={setListMessage}
        />
      </Box>
      <Box sx={{ flexShrink: 0 }}>
        <ChatInput
          setMessage={setMessage}
          handleSendMessage={handleSendMessage}
          message={message}
          setOpenRoom={setOpenRoom}
        />
      </Box>
    </Box>
  );
}
