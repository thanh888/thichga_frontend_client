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
import { getListOtherRoomsOpening } from "@/services/room.api";

interface Room {
  _id: string;
  roomName: string;
}

export default function ExGamePage(): React.JSX.Element {
  const router = useRouter();

  const [rooms, setRooms] = React.useState<any>([]);

  const getRoomsIsOpening = async () => {
    try {
      const response = await getListOtherRoomsOpening();
      if (response.status === 200 || response.status === 201) {
        setRooms(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getRoomsIsOpening();
  }, []);

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
            onClick={() => router.push("/")}
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
          {rooms.map((room: Room) => (
            <Grid size={{ xs: 6, sm: 6, md: 3 }} key={room._id}>
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
                  href={`ex-game/${room._id}`}
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
                      src={"images/ex-game.png"}
                      alt={room.roomName}
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
                        {room.roomName}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#4caf50",
                          fontWeight: 500,
                          mt: 1,
                        }}
                      >
                        Đang mở phiên
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
