"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  SelectChangeEvent,
} from "@mui/material";
import axios from "axios";
import { useUser } from "@/hooks/use-user";
import { changeBankApi } from "@/services/user.api";
import { toast } from "react-toastify";
import { BankInteface } from "@/utils/interfaces/bank.interface";
import { getBanks, TypeBankAuto } from "@/utils/bank";

export default function BankInfoForm() {
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<BankInteface>({
    accountName: "",
    accountNumber: "",
    bankName: "",
    branch: "",
    code: "",
  });
  const [errors, setErrors] = useState({
    accountName: "",
    accountNumber: "",
    bankName: "",
    branch: "",
  });

  // Kiểm tra xem form có nên bị vô hiệu hóa hay không
  const isFormDisabled = !!user?.bank?.code;

  useEffect(() => {
    setFormData({
      accountName: user?.bank?.accountName ?? "",
      accountNumber: user?.bank?.accountNumber ?? "",
      bankName: user?.bank?.bankName ?? "",
      branch: user?.bank?.branch ?? "",
      code: user?.bank?.code ?? "",
    });
  }, [user]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      accountName: "",
      accountNumber: "",
      bankName: "",
      branch: "",
    };

    if (!formData?.accountName?.trim()) {
      newErrors.accountName = "Họ và tên là bắt buộc";
      isValid = false;
    }

    if (!formData?.accountNumber?.trim()) {
      newErrors.accountNumber = "Số tài khoản là bắt buộc";
      isValid = false;
    } else if (!/^\d+$/.test(formData.accountNumber)) {
      newErrors.accountNumber = "Số tài khoản chỉ được chứa số";
      isValid = false;
    }

    if (!formData.bankName) {
      newErrors.bankName = "Vui lòng chọn ngân hàng";
      isValid = false;
    }

    if (!formData?.branch?.trim()) {
      newErrors.branch = "Chi nhánh ngân hàng là bắt buộc";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const selectedBank = await getBanks.find(
      (item: TypeBankAuto) => item.code === formData.code
    );
    formData.bankName = selectedBank ? selectedBank.shortName : "";

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      if (!user._id) {
        toast.warning("Không tìm thấy thông tin người dùng");
        setIsSubmitting(false);
        return;
      }

      const newFormData = {
        bank: {
          accountName: formData.accountName,
          accountNumber: formData.accountNumber,
          bankName: formData.bankName,
          branch: formData.branch,
          code: formData.code,
        },
        fullname: formData.accountName,
      };
      const response = await changeBankApi(user._id, newFormData);

      if (response.status === 200 || response.status === 201) {
        toast.success("Cập nhật thông tin ngân hàng thành công");
      }
    } catch (error: any) {
      console.log("Error updating bank info:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<
          | HTMLInputElement
          | HTMLTextAreaElement
          | { name?: string; value: unknown }
        >
      | SelectChangeEvent<string | number>
  ) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
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
        Họ và tên
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Họ và tên"
        type="text"
        name="accountName"
        value={formData?.accountName}
        onChange={handleInputChange}
        error={!!errors.accountName}
        helperText={errors.accountName}
        aria-label="Họ và tên"
        disabled={isFormDisabled} // Vô hiệu hóa khi user?.bank?.code tồn tại
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
        Số tài khoản
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Số tài khoản"
        name="accountNumber"
        type="text"
        value={formData?.accountNumber}
        onChange={handleInputChange}
        error={!!errors.accountNumber}
        helperText={errors.accountNumber}
        aria-label="Số tài khoản"
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        disabled={isFormDisabled} // Vô hiệu hóa khi user?.bank?.code tồn tại
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
        Ngân hàng
      </Typography>
      <Select
        fullWidth
        value={formData?.code}
        onChange={handleInputChange}
        displayEmpty
        variant="outlined"
        name="code"
        error={!!errors.bankName}
        aria-label="Chọn ngân hàng"
        disabled={isFormDisabled} // Vô hiệu hóa khi user?.bank?.code tồn tại
        sx={{
          mb: { xs: 1, sm: 2 },
          fontSize: { xs: "0.75rem", sm: "0.875rem" },
        }}
        MenuProps={{
          PaperProps: {
            sx: { fontSize: { xs: "0.75rem", sm: "0.875rem" } },
          },
        }}
      >
        <MenuItem
          value=""
          disabled
          sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
        >
          {"-- Chọn ngân hàng --"}
        </MenuItem>
        {getBanks.map((bank: TypeBankAuto) => (
          <MenuItem
            key={bank.code}
            value={bank.code}
            sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
          >
            {bank.shortName}
          </MenuItem>
        ))}
      </Select>
      {errors.bankName && (
        <Typography
          color="error"
          variant="caption"
          sx={{
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
            mb: { xs: 1, sm: 2 },
          }}
        >
          {errors.bankName}
        </Typography>
      )}
      <Typography
        variant="body1"
        mb={1}
        fontSize={{ xs: "0.875rem", sm: "1rem" }}
      >
        Chi nhánh ngân hàng
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Chi nhánh ngân hàng"
        name="branch"
        value={formData?.branch}
        onChange={handleInputChange}
        error={!!errors.branch}
        helperText={errors.branch}
        aria-label="Chi nhánh ngân hàng"
        disabled={isFormDisabled} // Vô hiệu hóa khi user?.bank?.code tồn tại
        sx={{
          mb: { xs: 1, sm: "2px" },
          fontSize: { xs: "0.75rem", sm: "0.875rem" },
        }}
        InputProps={{
          sx: { fontSize: { xs: "0.75rem", sm: "0.875rem" } },
        }}
      />
      {!isFormDisabled && ( // Chỉ hiển thị nút "Cập nhật" nếu form không bị vô hiệu hóa
        <Box display="flex" justifyContent="center" mt={{ xs: 2, sm: 3 }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitting}
            sx={{
              width: "100%",
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
              py: { xs: 0.75, sm: 1 },
            }}
          >
            {isSubmitting ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Cập nhật"
            )}
          </Button>
        </Box>
      )}
    </Box>
  );
}
