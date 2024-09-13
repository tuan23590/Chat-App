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
  const {data} = APINewMessage(user.uid);
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
    if (data && data.newMessage?.room?.id === dataRoom?.id) {
      setListMessage([...listMessage, data.newMessage]);
    }
  }, [data]);
  useEffect(() => {
    const chatContent = document.getElementById("chat-content");
    chatContent.scrollTop = chatContent.scrollHeight;
  }, [listMessage]);
  return (
    <Box height={"100vh"} sx={{ display: "flex", flexDirection: "column" }}>
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
        sx={{ flexGrow: 1, overflowY: "scroll", minHeight: 2 }}
      >
        <ChatContent
          listMessage={listMessage}
          setListMessage={setListMessage}
        />
      </Box>
      <Box sx={{flexShrink: 0}}>
        <ChatInput
          setMessage={setMessage}
          handleSendMessage={handleSendMessage}
          message={message}
        />
      </Box>
    </Box>
  );
}


// import { Box } from '@mui/material'
// import React from 'react'

// export default function ChatWindows() {
//   return (
//     <Box id='box-0' sx={{height: '900px', display: "flex", flexDirection: "column", border: 3}}>
//     <Box id='box-1' sx={{height: '200px'}}>1</Box>
//     <Box id='box-2' sx={{border: 1, flexGrow: 1, overflowY: 'scroll'}}>
//       <Box id='box-2-1' sx={{height: '900px'}}>2-1</Box>
//       <Box id='box-2-2' sx={{height: '200px'}}>2-2</Box>
//     </Box>
//     <Box id='box-3' sx={{minHeight: '200px', flexShrink: 0}}>3</Box>
//   </Box>  
//   )
// }
