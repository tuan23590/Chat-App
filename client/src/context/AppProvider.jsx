import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { APIGetListRoom, APINewRoom } from "../utils/RoomUtil";
import { APIGetUser } from './../utils/UserUtil';

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const { user:{uid} } = useContext(AuthContext);
  const [rooms, setRooms] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const currentUid = uid;
  const { newRoom } = APINewRoom(currentUid);

  useEffect(() => {
    if (newRoom && !rooms.includes(newRoom)) {
      setRooms([newRoom, ...rooms]);
      return;
    }
  }, [newRoom]);
  useEffect(() => {
    if (currentUid) {
      fetchRoom(currentUid,setRooms);
      fetchUser(currentUid,setCurrentUser);
    }
  }, [currentUid]);

  useEffect(() => {
  },[selectedUser])
  return (
    <AppContext.Provider value={{ currentUser, rooms, setRooms, currentUid,selectedUser, setSelectedUser }}>
      {children}
    </AppContext.Provider>
  );
}

const fetchRoom = async (currentUid,setRooms) => {
    const res = await APIGetListRoom(currentUid);
    if (res) {
      setRooms(res.sort((a, b) => b.updatedAt - a.updatedAt));
    }
  };
  const fetchUser = async (currentUid,setCurrentUser) => {
    const res = await APIGetUser(currentUid);
    if (res) {
      setCurrentUser(res);
    }
  };


  