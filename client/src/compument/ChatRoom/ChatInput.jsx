import { Box, TextField } from "@mui/material";
import React from "react";
import SendIcon from '@mui/icons-material/Send';

export default function ChatInput({message,setMessage,handleSendMessage}) {
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
        autoFocus 
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
        placeholder="Nhập tin nhắn..."
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
