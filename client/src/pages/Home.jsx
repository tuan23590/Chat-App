import { Avatar, Box, Grid2, List, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import AddRoom from './../compument/ChatRoom/AddRoom';
import { TIMEAGO } from './../function/index';
import ChatWindows from "../compument/ChatRoom/ChatWindows";
import UserMenu from './../compument/UserMenu';
import { APIGetListRoom } from "../utils/RoomUtil";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function Home() {
  const [rooms, setRooms] = useState([]);
  const { user } = useContext(AuthContext);
  const currentUid = user?.uid;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);
  const [openRoom, setOpenRoom] = useState(false);

  const fetchRoom = async () => {
    const res = await APIGetListRoom(user?.uid);
    setRooms(res);
  };

  useEffect(() => {
    if (user.uid) {
      fetchRoom();
    }
  }, [user?.uid]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1000) {
        setOpenRoom(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  return (
    <>
    <Grid2 container sx={{
      position: 'relative'
    }}>
      
      <Grid2 size={3} borderRight={1} height={"100vh"} p={2} minWidth={'250px'} sx={{
        '@media (max-width: 1000px)': {
          position: 'absolute',
          display: openRoom ? 'block' : 'none',
        },
        backgroundColor: 'white',
        zIndex: 1,
      }}>
        
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
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
          <Box display={'flex'}>
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
        
        {open && <AddRoom selectedUser={selectedUser} setSelectedUser={setSelectedUser} />}
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
        </Box>
      </Grid2>
      <Grid2 size={9} sx={{
        minWidth: '300px',
        '@media (max-width: 1000px)': {
          width: '100%'
        }
      }}>
        {selectedUser.length > 0 ? <ChatWindows selectedUser={selectedUser} setSelectedUser={setSelectedUser} />: <Outlet />}
      </Grid2>
    </Grid2>
    <Box sx={{
        bottom: '10vh',
        zIndex: 1,
        position: 'fixed',
        '@media (min-width: 1000px)': {
          // display: 'none',
        },
        
      }}
      onClick={() => setOpenRoom(!openRoom)}
      > 
        <ArrowForwardIosIcon fontSize="large" sx={{
          borderRadius: '50%',
          padding: '5px',
          cursor: 'pointer',
          display: 'none',
          '@media (max-width: 1000px)': {
            display:'block',
          },
        }} />
        </Box>
    </>
  );
}
