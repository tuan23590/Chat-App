import {
  Avatar,
  AvatarGroup,
  Box,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Outlet, useNavigate } from "react-router-dom";
import AddRoom from "./../compument/ChatRoom/AddRoom";
import { TIMEAGO } from "./../function/index";
import ChatWindows from "../compument/ChatRoom/ChatWindows";
import UserMenu from "./../compument/UserMenu";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { APINewMessage } from "../utils/MessageUtils";
import { AppContext } from "../context/AppProvider";
import StyledBadge from "../compument/StyledBadge ";

export default function Home() {
  const {rooms, setRooms,currentUid,selectedUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openRoom, setOpenRoom] = useState(false);

  const { newMessage } = APINewMessage(currentUid);

  useEffect(() => {
    if (newMessage) {
      const newLastMessage = newMessage;
      const room = rooms.find((room) => room.id === newMessage.room.id);
      if (room) {
        room.LastMessage = newLastMessage;
        const sortRooms = rooms.sort(
          (a, b) => b.LastMessage?.createdAt - a.LastMessage?.createdAt
        );
        setRooms([...sortRooms]);
      }
      return;
    }
  }, [newMessage]);
  return (
    <>
      <Grid2
        container
        sx={{
          position: "relative",
        }}
      >
        <Grid2
          size={3}
          borderRight={1}
          height={"100vh"}
          p={2}
          minWidth={"350px"}
          sx={{
            "@media (max-width: 1500px)": {
              position: "absolute",
              display: openRoom ? "block" : "none",
              width: "25%",
            },
            backgroundColor: "white",
            zIndex: 1,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 2,
              }}
            >
              <Typography variant="h5" fontWeight={"600"}>
                Chat App
              </Typography>
              <Box display={"flex"}>
                <UserMenu />
                <AddIcon
                  fontSize="large"
                  sx={{
                    marginLeft: 2,
                    width: 40,
                    height: 40,
                    backgroundColor: "grey.200",
                    padding: 1,
                    borderRadius: "50%",
                    ":hover": {
                      backgroundColor: "grey.100",
                    },
                  }}
                  onClick={() => setOpen(!open)}
                />
              </Box>
            </Box>

            {open && (
              <AddRoom
              />
            )}
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Tìm kiếm"
              sx={{ marginY: 2 }}
            />
            <Box sx={{ height: "89%", overflowX: "hidden", overflowY: "auto" }}>
              {rooms &&
                rooms.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      borderBottom: 1,
                      borderColor: "grey.300",
                      paddingY: 1,
                      cursor: "pointer",
                      backgroundColor: "white",
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
                      onClick={() => {
                        navigate(`./${item.id}`);
                        setOpenRoom(false);
                      }}
                    >
                      <Grid2
                        size={2}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {item?.listUser.length > 2 ? (
                        <AvatarGroup
                          max={2}
                          sx={{
                            "& .MuiAvatar-root": {
                              width: 25,
                              height: 25,
                              fontSize: 15,
                            },
                          }}
                        >
                          {item?.listUser
                            .filter((user) => user.uid !== currentUid)
                            .map((user) => (
                              <StyledBadge
                    overlap="circular"
                    key={user.uid}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                    invisible={!user.online}
                  >
                              <Avatar
                                alt={user.name}
                                src={user.photoURL}
                              />
                              </StyledBadge>
                            ))}
                        </AvatarGroup>
                        ):(
                          <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                    invisible={!item?.listUser?.filter( user => user.uid !== currentUid)[0]?.online}
                  >
                    <Avatar
                        src={item?.listUser?.filter( user => user.uid !== currentUid)[0]?.photoURL}
                        alt={item?.listUser?.filter( user => user.uid !== currentUid)[0]?.name}
                    />
                  </StyledBadge>
                        )}
                      </Grid2>
                      <Grid2 size={8.5}>
                        <Typography
                          fontSize={"1.3rem"}
                          fontWeight={"600"}
                          noWrap
                        >
                          {item?.name ||
                            item?.listUser?.filter(
                              (user) =>  user.uid !== currentUid
                            )[0]?.name ||
                            "Chỉ có mình bạn"}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: 'center' }}>
                          {item?.LastMessage ? (
                          <Typography noWrap
                          sx={{ 
                            fontWeight: item?.LastMessage.sender?.uid == currentUid ? "" : 
                            item?.LastMessage?.seen?.map( user => currentUid).includes(currentUid) ? null : "600",
                          }}
                          >
                            {item.LastMessage?.sender?.uid === currentUid ? "Bạn: " : ""} {item.LastMessage.isDeleted ? "Tin nhắn đã xóa" : item.LastMessage?.content} •
                          </Typography>
                          ):(
                            <Typography noWrap>
                              Chưa có tin nhắn
                            </Typography>
                          )}
                          <Typography sx={{ whiteSpace: "nowrap", mx: 1 }}>
                            {item.LastMessage?.createdAt && (TIMEAGO(item?.LastMessage?.createdAt))}
                          </Typography>
                          {item.LastMessage?.sender?.uid === currentUid && (
                          <AvatarGroup max={2} 
                          sx={{
                            "& .MuiAvatar-root": {
                              width: 15,
                              height: 15,
                            },
                          }}
                          >
                            {item?.LastMessage?.seen.filter( user => currentUid !== currentUid).map((user) => (
                              <Avatar
                                key={currentUid}
                                src={user.photoURL}
                              />
                            ))}
                          </AvatarGroup>
                          )}
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
          </Box>
        </Grid2>
        <Grid2
          size={9}
          sx={{
            minWidth: "300px",
            "@media (max-width: 1500px)": {
              width: "100%",
            },
          }}
        >
          {selectedUser.length > 0 ? (
            <ChatWindows
              setOpenRoom={setOpenRoom}
            />
          ) : (
            <Outlet />
          )}
        </Grid2>
      </Grid2>
      <Box
        sx={{
          bottom: "20vh",
          zIndex: 1,
          position: "fixed",
          "@media (min-width: 1000px)": {
            // display: 'none',
          },
        }}
        onClick={() => setOpenRoom(!openRoom)}
      >
        {!openRoom ? (
          <ArrowForwardIosIcon
            fontSize="large"
            sx={{
              borderRadius: "50%",
              padding: "5px",
              cursor: "pointer",
              display: "none",
              "@media (max-width: 1500px)": {
                display: "block",
              },
            }}
          />
        ) : (
          <ArrowBackIosIcon
            fontSize="large"
            sx={{
              borderRadius: "50%",
              padding: "5px",
              cursor: "pointer",
              display: "none",
              "@media (max-width: 1500px)": {
                display: "block",
              },
            }}
          />
        )}
      </Box>
    </>
  );
}
