import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'
import { Box } from '@mui/material'
import ChatInput from './ChatInput';
import ChatContent from './ChatContent';
import { AuthContext } from '../../context/AuthProvider';
import { APICreateRoom } from './../../utils/RoomUtil';

export default function ChatWindows() {
  const [selectedUser, setSelectedUser] = useState([]);
  const [messages, setMessages] = useState([]);
  const {user} = useContext(AuthContext);
  const createRoom = async () => {
    const formData = {
      uid: [
        user.uid,
        ...selectedUser.map((user) => user.uid),
      ],
      messages: JSON.stringify(messages),
    }
    const res = await APICreateRoom(formData);
    if(!res) {
        alert('Tạo phòng chat thất bại');
    }
  }
  useEffect(() => {
    if (selectedUser.length > 0) {
      createRoom();
    }
    const chatContent = document.getElementById("chat-content");
    chatContent.scrollTop = chatContent.scrollHeight;
  }, [messages]);
  return (
    <Box height={'99.8%'} sx={{display: 'flex',flexDirection: 'column',}}>
      <Box>
        <Header selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
      </Box>
      <Box id="chat-content" border={1} sx={{ flexGrow: 1,overflowY: "scroll",
        height: 2}} >
        <ChatContent messages={messages} setMessages={setMessages}/>
      </Box>
      <Box>
        <ChatInput messages={messages} setMessages={setMessages}/>
      </Box>
    </Box>
  )
}
