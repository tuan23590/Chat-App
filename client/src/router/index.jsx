import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "./../pages/Home";
import Login from "./../pages/Login";
import AuthProvider from './../context/AuthProvider';


const AuthLayout = () => {
  return (
    <AuthProvider>
      <Outlet />;
    </AuthProvider>
  );
};

export default createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        element: <Home />,
        path: "/",
      },
      {
        element: <Login />,
        path: "/login",
      },
    ],
  },
]);
