"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { getRoomIsOpenedApi } from "@/services/room.api";
import { SignOutApi } from "@/services/auth/auth.api";
import { UserContext } from "@/contexts/user-context";
import { LogoutOutlined } from "@mui/icons-material";
import { numberThousand } from "@/utils/function-convert.util";

function HeaderComponent() {
  const router = useRouter();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const userContext = React.useContext(UserContext);
  const user = userContext?.user;
  const checkSession = userContext?.checkSession;

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("account");

    await SignOutApi();

    if (checkSession) {
      checkSession();
    }
    router.push("/");

    toast.success("Đăng xuất thành công");
  };

  const handleRedirectGame = async () => {
    if (!user) {
      router.push("/login");
    }
    try {
      const respone = await getRoomIsOpenedApi();
      if (
        (respone.status === 200 || respone.status === 201) &&
        respone.data._id
      ) {
        router.push(`/game/${respone.data._id}`);
      } else {
        toast.warning("Không có phòng được mở");
      }
    } catch (error) {
      console.log(error);
      router.push("/login");
    }
  };

  return (
    <AppBar
      sx={{
        position: "fixed", // Đặt vị trí sticky cho header
        top: 0, // Đảm bảo sticky hoạt động
        zIndex: 1100, // Đặt z-index cao để header luôn nằm trên các phần tử khác
        backgroundColor: "white", // Màu nền trắng cho header
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
              src={"/images/game.png"}
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
              href={"/support"}
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
          {user ? (
            <Box
              sx={{
                flexGrow: { xs: 1, md: 0 },
                gap: { xs: 1, md: 2 },
                display: "flex",
                textAlign: "right",
                justifyContent: "flex-end",
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
                <Tooltip title="Open settings" sx={{ p: 0, m: 0 }}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      sx={{ width: 28, height: 28 }}
                      alt="Remy Sharp"
                      src="/images/vn-flag.png"
                    />
                  </IconButton>
                </Tooltip>
                <Typography
                  variant="body2"
                  fontSize={20}
                  fontWeight={500}
                  sx={{ textWrap: "nowrap", color: "black", ml: 0.5, mr: 1 }}
                >
                  {numberThousand(user?.money?.toString() ?? "0") ?? 0}
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
                    <Avatar alt="Remy Sharp" sx={{ bgcolor: "#0d6efd" }}>
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
            <Box sx={{ flexGrow: 0, gap: { xs: 1, md: 2 }, display: "flex" }}>
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
