import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
import SendIcon from '@mui/icons-material/Send';

export default function ChatInput({ messages, setMessages,createRoom }) {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    setMessages([...messages, { content: message, sender: "JinhwkRuGYQr0sqPyEy62z7hAZA2",id: messages.length + 1 }]);
    setMessage("");
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Ngăn Enter thêm dòng mới
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
