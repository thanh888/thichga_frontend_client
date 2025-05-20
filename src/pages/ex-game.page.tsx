"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  AppBar,
  Card,
  CardContent,
  IconButton,
  Toolbar,
  Typography,
  ButtonBase,
} from "@mui/material";
import { Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box } from "@mui/system";

interface Room {
  id: string;
  name: string;
  status: string;
  thumbnail: string;
  href: string;
}

const rooms: Room[] = [
  {
    id: "211",
    name: "MỘC HÓA ĐỘ 1",
    status: "Đang mở phiên",
    thumbnail:
      "https://png.pngtree.com/png-vector/20240913/ourmid/pngtree-cockfighting-png-image_13254300.png",
    href: "/ex-game/211",
  },
  {
    id: "32",
    name: "MỘC HÓA ĐỘ 2",
    status: "Đang mở phiên",
    thumbnail:
      "https://png.pngtree.com/png-vector/20240913/ourmid/pngtree-cockfighting-png-image_13254300.png",
    href: "/ex-game/32",
  },
  {
    id: "322",
    name: "MỘC HÓA ĐỘ 3",
    status: "Đang mở phiên",
    thumbnail:
      "https://png.pngtree.com/png-vector/20240913/ourmid/pngtree-cockfighting-png-image_13254300.png",
    href: "/ex-game/322",
  },
  {
    id: "42",
    name: "MỘC HÓA ĐỘ 4",
    status: "Đang mở phiên",
    thumbnail:
      "https://png.pngtree.com/png-vector/20240913/ourmid/pngtree-cockfighting-png-image_13254300.png",
    href: "/ex-game/42",
  },
];

export default function ExGamePage(): React.JSX.Element {
  const router = useRouter();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      {/* Header */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => router.back()}
            aria-label="back"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="span"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            CHỌN PHÒNG GÀ ĐÒN
          </Typography>
          <Box sx={{ width: 48 }} /> {/* Spacer for alignment */}
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box component="main" maxWidth="xl" sx={{ p: 3, mx: "auto" }}>
        <Grid
          container
          spacing={2}
          sx={{
            justifyContent: "center",
            maxWidth: "xl",
            mx: "auto",
          }}
        >
          {rooms.map((room) => (
            <Grid size={{ xs: 6, sm: 6, md: 3 }} key={room.id}>
              <Card
                sx={{
                  border: "2px solid #d7b500", // Gold border
                  borderRadius: 2,
                  boxShadow: 3,
                  "&:hover": {
                    boxShadow: 6, // Stronger shadow on hover
                    bgcolor: "#fff8e1", // Light gold background
                  },
                }}
              >
                <ButtonBase
                  component={Link}
                  href={room.href}
                  sx={{ width: "100%", p: 0, m: 0 }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      textAlign: "left",
                      p: 1,
                    }}
                  >
                    <Box
                      component="img"
                      src={room.thumbnail}
                      alt={room.name}
                      sx={{
                        width: 120, // Fixed width for side-by-side layout
                        height: 120,
                        objectFit: "cover",
                        borderRadius: 1,
                      }}
                    />
                    <Box sx={{ p: 2, width: "100%" }}>
                      <Typography
                        variant="h6"
                        component="h4"
                        sx={{ fontWeight: "bold" }}
                      >
                        {room.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color:
                            room.status === "Đang mở phiên"
                              ? "#4caf50"
                              : "#f44336",
                          fontWeight: 500,
                          mt: 1,
                        }}
                      >
                        {room.status}
                      </Typography>
                    </Box>
                  </CardContent>
                </ButtonBase>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
