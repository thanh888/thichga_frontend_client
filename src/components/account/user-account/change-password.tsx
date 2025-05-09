"use client";
import React, { use, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import { useUser } from "@/hooks/use-user";
import { changePasswordApi } from "@/services/user.api";

export default function ChangePasswordForm() {
  const { user } = useUser();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    // Old password validation
    if (!formData.oldPassword) {
      newErrors.oldPassword = "Vui lòng nhập mật khẩu cũ";
      isValid = false;
    }

    // New password validation
    if (!formData.newPassword) {
      newErrors.newPassword = "Vui lòng nhập mật khẩu mới";
      isValid = false;
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Mật khẩu mới phải có ít nhất 8 ký tự";
      isValid = false;
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        formData.newPassword
      )
    ) {
      newErrors.newPassword =
        "Mật khẩu mới phải chứa chữ hoa, chữ thường, số và ký tự đặc biệt";
      isValid = false;
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu mới";
      isValid = false;
    } else if (formData.confirmPassword !== formData.newPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (!user._id) {
        return;
      }
      const response = await changePasswordApi(user._id.toString(), {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Đổi mật khẩu thành công");
        setFormData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setErrors({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error: any) {
      console.error("Error changing password:", error);
      toast.error(
        error.response?.data?.message ||
          "Lỗi khi đổi mật khẩu, vui lòng thử lại"
      );
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <Box
      className="bank-form"
      component="form"
      onSubmit={handleChangePassword}
      sx={{ p: { xs: 1, sm: 2 } }}
    >
      <Typography
        variant="body1"
        mb={1}
        fontSize={{ xs: "0.875rem", sm: "1rem" }}
      >
        Mật khẩu cũ
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Mật khẩu cũ"
        type="password"
        name="oldPassword"
        value={formData.oldPassword}
        onChange={handleInputChange}
        error={!!errors.oldPassword}
        helperText={errors.oldPassword}
        sx={{
          mb: { xs: 1, sm: 2 },
          fontSize: { xs: "0.75rem", sm: "0.875rem" },
        }}
        InputProps={{
          sx: { fontSize: { xs: "0.75rem", sm: "0.875rem" } },
        }}
      />
      <Typography
        variant="body1"
        mb={1}
        fontSize={{ xs: "0.875rem", sm: "1rem" }}
      >
        Mật khẩu mới
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Mật khẩu mới"
        type="password"
        name="newPassword"
        value={formData.newPassword}
        onChange={handleInputChange}
        error={!!errors.newPassword}
        helperText={errors.newPassword}
        sx={{
          mb: { xs: 1, sm: 2 },
          fontSize: { xs: "0.75rem", sm: "0.875rem" },
        }}
        InputProps={{
          sx: { fontSize: { xs: "0.75rem", sm: "0.875rem" } },
        }}
      />
      <Typography
        variant="body1"
        mb={1}
        fontSize={{ xs: "0.875rem", sm: "1rem" }}
      >
        Xác thực mật khẩu
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Xác thực mật khẩu"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
        sx={{
          mb: { xs: 1, sm: 2 },
          fontSize: { xs: "0.75rem", sm: "0.875rem" },
        }}
        InputProps={{
          sx: { fontSize: { xs: "0.75rem", sm: "0.875rem" } },
        }}
      />
      <Box display="flex" justifyContent="center" mt={{ xs: 2, sm: 3 }}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{
            width: "100%",
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
            py: { xs: 0.75, sm: 1 },
          }}
        >
          Xác nhận
        </Button>
      </Box>
    </Box>
  );
}
