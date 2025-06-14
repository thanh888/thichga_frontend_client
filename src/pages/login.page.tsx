"use client";

import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "next/link";
import { signInApi } from "@/services/auth/auth.api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { UserContext } from "@/contexts/user-context";

const LoginPage: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState("");

  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const checkSession = userContext?.checkSession;

  const validateUsername = (username: string): boolean => {
    const usernameRegex = /^[a-zA-Z0-9]{6,32}$/;
    if (!username) {
      setUsernameError("Tên đăng nhập không được để trống");
      return false;
    }
    // if (!usernameRegex.test(username)) {
    //   setUsernameError(
    //     "Tên đăng nhập phải từ 6-32 ký tự, chỉ chứa chữ cái và số"
    //   );
    //   return false;
    // }
    setUsernameError("");
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "username") {
      validateUsername(value);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  React.useEffect(() => {
    if (user) {
      window.location.href = "/";
    }
  }, [user, router]);

  const handleSubmit = async () => {
    if (!formData.username || !formData.password) {
      toast.error("Tài khoản hoặc mật khẩu không được bỏ trống");
      return;
    }

    if (!validateUsername(formData.username)) {
      toast.error(usernameError);
      return;
    }

    try {
      const res = await signInApi(formData);

      if (res.status === 200 || res.status === 201) {
        localStorage.setItem("account", res.data.accessToken);
        if (checkSession) {
          await checkSession();
        }
        toast.success("Đăng nhập thành công");
        window.location.href = "/";
      } else if (
        res?.response?.data?.message === "Username or password is incorrect"
      ) {
        toast.error("Tài khoản hoặc mật khẩu không đúng");
      }
    } catch (error: any) {
      console.log("Login failed:", error);
      if (
        error?.response?.data?.message === "Username or password is incorrect"
      ) {
        toast.error("Tài khoản hoặc mật khẩu không đúng");
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh)",
        backgroundColor: "#f5f5f5",
        p: 3,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 4,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#2196f3" }}
        >
          ĐĂNG NHẬP
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ mb: 4, color: "#666" }}>
          Hãy đăng nhập để tiếp tục nhé!
        </Typography>

        <TextField
          fullWidth
          label="Tên đăng nhập"
          name="username"
          value={formData.username}
          onChange={handleChange}
          variant="outlined"
          sx={{ mb: 2 }}
          error={!!usernameError}
          helperText={usernameError}
        />
        <TextField
          fullWidth
          label="Mật khẩu"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          variant="outlined"
          sx={{ mb: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mb: 2, py: 1.5 }}
          onClick={handleSubmit}
        >
          Đăng nhập
        </Button>
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          sx={{ py: 1.5 }}
          component={Link}
          href="/register"
        >
          Đăng ký
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
