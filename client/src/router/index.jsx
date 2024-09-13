import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "./../pages/Home";
import Login from "./../pages/Login";
import AuthProvider from './../context/AuthProvider';
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "../pages/ErrorPage";
import SubscriptionProvider from './../context/SubscriptionProvider';

const AuthLayout = () => {
  return (
    <AuthProvider>
      <SubscriptionProvider>
        <Outlet />
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
          },
        ],
      }
    ],
  },
]);
