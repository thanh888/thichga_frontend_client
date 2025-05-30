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
  CircularProgress,
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
  const [rooms, setRooms] = React.useState<Room[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const getRoomsIsOpening = async () => {
    try {
      setIsLoading(true);
      const response = await getListOtherRoomsOpening();
      if (response.status === 200 || response.status === 201) {
        setRooms(response.data);
      }
    } catch (error) {
      console.log("Failed to fetch rooms:", error);
    } finally {
      setIsLoading(false);
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
            sx={{
              flexGrow: 1,
              textAlign: "center",
              fontSize: { xs: "1rem", sm: "1.25rem" },
            }}
          >
            CHỌN PHÒNG GÀ ĐÒN
          </Typography>
          <Box sx={{ width: { xs: 40, sm: 48 } }} />
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        component="main"
        maxWidth="xl"
        sx={{ p: { xs: 2, sm: 3 }, mx: "auto" }}
      >
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
            <CircularProgress />
          </Box>
        ) : rooms.length === 0 ? (
          <Typography sx={{ textAlign: "center", p: 3, color: "black" }}>
            Không có trận đấu nào được mở
          </Typography>
        ) : (
          <Grid
            container
            spacing={{ xs: 1, sm: 2 }}
            sx={{ justifyContent: "center", maxWidth: "xl", mx: "auto" }}
          >
            {rooms.map((room: Room) => (
              <Grid size={{ xs: 6, sm: 6, md: 3 }} key={room._id}>
                <Card
                  sx={{
                    border: "2px solid #d7b500",
                    borderRadius: 2,
                    boxShadow: 3,
                    "&:hover": {
                      boxShadow: 6,
                      bgcolor: "#fff8e1",
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
                        flexDirection: { xs: "column", sm: "row" },
                        textAlign: { xs: "center", sm: "left" },
                        p: { xs: 1.5, sm: 1 },
                      }}
                    >
                      <Box
                        component="img"
                        src="/images/ex-game.png"
                        alt={room.roomName}
                        sx={{
                          width: { xs: "100%", sm: 120 },
                          maxWidth: 120,
                          height: 120,
                          objectFit: "cover",
                          borderRadius: 1,
                          mb: { xs: 1, sm: 0 },
                        }}
                      />
                      <Box sx={{ p: { xs: 1, sm: 2 }, width: "100%" }}>
                        <Typography
                          variant="h6"
                          component="h4"
                          sx={{
                            fontWeight: "bold",
                            fontSize: { xs: "0.9rem", sm: "1rem" },
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {room.roomName}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#4caf50",
                            fontWeight: 500,
                            mt: 1,
                            fontSize: { xs: "0.8rem", sm: "0.875rem" },
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
        )}
      </Box>
    </Box>
  );
}
