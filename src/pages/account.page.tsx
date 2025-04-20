"use client";
import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Grid,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PaymentIcon from "@mui/icons-material/Payment";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import HistoryIcon from "@mui/icons-material/History";

const AccountPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    bankAccountNumber: "",
    bankName: "",
    bankBranch: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e: any) => {
    setFormData({ ...formData, bankName: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Thêm logic gửi API để đổi mật khẩu hoặc cập nhật thông tin tại đây
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar bên trái */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Avatar
            src="https://via.placeholder.com/40"
            alt="User Avatar"
            sx={{ mr: 2 }}
          />
          <Box>
            <Typography variant="h6">thanh.test</Typography>
            <Typography variant="body2" color="text.secondary">
              2,002,695,900
            </Typography>
          </Box>
        </Box>
        <List>
          {[
            { text: "Tài khoản", icon: <AccountCircleIcon /> },
            { text: "Nạp tiền tự động", icon: <PaymentIcon /> },
            { text: "Rút tiền", icon: <AccountBalanceIcon /> },
            { text: "Lịch sử nạp tiền", icon: <HistoryIcon /> },
            { text: "Lịch sử rút tiền", icon: <HistoryIcon /> },
          ].map((item, index) => (
            <ListItem button key={+index}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Phần chính bên phải */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, backgroundColor: "#f5f5f5" }}
      >
        <Typography variant="h5" gutterBottom>
          Đổi mật khẩu
        </Typography>
        <Typography variant="h6" gutterBottom>
          Đổi pin định mức
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 3, float: "right" }}
          onClick={() => console.log("Chuyển đến trang ngân hàng")}
        >
          Ngân hàng
        </Button>

        {/* Thông tin tài khoản */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6}>
            <Typography variant="body1">Họ và tên:</Typography>
            <Typography variant="body2" color="text.secondary">
              Chưa có
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">Số điện thoại:</Typography>
            <Typography variant="body2" color="text.secondary">
              Chưa có
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">Thời gian đăng ký:</Typography>
            <Typography variant="body2" color="text.secondary">
              14:32 14-04-2025
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">Lần đăng nhập cuối:</Typography>
            <Typography variant="body2" color="text.secondary">
              23:57 20-04-2025
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">Số tài khoản:</Typography>
            <Typography variant="body2" color="text.secondary">
              0123123123
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">IP lần đăng nhập cuối:</Typography>
            <Typography variant="body2" color="text.secondary">
              2001:ee0:4b6f:ea60:5577:ff99:ff61:d3ef
            </Typography>
          </Grid>
        </Grid>

        {/* Form đổi mật khẩu */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Họ và tên"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Số điện thoại"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Số tài khoản"
              name="bankAccountNumber"
              value={formData.bankAccountNumber}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Chọn ngân hàng</InputLabel>
              <Select
                label="Chọn ngân hàng"
                name="bankName"
                value={formData.bankName}
                onChange={handleSelectChange}
              >
                <MenuItem value="">-- Chọn ngân hàng --</MenuItem>
                <MenuItem value="Vietcombank">Vietcombank</MenuItem>
                <MenuItem value="Techcombank">Techcombank</MenuItem>
                <MenuItem value="MB Bank">MB Bank</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Chi nhánh ngân hàng"
              name="bankBranch"
              value={formData.bankBranch}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ py: 1.5 }}
              onClick={handleSubmit}
            >
              Xác nhận
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AccountPage;
