"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Select,
  Button,
  Grid,
} from "@mui/material";

export default function UserAccount() {
  const [transferType, setTransferType] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const handleSelectIndex = (index: number) => {
    setSelectedIndex(index);
  };
  return (
    <Box>
      <Box
        mb={2}
        sx={{
          flexGrow: 1,
          width: "100%",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          backgroundColor: "white",
        }}
      >
        <Grid container spacing={2}>
          <Grid size={6} sx={{ borderRight: "1px solid #e0e0e0" }}>
            <Box
              width={"100%"}
              textAlign="left"
              sx={{ p: 1, flexDirection: "column", gap: 2 }}
            >
              <Typography
                variant="body2"
                sx={{
                  width: "100%",
                  justifyContent: "space-between",
                  display: "flex",
                }}
              >
                Họ và tên:
                <Typography variant="caption">Chưa có</Typography>
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  width: "100%",
                  justifyContent: "space-between",
                  display: "flex",
                  my: 1,
                }}
              >
                Số điện thoại:
                <Typography variant="caption">Chưa có</Typography>
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  width: "100%",
                  justifyContent: "space-between",
                  display: "flex",
                }}
              >
                Email:
                <Typography variant="caption">Chưa có</Typography>
              </Typography>
            </Box>
          </Grid>
          <Grid size={6}>
            <Box
              width={"100%"}
              textAlign="left"
              sx={{ p: 1, flexDirection: "column", gap: 2 }}
            >
              <Typography
                variant="body2"
                sx={{
                  width: "100%",
                  justifyContent: "space-between",
                  display: "flex",
                }}
              >
                Thời gian đăng ký:
                <Typography variant="caption">Chưa có</Typography>
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  width: "100%",
                  justifyContent: "space-between",
                  display: "flex",
                  my: 1,
                }}
              >
                IP lần đăng nhập cuối:
                <Typography variant="caption">09:21 14-04-2025</Typography>
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  width: "100%",
                  justifyContent: "space-between",
                  display: "flex",
                }}
              >
                IpV6:
                <Typography variant="caption">
                  2405:4802:b27b:b750:465:3214:3265:db51
                </Typography>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          p: 2,
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Button
            variant={selectedIndex === 0 ? "contained" : "text"}
            sx={{ width: "100%" }}
            onClick={() => handleSelectIndex(0)}
          >
            Đổi mật khẩu
          </Button>
          <Button
            variant={selectedIndex === 1 ? "contained" : "text"}
            sx={{ width: "100%" }}
            onClick={() => handleSelectIndex(1)}
          >
            Đổi pin mặc định
          </Button>
          <Button
            variant={selectedIndex === 2 ? "contained" : "text"}
            color="primary"
            sx={{ width: "100%" }}
            onClick={() => handleSelectIndex(2)}
          >
            Ngân hàng
          </Button>
        </Box>
        {selectedIndex === 0 && (
          <Box className="bank-form" component="form" sx={{ p: 2 }}>
            <Typography variant="body1" mb={1}>
              Mật khẩu cũ
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Mật khẩu cũ"
              sx={{ mb: 2 }}
            />

            <Typography variant="body1" mb={1}>
              Mật khẩu mới
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Mật khẩu mới"
              sx={{ mb: 2 }}
            />

            <Typography variant="body1" mb={1}>
              Xác thực mật khẩu
            </Typography>

            <TextField
              fullWidth
              variant="outlined"
              placeholder="Xác thực mật khẩu"
              sx={{ mb: 2 }}
            />

            <Box display="flex" justifyContent="center" mt={3}>
              <Button
                variant="contained"
                color="primary"
                sx={{ width: "100%" }}
              >
                Xác nhận
              </Button>
            </Box>
          </Box>
        )}
        {selectedIndex === 1 && (
          <Box className="bank-form" component="form" sx={{ p: 2 }}>
            <Typography variant="body1" mb={1}>
              Mã pin mới
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Mã pin mới"
              sx={{ mb: 2 }}
            />

            <Typography variant="body1" mb={1}>
              Xác thực mã pin mới
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Xác thực mã pin mới"
              sx={{ mb: 2 }}
            />

            <Box display="flex" justifyContent="center" mt={3}>
              <Button
                variant="contained"
                color="primary"
                sx={{ width: "100%" }}
              >
                Xác nhận
              </Button>
            </Box>
          </Box>
        )}
        {selectedIndex === 2 && (
          <Box className="bank-form" component="form" sx={{ p: 2 }}>
            <Typography variant="body1" mb={1}>
              Họ và tên
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Họ và tên"
              sx={{ mb: 2 }}
            />

            <Typography variant="body1" mb={1}>
              Số tài khoản
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Số tài khoản"
              sx={{ mb: 2 }}
            />

            <Typography variant="body1" mb={1}>
              Ngân hàng
            </Typography>
            <Select
              fullWidth
              value={transferType}
              onChange={(e) => setTransferType(e.target.value)}
              displayEmpty
              variant="outlined"
              sx={{ mb: 2 }}
            >
              <MenuItem value="" disabled>
                -- Chọn ngân hàng --
              </MenuItem>
              <MenuItem value="vietcombank">Vietcombank</MenuItem>
              <MenuItem value="techcombank">Techcombank</MenuItem>
              <MenuItem value="bidv">BIDV</MenuItem>
            </Select>

            <Typography variant="body1" mb={1}>
              Chi nhánh ngân hàng
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Chi nhánh ngân hàng"
              sx={{ mb: 2 }}
            />

            <Box display="flex" justifyContent="center" mt={3}>
              <Button
                variant="contained"
                color="primary"
                sx={{ width: "100%" }}
              >
                Xác nhận
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
