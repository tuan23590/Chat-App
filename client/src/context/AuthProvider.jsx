import React, { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user?.uid) {
          setUser(user);
          localStorage.setItem("accessToken", user.accessToken);
          localStorage.setItem("uid", user.uid);
          return;
        }else{
          setUser({});
          localStorage.removeItem("accessToken");
          localStorage.removeItem("uid");
          console.log("User is not logged in");
          navigate("/login");
        }
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
