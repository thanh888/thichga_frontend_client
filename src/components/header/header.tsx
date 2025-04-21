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

const pages = [
  { name: "ĐÁ GÀ", path: "/game" },
  { name: "HƯỚNG DẪN", path: "/support" },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function HeaderComponent() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      sx={{
        position: "sticky", // Đặt vị trí sticky cho header
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
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 2 }}
          >
            {pages.map((page) => (
              <Link
                className="hover:text-blue-500"
                href={page.path}
                key={page.name}
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                {page.name}
              </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}></Box>
          <Box sx={{ flexGrow: 0, gap: { xs: 1, md: 2 }, display: "flex" }}>
            <Button
              variant="contained"
              sx={{
                width: "auto",
              }}
            >
              Đăng nhập
            </Button>
            <Button variant="outlined">Đăng ký</Button>
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default HeaderComponent;
