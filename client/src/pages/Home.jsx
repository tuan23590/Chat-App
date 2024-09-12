import { Box, Grid2 } from "@mui/material";
import React from "react";
import ChatBar from "../compument/ChatRoom/ChatBar";
import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Grid2 container padding={1}>
        <Grid2 height={"98vh"} size={0.4} border={1}>
          <ChatBar />
        </Grid2>
        <Grid2 height={"98vh"} size={11.6} border={1}>
          <Outlet />
        </Grid2>
      </Grid2>
    </>
  );
}
