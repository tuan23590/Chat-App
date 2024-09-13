import { Box, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import { APICreateMessage, APINewMessage } from "../../utils/MessageUtils";
import { APICreateRoom } from "../../utils/RoomUtil";
import { AuthContext } from './../../context/AuthProvider';
import { useNavigate } from "react-router-dom";

export default function ChatInput({selectedUser, messages, setMessages, roomId }) {
  const [message, setMessage] = useState("");
  const { data, loading, error } = APINewMessage();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSendMessage = async () => {
    if (message.trim() === "") return;
    const formData = {
      content: message,
      type: "text",
      sender: user.uid,
      roomId: roomId
    }
    if (roomId == "newChat") {
      createRoom(formData);
    }else {
      await APICreateMessage(formData);
    }
    setMessage("");
  }

  const createRoom = async (mess) => {
    const formData = {
      uid: [user.uid, ...selectedUser.map((user) => user.uid)],
      messages: JSON.stringify([mess]),
    };
    const res = await APICreateRoom(formData);
    if (!res) {
      alert("Tạo phòng chat thất bại");
    } else navigate(`/ListChat/${res.id}`);
  };

  useEffect(() => {
    console.log(data);
    if (data) {
      setMessages([...messages, data.newMessage]);
    }
  }, [data, loading, error]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 0.5 }}
    >
      <TextField
        size="small"
        fullWidth
        multiline
        maxRows={5}
        InputProps={{
          sx: {
            borderRadius: "25px",
            paddingX: 2,
            paddingBottom: 1.3,
          },
        }}
        onKeyDown={handleKeyDown}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <SendIcon
        fontSize="large"
        sx={{
          marginX: 1,
          cursor: 'pointer',
          padding: 1.5,
          width: 50,
          height: 50,
          ':hover': {
            backgroundColor: 'lightgray',
            borderRadius: '50%',
            color: 'blue'
          }
        }}
        onClick={handleSendMessage}
      />
    </Box>
  );
}
