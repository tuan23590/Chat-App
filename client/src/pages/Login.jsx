import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { APICreateUser } from "../utils/UserUtil";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function Login() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState([false, false]);

  const createUserData = async (user) => {
    const data = await APICreateUser({
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoUrl: user.photoURL,
    });
    if (data) {
      navigate("/");
    } else {
      setError("Đăng nhập thất bại");
    }
  };
  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    createUserData(res.user);
  };
  const handleLoginWithEmailAndPassword = async () => {
    if (email === "" || password === "") {
      setError("Vui lòng nhập email và mật khẩu");
      return;
    }
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      createUserData(res.user);
    } catch (error) {
      console.log(error.code);
      if (
        error.code === "auth/invalid-email" ||
        error.code === "auth/wrong-password"
      ) {
        setError("Email hoặc mật khẩu không đúng!");
      } else {
        setError("Đăng nhập thất bại");
      }
    }
  };
  const handeleRegisterWithEmailAndPassword = async () => {
    if (email === "" || password === "" || rePassword === "") {
      setError("Vui lòng nhập email và mật khẩu");
      return;
    }
    if (password !== rePassword) {
      setError("Mật khẩu không khớp");
      return;
    }
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      createUserData(res.user);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("Email đã được sử dụng!");
      } else {
        setError("Đăng nhập thất bại");
      }
    }
  };
  return (
    <Box
      sx={{
        textAlign: "center",
        marginTop: "10vh",
      }}
    >
      <Typography variant="h4" gutterBottom>
        {isRegister ? "Đăng ký tài khoản" : "Đăng nhập"}
      </Typography>
      <Box sx={{ width: 300, marginX: "auto" }}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          autoFocus
          margin="dense"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Mật khẩu"
          variant="outlined"
          fullWidth
          type={showPassword[0] ? "text" : "password"}
          margin="dense"
          InputProps={{
            endAdornment: (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  opacity: 0.5,
                }}
              >
                {showPassword[0] ? (
                  <VisibilityIcon
                    onClick={() => setShowPassword([false, showPassword[1]])}
                  />
                ) : (
                  <VisibilityOffIcon
                    onClick={() => setShowPassword([true, showPassword[1]])}
                  />
                )}
              </Box>
            ),
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isRegister && (
          <TextField
            label="Nhập lại mật khẩu"
            variant="outlined"
            fullWidth
            type={showPassword[1] ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    opacity: 0.5,
                  }}
                >
                  {showPassword[1] ? (
                    <VisibilityIcon
                      onClick={() => setShowPassword([showPassword[0], false])}
                    />
                  ) : (
                    <VisibilityOffIcon
                      onClick={() => setShowPassword([showPassword[0], true])}
                    />
                  )}
                </Box>
              ),
            }}
            margin="dense"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
        )}
        <Typography
          variant="caption"
          color="primary"
          sx={{
            display: "flex",
            justifyContent: "end",
            cursor: "pointer",
            paddingY: 0.5,
            ":hover": {
              textDecoration: "underline",
              color: "blue",
            },
          }}
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister
            ? "Bạn đã có tài khoản? Đăng nhập"
            : "Bạn chưa có tài khoản? Đăng ký"}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={
            isRegister
              ? handeleRegisterWithEmailAndPassword
              : handleLoginWithEmailAndPassword
          }
        >
          {isRegister ? "Đăng ký" : "Đăng nhập"}
        </Button>
        <Button
          fullWidth
          sx={{ marginTop: 1 }}
          variant="outlined"
          color="primary"
          onClick={handleLoginWithGoogle}
        >
          Đăng nhập với Google
        </Button>
        <Typography variant="caption" color="error" sx={{ marginTop: 1 }}>
          {error}
        </Typography>
      </Box>
    </Box>
  );
}
