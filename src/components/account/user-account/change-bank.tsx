"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";

export default function BankInfoForm() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [transferType, setTransferType] = useState<string>("");

  const [formData, setFormData] = useState({
    fullName: "",
    accountNumber: "",
    bankBranch: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add API call or logic for updating bank info here
    console.log("Bank Info:", { ...formData, bank: transferType });
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
        name="fullName"
        value={formData.fullName}
        onChange={handleInputChange}
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
        value={formData.accountNumber}
        onChange={handleInputChange}
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
        value={transferType}
        onChange={(e) => setTransferType(e.target.value)}
        displayEmpty
        variant="outlined"
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
          -- Chọn ngân hàng --
        </MenuItem>
        <MenuItem
          value="vietcombank"
          sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
        >
          Vietcombank
        </MenuItem>
        <MenuItem
          value="techcombank"
          sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
        >
          Techcombank
        </MenuItem>
        <MenuItem
          value="bidv"
          sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
        >
          BIDV
        </MenuItem>
      </Select>
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
        name="bankBranch"
        value={formData.bankBranch}
        onChange={handleInputChange}
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
