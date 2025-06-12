"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Avatar,
  Button,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import Link from "next/link";
import { toast } from "react-toastify";
import { getRoomIsOpenedApi } from "@/services/room.api";
import { SignOutApi } from "@/services/auth/auth.api";
import { UserContext } from "@/contexts/user-context";
import { LogoutOutlined } from "@mui/icons-material";
import { numberThousandFload } from "@/utils/function-convert.util";

function HeaderComponent() {
  const router = useRouter();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const userContext = React.useContext(UserContext);
  const user = userContext?.user;
  const isLoading = userContext?.isLoading;
  const checkSession = userContext?.checkSession;

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("access_token");
      localStorage.removeItem("account");
      await SignOutApi();
      if (checkSession) {
        checkSession();
      }
      router.push("/");
      toast.success("Đăng xuất thành công");
    } catch (error) {
      console.log("Logout failed:", error);
      toast.error("Đăng xuất thất bại, vui lòng thử lại");
    }
  };

  const handleRedirectGame = async () => {
    if (!user?._id) {
      router.push("/login");
      return;
    }
    try {
      const response = await getRoomIsOpenedApi();
      if (
        (response.status === 200 || response.status === 201) &&
        response.data._id
      ) {
        router.push(`/game/${response.data._id}`);
      } else {
        toast.warning("Không có trận đấu nào được mở");
      }
    } catch (error) {
      console.log("Redirect game failed:", error);
      router.push("/login");
    }
  };

  // Prevent rendering during loading to avoid flickering
  if (isLoading) {
    return null;
  }

  return (
    <AppBar
      sx={{
        position: "fixed",
        top: 0,
        zIndex: 1100,
        backgroundColor: "white",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <img
              alt="logo_thichga"
              src="/images/game.png"
              width={60}
              height={60}
            />
          </Link>

          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                md: "flex",
                justifyContent: "right",
                alignItems: "center",
                mx: 2,
                marginRight: 10,
              },
              gap: 2,
            }}
          >
            <Link
              href="#"
              className="hover:text-blue-500"
              onClick={handleRedirectGame}
              passHref
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              Game
            </Link>
            <Link
              href="/support"
              className="hover:text-blue-500"
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              Hướng dẫn
            </Link>
          </Box>

          {user?._id ? (
            <Box
              sx={{
                flexGrow: { xs: 1, md: 0 },
                gap: { xs: 1, md: 2 },
                display: "flex",
                textAlign: "right",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  flexGrow: 0,
                  display: "flex",
                  position: "relative",
                  border: "1px solid black",
                  p: 0.2,
                  borderRadius: 10,
                  alignItems: "center",
                }}
              >
                <IconButton sx={{ p: 0 }}>
                  <Avatar
                    sx={{ width: 28, height: 28 }}
                    alt="User Avatar"
                    src="/images/vn-flag.png"
                  />
                </IconButton>
                <Typography
                  variant="body2"
                  fontSize={20}
                  fontWeight={500}
                  sx={{ textWrap: "nowrap", color: "black", ml: 0.5, mr: 1 }}
                >
                  {numberThousandFload(user?.money?.toString() ?? "0") ?? 0}
                </Typography>
              </Box>
              <Box
                sx={{
                  flexGrow: 0,
                  gap: { xs: 1, md: 2 },
                  display: "flex",
                  position: "relative",
                }}
              >
                <Tooltip title="Đăng xuất">
                  <IconButton onClick={handleLogout} sx={{ p: 0 }}>
                    <Avatar alt="Logout" sx={{ bgcolor: "#0d6efd" }}>
                      <LogoutOutlined />
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleLogout}>
                    <Typography sx={{ textAlign: "center" }}>
                      Đăng xuất
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                gap: { xs: 1, md: 2 },
                flexGrow: { xs: 1, md: 0 },
                display: "flex",
                textAlign: "right",
                justifyContent: "flex-end",
              }}
            >
              <Button variant="contained" onClick={() => router.push("/login")}>
                Đăng nhập
              </Button>
              <Button
                variant="outlined"
                onClick={() => router.push("/register")}
              >
                Đăng ký
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default HeaderComponent;
