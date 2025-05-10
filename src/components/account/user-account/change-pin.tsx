"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { toast } from "react-toastify";
import { changePinApi } from "@/services/user.api";
import { useUser } from "@/hooks/use-user";

export default function ChangePinForm() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { user } = useUser();

  const [formData, setFormData] = useState({
    currentPin: "",
    newPin: "",
    confirmPin: "",
  });
  const [errors, setErrors] = useState({
    currentPin: "",
    newPin: "",
    confirmPin: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      currentPin: "",
      newPin: "",
      confirmPin: "",
    };

    // Current PIN validation
    if (!formData.currentPin) {
      newErrors.currentPin = "Vui lòng nhập mã PIN hiện tại";
      isValid = false;
    } else if (!/^\d{4,6}$/.test(formData.currentPin)) {
      newErrors.currentPin = "Mã PIN hiện tại phải là số từ 4 đến 6 chữ số";
      isValid = false;
    }

    // New PIN validation
    if (!formData.newPin) {
      newErrors.newPin = "Vui lòng nhập mã PIN mới";
      isValid = false;
    } else if (!/^\d{4,6}$/.test(formData.newPin)) {
      newErrors.newPin = "Mã PIN mới phải là số từ 4 đến 6 chữ số";
      isValid = false;
    } else if (formData.newPin === formData.currentPin) {
      newErrors.newPin = "Mã PIN mới phải khác mã PIN hiện tại";
      isValid = false;
    }

    // Confirm PIN validation
    if (!formData.confirmPin) {
      newErrors.confirmPin = "Vui lòng xác nhận mã PIN mới";
      isValid = false;
    } else if (formData.confirmPin !== formData.newPin) {
      newErrors.confirmPin = "Mã PIN xác nhận không khớp";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (!user._id) {
        toast.error("Không tìm thấy thông tin người dùng");
        return;
      }
      const response = await changePinApi(user._id.toString(), {
        currentPin: formData.currentPin,
        newPin: formData.newPin,
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Đổi mã PIN thành công");
        setFormData({
          currentPin: "",
          newPin: "",
          confirmPin: "",
        });
        setErrors({
          currentPin: "",
          newPin: "",
          confirmPin: "",
        });
      }
    } catch (error: any) {
      console.error("Error changing PIN:", error);
      toast.error(
        error.response?.data?.message === "Pin is incorrect" &&
          "Mã pin không đúng"
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
      onSubmit={handleSubmit}
      sx={{ p: { xs: 1, sm: 2 } }}
    >
      <Typography
        variant="body1"
        mb={1}
        fontSize={{ xs: "0.875rem", sm: "1rem" }}
      >
        Mã PIN hiện tại
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Mã PIN hiện tại"
        type="password"
        name="currentPin"
        value={formData.currentPin}
        onChange={handleInputChange}
        error={!!errors.currentPin}
        helperText={errors.currentPin}
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
        Mã PIN mới
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Mã PIN mới"
        type="password"
        name="newPin"
        value={formData.newPin}
        onChange={handleInputChange}
        error={!!errors.newPin}
        helperText={errors.newPin}
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
        Xác thực mã PIN mới
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Xác thực mã PIN mới"
        type="password"
        name="confirmPin"
        value={formData.confirmPin}
        onChange={handleInputChange}
        error={!!errors.confirmPin}
        helperText={errors.confirmPin}
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
