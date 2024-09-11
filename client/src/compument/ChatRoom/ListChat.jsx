import { Avatar, Box, Grid2, List, TextField, Typography } from "@mui/material";
import React from "react";
import { TIMEAGO } from './../../function/index';

export default function ListChat() {
  const data = [
    {
      id: "1",
      listUser: [
        {
          id: "1",
          name: "Nguyễn Văn A",
          photoURL: "https://material-ui.com/static/images/avatar/1.jpg",
          status: "online",
        },
      ],
      LastMessage: {
        id: "1",
        content: "Chào bạn",
        time: "1726063948000",
        type: "text",
        sender: "1",
        receiver: ["2"],
        seen: ["2"],
      },
    },
    {
      id: "2",
      listUser: [
        {
          id: "1",
          name: "Nguyễn Văn A",
          photoURL: "https://material-ui.com/static/images/avatar/1.jpg",
          status: "online",
        },
        {
          id: "1",
          name: "Nguyễn Văn A",
          photoURL: "https://material-ui.com/static/images/avatar/1.jpg",
          status: "online",
        },
      ],
      LastMessage: {
        id: "1",
        content: "Chào bạn",
        time: "1726063948000",
        type: "text",
        sender: "1",
        receiver: ["2"],
        seen: ["2"],
      },
    },
    {
      id: "3",
      listUser: [
        {
          id: "1",
          name: "Nguyễn Văn A",
          photoURL: "https://material-ui.com/static/images/avatar/1.jpg",
          status: "online",
        },
      ],
      LastMessage: {
        id: "1",
        content: "Chào bạn",
        time: "1726063948000",
        type: "text",
        sender: "1",
        receiver: ["2"],
        seen: ["2"],
      },
    },
  ];
  return (
    <Grid2 container>
      <Grid2 item size={3} borderRight={1} height={"98vh"} p={2}>
        <Typography variant="h5" fontWeight={"600"}>
          Đoạn chat
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Tìm kiếm"
          sx={{ marginY: 1 }}
        />
        {data.map((item, index) => (
          <Box
            key={index}
            sx={{ borderBottom: 1, borderColor: "grey.300", paddingY: 1 }}
          >
            <Grid2 container>
              <Grid2 size={2}>
                {item.listUser.map((user, index) => (
                  <Avatar
                    src={user.photoURL}
                    sx={{ width: "70%", height: "70%" }}
                  />
                ))}
              </Grid2>
              <Grid2 size={9}>
              <Typography variant="h6" fontWeight={"600"}>
                {item.listUser.map((user, index) => (
                  <span key={index}>
                    {user.name}
                    {index < item.listUser.length - 1 && ", "}
                  </span>
                ))}
              </Typography>
              <Typography>{TIMEAGO(item.LastMessage.time)}</Typography>
              <Typography variant="body2" color="grey">
                {item.LastMessage.content}
              </Typography>
              </Grid2>
            </Grid2>
          </Box>
        ))}
      </Grid2>
    </Grid2>
  );
}
