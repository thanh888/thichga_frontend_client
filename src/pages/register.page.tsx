"use client";

import React, { useState } from "react";
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
import { toast } from "react-toastify";
import { signUpApi } from "@/services/auth/auth.api";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateUsername = (username: string): boolean => {
    const usernameRegex = /^[a-zA-Z0-9]{6,32}$/;
    if (!username) {
      setUsernameError("Tên đăng nhập không được để trống");
      return false;
    }
    if (!usernameRegex.test(username)) {
      setUsernameError(
        "Tên đăng nhập phải từ 6-32 ký tự, chỉ chứa chữ cái và số"
      );
      return false;
    }
    setUsernameError("");
    return true;
  };

  const validatePassword = (password: string): boolean => {
    if (!password) {
      setPasswordError("Mật khẩu không được để trống");
      return false;
    }
    if (password.length < 6) {
      setPasswordError("Mật khẩu ít nhất 6 ký tự");
      return false;
    }

    setPasswordError("");
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "username") {
      validateUsername(value);
    }
    if (name === "password") {
      validatePassword(value);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async () => {
    if (!formData.username || !formData.password || !formData.phone) {
      toast.warning("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (
      !validateUsername(formData.username) ||
      !validatePassword(formData.password)
    ) {
      toast.error("Vui lòng kiểm tra lại thông tin nhập vào");
      return;
    }

    try {
      const response = await signUpApi(formData);
      if (response.status === 200 || response.status === 201) {
        router.push("/login");
        toast.success("Đăng ký thành công");
      }
    } catch (error: any) {
      console.log(error);
      if (error.response?.data?.message === "Username or phone is existing") {
        toast.error("Tên người dùng hoặc sđt đã tồn tại");
      } else {
        toast.error("Đã xảy ra lỗi, vui lòng thử lại");
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
        backgroundColor: "#e3f2fd",
        p: 3,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 500,
          p: 4,
          backgroundColor: "#fff",
          borderRadius: 2,
          border: "1px solid #2196f3",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#2196f3" }}
        >
          ĐĂNG KÝ
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ mb: 4, color: "#666" }}>
          Hãy đăng ký để tiếp tục nhé!
        </Typography>

        <TextField
          fullWidth
          label="Tên đăng nhập"
          name="username"
          value={formData.username}
          onChange={handleChange}
          variant="outlined"
          sx={{ mb: 3 }}
          error={!!usernameError}
          helperText={usernameError}
          inputProps={{ maxLength: 32 }}
        />
        <TextField
          fullWidth
          label="Mật khẩu"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          variant="outlined"
          sx={{ mb: 3 }}
          error={!!passwordError}
          helperText={passwordError}
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
        <TextField
          fullWidth
          label="Số điện thoại"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          variant="outlined"
          type="tel"
          sx={{ mb: 3 }}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ py: 1.5, my: 2 }}
          onClick={handleSubmit}
        >
          Đăng ký
        </Button>
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          sx={{ py: 1.5 }}
          component={Link}
          href="/login"
        >
          Đăng nhập
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterPage;
