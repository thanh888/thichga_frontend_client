"use client";
import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ChangePinForm from "./user-account/change-pin";
import BankInfoForm from "./user-account/change-bank";
import ChangePasswordForm from "./user-account/change-password";
import { convertDateTime } from "@/utils/function-convert.util";
import { UserContext } from "@/contexts/user-context";
export default function UserAccount() {
  const userContext = useContext(UserContext);
  const user = userContext?.user;

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
                <Typography variant="caption">
                  {user?.username ?? "Chưa có"}
                </Typography>
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
                <Typography variant="caption">
                  {user?.phone ?? "Chưa có"}
                </Typography>
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
                <Typography variant="caption">
                  {user?.email ?? "Chưa có"}
                </Typography>
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
                <Typography variant="caption">
                  {convertDateTime(user?.createdAt?.toString() ?? "") ??
                    "Chưa có"}
                </Typography>
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
          mb: 8,
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
        {selectedIndex === 0 && <ChangePasswordForm />}
        {selectedIndex === 1 && <ChangePinForm />}
        {selectedIndex === 2 && <BankInfoForm />}
      </Box>
    </Box>
  );
}
