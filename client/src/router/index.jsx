import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "./../pages/Home";
import Login from "./../pages/Login";
import AuthProvider from "./../context/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "../pages/ErrorPage";
import SubscriptionProvider from "./../context/SubscriptionProvider";
import ChatWindows from "../compument/ChatRoom/ChatWindows";
import { APIGetRoom } from "../utils/RoomUtil";
import AppProvider from "../context/AppProvider";

const AuthLayout = () => {
  return (
    <AuthProvider>
      <SubscriptionProvider>
        <AppProvider>
          <Outlet />
        </AppProvider>
      </SubscriptionProvider>
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
                element: <ChatWindows />,
                path: "/:roomId",
                loader: APIGetRoom,
              },
            ],
          },
        ],
      },
    ],
  },
]);
