import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
        navigate("/login");
        return;
    }
  return (
    <Outlet/>
  )
}
