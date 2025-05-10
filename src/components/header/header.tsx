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
import { useUser } from "@/hooks/use-user";
import { toast } from "react-toastify";
import { getRoomIsOpenedApi } from "@/services/room.api";

const pages = [
  { name: "ĐÁ GÀ", path: "/game" },
  { name: "HƯỚNG DẪN", path: "/support" },
];
const settings = ["Đăng xuất"];

function HeaderComponent() {
  const router = useRouter();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const { user } = useUser();
  const { checkSession } = useUser();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("account");

    if (checkSession) {
      checkSession();
    }

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
              width={50}
              height={50}
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
            {/* {pages.map((page) => (
              <Link
                className="hover:text-blue-500"
                href={page.path}
                key={page.name}
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                {page.name}
              </Link>
            ))} */}
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
                flexGrow: 0,
                gap: { xs: 1, md: 2 },
                display: "flex",
                position: "relative",
              }}
            >
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://cdn.pixabay.com/photo/2016/11/01/21/11/avatar-1789663_640.png"
                  />
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
