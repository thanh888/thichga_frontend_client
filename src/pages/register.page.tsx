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

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    phoneNumber: "",
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
    // Thêm logic gửi API để đăng ký tại đây
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 64px)", // Trừ chiều cao của AppBar
        backgroundColor: "#e3f2fd", // Màu nền xanh nhạt giống hình ảnh
        p: 3,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 500, // Chiều rộng giống LoginPage
          p: 4,
          backgroundColor: "#fff",
          borderRadius: 2,
          border: "1px solid #2196f3", // Viền xanh giống hình ảnh
        }}
      >
        {/* Tiêu đề */}
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#2196f3" }} // Màu xanh cho tiêu đề
        >
          ĐĂNG KÝ
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ mb: 4, color: "#666" }}>
          Hãy đăng ký để tiếp tục nhé!
        </Typography>

        {/* Form đăng ký */}
        <TextField
          fullWidth
          label="Tên đăng nhập (không quá 9 ký tự)"
          name="username"
          value={formData.username}
          onChange={handleChange}
          variant="outlined"
          inputProps={{ maxLength: 9 }} // Giới hạn 9 ký tự
          sx={{ mb: 3 }}
        />
        <TextField
          fullWidth
          label="Mật khẩu (độ dài từ 6-20 ký tự)"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          variant="outlined"
          inputProps={{ minLength: 6, maxLength: 20 }} // Giới hạn độ dài mật khẩu
          sx={{ mb: 3 }}
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
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          variant="outlined"
          sx={{ mb: 3 }}
          type="tel"
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ py: 1.5 }}
          onClick={handleSubmit}
        >
          Đăng ký
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterPage;
