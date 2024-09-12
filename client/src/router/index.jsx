import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "./../pages/Home";
import Login from "./../pages/Login";
import AuthProvider from './../context/AuthProvider';
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "../pages/ErrorPage";
import ListChat from './../compument/ChatRoom/ListChat';
import Pending from './../compument/ChatRoom/Pending';
import ChatWindows from "../compument/ChatRoom/ChatWindows";
import { APIGetRoom } from "../utils/RoomUtil";

const childrenChat = (parentName) => {
  return [
    {
      element: <ChatWindows />,
      path: `${parentName}/newChat`,
    },
    {
      element: <ChatWindows />,
      path: `${parentName}/:roomId`,
      loader: APIGetRoom,
    },
  ];
}

const AuthLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

export default createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <Home />,
            path: "/",
            children: [
              {
                element: <ListChat />,
                path: "/ListChat",
                children: childrenChat("/ListChat")
              },
              {
                element: <Pending />,
                path: "/Pending",
                children: childrenChat("/Pending")
              },
            ],
          },
        ],
      }
    ],
  },
]);
