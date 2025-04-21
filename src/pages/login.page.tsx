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
import Link from "next/link";

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Thêm logic gửi API để đăng nhập tại đây
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 64px)", // Trừ chiều cao của AppBar
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
        {/* Tiêu đề */}
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
          ĐĂNG NHẬP
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
          Hãy đăng nhập để tiếp tục nhé!
        </Typography>

        {/* Form đăng nhập */}
        <TextField
          fullWidth
          label="Tên đăng nhập"
          name="username"
          value={formData.username}
          onChange={handleChange}
          variant="outlined"
          sx={{ mb: 2 }}
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
