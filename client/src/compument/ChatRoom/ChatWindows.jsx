import React, { useContext, useEffect, useState } from "react";
import { Avatar, AvatarGroup, Box, Typography } from "@mui/material";
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

export default function ChatWindows({
  setSelectedUser,
  selectedUser,
  setOpenRoom,
}) {
  const dataRoom = useLoaderData();
  const [listMessage, setListMessage] = useState([]);
  const [message, setMessage] = useState("");
  const { user } = useContext(AuthContext);
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
    if (selectedUser) {
      createRoom();
    } else {
      createMessage();
    }
  };
  const handleSeenMessage = async (formData) => {
    if (formData.messageId.length) {
      const res = await APISeenMessage(formData);
      if (!res) {
        alert("Đã xảy ra lỗi khi cập nhật trạng thái tin nhắn");
      }
    }
  };
  useEffect(() => {
    if (dataRoom && user.uid) {
      setListMessage(dataRoom.listMessage);
      const formData = {
        messageId: dataRoom.listMessage.filter((message) =>!message.seen.map((user) => user.uid).includes(user.uid)
          ).filter((message) => message.sender.uid !== user.uid).map((message) => message.id),
        userId: user.uid,
      };
      handleSeenMessage(formData);
    }
  }, [dataRoom, user?.uid]);

  useEffect(() => {
    if (
      data &&
      data.newMessage?.room?.id === dataRoom?.id &&
      data.newMessage?.sender?.uid !== user.uid &&
      !listMessage.map((message) => message.id).includes(data.newMessage.id)
    ) {
      const formData = {
        messageId: [data.newMessage.id],
        userId: user.uid,
      };
      handleSeenMessage(formData);
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
        {selectedUser ? (
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
                  <Avatar key={user.uid} alt={user.name} src={user.photoURL} />
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
