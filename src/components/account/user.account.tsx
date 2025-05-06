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
  useMediaQuery,
  useTheme,
} from "@mui/material";

export default function UserAccount() {
  const [transferType, setTransferType] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSelectIndex = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ px: { xs: 1, sm: 2 }, py: { xs: 1, sm: 2 } }}>
      <Box
        mb={{ xs: 1, sm: 2 }}
        sx={{
          flexGrow: 1,
          width: "100%",
          padding: { xs: "12px", sm: "16px" },
          borderRadius: "8px",
          boxShadow: {
            xs: "0 1px 5px rgba(0,0,0,0.1)",
            sm: "0 2px 10px rgba(0,0,0,0.1)",
          },
          backgroundColor: "white",
        }}
      >
        <Grid
          container
          spacing={{ xs: 1, sm: 2 }}
          direction={isMobile ? "column" : "row"}
        >
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              borderRight: { md: "1px solid #e0e0e0", xs: "none" },
              pb: { xs: 1, md: 0 },
            }}
          >
            <Box
              width={"100%"}
              textAlign="left"
              sx={{
                p: { xs: 0.5, sm: 1 },
                display: "flex",
                flexDirection: "column",
                gap: { xs: 1, sm: 2 },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  width: "100%",
                  justifyContent: "space-between",
                  display: "flex",
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
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
                  my: { xs: 0.5, sm: 1 },
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
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
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                }}
              >
                Email:
                <Typography variant="caption">Chưa có</Typography>
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              width={"100%"}
              textAlign="left"
              sx={{
                p: { xs: 0.5, sm: 1 },
                display: "flex",
                flexDirection: "column",
                gap: { xs: 1, sm: 2 },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  width: "100%",
                  justifyContent: "space-between",
                  display: "flex",
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
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
                  my: { xs: 0.5, sm: 1 },
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
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
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
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
          p: { xs: 1, sm: 2 },
          borderRadius: "8px",
          boxShadow: {
            xs: "0 1px 5px rgba(0,0,0,0.1)",
            sm: "0 2px 10px rgba(0,0,0,0.1)",
          },
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          mb={{ xs: 1, sm: 2 }}
          gap={1}
        >
          <Button
            variant={selectedIndex === 0 ? "contained" : "text"}
            sx={{
              width: "100%",
              fontSize: { xs: "0.7rem", sm: "0.875rem" },
              py: { xs: 0.5, sm: 1 },
              minHeight: { xs: "32px", sm: "36px" },
            }}
            onClick={() => handleSelectIndex(0)}
          >
            Đổi mật khẩu
          </Button>
          <Button
            variant={selectedIndex === 1 ? "contained" : "text"}
            sx={{
              width: "100%",
              fontSize: { xs: "0.7rem", sm: "0.875rem" },
              py: { xs: 0.5, sm: 1 },
              minHeight: { xs: "32px", sm: "36px" },
            }}
            onClick={() => handleSelectIndex(1)}
          >
            Đổi pin mặc định
          </Button>
          <Button
            variant={selectedIndex === 2 ? "contained" : "text"}
            color="primary"
            sx={{
              width: "100%",
              fontSize: { xs: "0.7rem", sm: "0.875rem" },
              py: { xs: 0.5, sm: 1 },
              minHeight: { xs: "32px", sm: "36px" },
            }}
            onClick={() => handleSelectIndex(2)}
          >
            Ngân hàng
          </Button>
        </Box>
        {selectedIndex === 0 && (
          <Box
            className="bank-form"
            component="form"
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
        )}
        {selectedIndex === 1 && (
          <Box
            className="bank-form"
            component="form"
            sx={{ p: { xs: 1, sm: 2 } }}
          >
            <Typography
              variant="body1"
              mb={1}
              fontSize={{ xs: "0.875rem", sm: "1rem" }}
            >
              Mã pin mới
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Mã pin mới"
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
              Xác thực mã pin mới
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Xác thực mã pin mới"
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
        )}
        {selectedIndex === 2 && (
          <Box
            className="bank-form"
            component="form"
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
                sx={{ fontSize: { xs: "0.75rem", sm: "metry" } }}
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
        )}
      </Box>
    </Box>
  );
}
