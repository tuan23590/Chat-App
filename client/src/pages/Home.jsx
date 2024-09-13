import { Box, Grid2 } from "@mui/material";
import React from "react";
import ChatBar from "../compument/ChatRoom/ChatBar";
import { Outlet } from "react-router-dom";
import ListChat from './../compument/ChatRoom/ListChat';

export default function Home() {
  return (
    <>
      <ListChat />
    </>
  );
}
