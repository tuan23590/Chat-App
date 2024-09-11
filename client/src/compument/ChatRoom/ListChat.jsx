import { Avatar, Box, Grid2, List, TextField, Typography } from "@mui/material";
import React from "react";

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
            <Box>
              <Box width={100}>
                {item.listUser.map((user, index) => (
                  <Avatar
                    src={user.photoURL}
                    sx={{ width: "25%", height: "25%" }}
                  />
                ))}
              </Box>
              <Typography variant="h6" fontWeight={"600"}>
                {item.listUser[0].name}
              </Typography>
            </Box>
          </Box>
        ))}
      </Grid2>
    </Grid2>
  );
}
