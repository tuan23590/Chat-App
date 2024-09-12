import { Avatar, Box, Grid2, List, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { TIMEAGO } from "./../../function/index";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { APIGetListRoom } from "../../utils/RoomUtil";
import { AuthContext } from "./../../context/AuthProvider";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function ListChat() {
  const [rooms, setRooms] = useState([]);
  const roomId = useLocation().pathname.split("/")[2];
  const { user } = useContext(AuthContext);
  const currentUid = user?.uid;
  const navigate = useNavigate();
  const fetchRoom = async () => {
    const res = await APIGetListRoom(user?.uid);
    setRooms(res);
  };
  useEffect(() => {
    if (user.uid) {
      fetchRoom();
    }
  }, [user?.uid]);
  return (
    <Grid2 container>
      <Grid2 size={3} borderRight={1} height={"98vh"} p={2}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" fontWeight={"600"}>
            Đoạn chat
          </Typography>
          <AddIcon
            fontSize="large"
            sx={{
              width: 40,
              height: 40,
              backgroundColor: "grey.200",
              padding: 1,
              borderRadius: "50%",
              ":hover": {
                backgroundColor: "grey.100",
              },
            }}
            onClick={() => navigate("/ListChat/newChat")}
          />
        </Box>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Tìm kiếm"
          sx={{ marginY: 2 }}
        />
        <Box sx={{ height: "89%", overflowY: "scroll" }}>
          {rooms &&
            rooms.map((item, index) => (
              <Box
                key={index}
                sx={{
                  borderBottom: 1,
                  borderColor: "grey.300",
                  paddingY: 1,
                  cursor: "pointer",
                  backgroundColor: roomId === item.id ? "grey.100" : "white",
                  ":hover": {
                    backgroundColor: "grey.100",
                  },
                }}
              >
                <Grid2
                  container
                  sx={{
                    "&:hover .more-icon": {
                      opacity: 1,
                    },
                  }}
                  onClick={() => navigate(`./${item.id}`)}
                >
                  <Grid2
                    size={2}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Avatar src={item.photoURL} />
                  </Grid2>
                  <Grid2 size={8.5}>
                    <Typography fontSize={"1.0rem"} fontWeight={"600"} noWrap>
                      {item.name ??
                        item.listUser.map((user, index) => (
                          <span key={index}>
                            {user?.uid === currentUid ? "" : user?.name}
                          </span>
                        ))}
                    </Typography>
                    <Box sx={{ display: "flex" }}>
                      <Typography noWrap>
                        {item.LastMessage?.content} •
                      </Typography>
                      <Typography sx={{ whiteSpace: "nowrap", ml: 1 }}>
                        {TIMEAGO(item?.LastMessage?.createdAt)}
                      </Typography>
                    </Box>
                  </Grid2>
                  <Grid2
                    size={1}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MoreHorizIcon
                      sx={{
                        width: 35,
                        height: 35,
                        padding: 1,
                        borderRadius: "50%",
                        opacity: 0,
                        marginLeft: 2,
                        backgroundColor: "white",
                        border: "1px solid grey",
                      }}
                      className="more-icon"
                    />
                  </Grid2>
                </Grid2>
              </Box>
            ))}
        </Box>
      </Grid2>
      <Grid2 size={9}>
        <Outlet />
      </Grid2>
    </Grid2>
  );
}
