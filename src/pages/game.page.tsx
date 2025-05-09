"use client";
import BetControls from "@/components/game/bet-control.game";
import BetInfo from "@/components/game/bet-info.game";
import GameFooter from "@/components/game/footer.game";
import GameHeader from "@/components/game/header.game";
import LiveStream from "@/components/game/live-stream.game";
import { getRoomById } from "@/services/room.api";
import { useSocket } from "@/socket";
import { BettingRoomInterface } from "@/utils/interfaces/bet-room.interface";
import {
  Box,
  Grid,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function GamePage() {
  const params = useParams();
  const roomID = params?.id.toString();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(true);
  const [isBetOpen, setIsBetOpen] = useState<boolean>(true);
  const [betRoom, setBetRoom] = useState<BettingRoomInterface>();

  const [userBetTotal, setUserBetTotal] = useState<number>(0);

  const [isReload, setIsReload] = useState<boolean>(true);
  const [isReloadBetting, setIsReloadBetting] = useState<boolean>(true);

  const [isClosed, setIsClosed] = useState<boolean>(false);

  const getBetRoomInfo = async (room_id: string) => {
    try {
      const response = await getRoomById(room_id);
      if (response.status === 200 || response.status === 201) {
        setBetRoom(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (roomID) {
      getBetRoomInfo(roomID);
    }
  }, [roomID]);

  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
    if (!roomID) return;

    socket.on("update-room", (msg) => {
      console.log("💰 Received update room:", msg);
      if (!msg.roomsOpening.includes(roomID)) {
        setIsClosed(true);
      }
    });

    socket.on("bet-history", (msg) => {
      console.log("💰 Received update history:", msg);
      if (msg.roomID === roomID) {
        setIsReloadBetting(true); // Add this to trigger BetInfo reload
      }
    });

    return () => {
      socket.off("update-room");
      socket.off("bet-history");
    };
  }, [socket, roomID]);

  // Handle closing the dialog
  const handleCloseDialog = () => {
    setIsClosed(false);
  };

  return (
    <div
      className="game-main"
      style={{
        position: "relative",
        backgroundColor: "#101828",
        minHeight: "100vh",
      }}
    >
      <GameHeader
        isCommentOpen={isCommentOpen}
        setIsCommentOpen={setIsCommentOpen}
        isBetOpen={isBetOpen}
        setIsBetOpen={setIsBetOpen}
        isReload={isReload}
      />
      <Box
        sx={{
          width: "100%",
          pt: { xs: "70px", sm: "96px" },
          pb: { xs: "60px", sm: "70px" },
          px: { xs: 1, sm: 2 },
          bgcolor: "#101828",
        }}
      >
        <Grid container spacing={{ xs: 1, sm: 2 }}>
          <Grid
            size={{ xs: 12, md: 3.5, lg: 3, xl: 2.5 }}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            {betRoom?.latestSessionID && (
              <BetInfo
                sessionID={betRoom.latestSessionID}
                isBetOpen={isBetOpen}
                setIsBetOpen={setIsBetOpen}
                betRoom={betRoom}
                isReloadBetting={isReloadBetting}
                setIsReloadBetting={setIsReloadBetting}
                setUserBetTotal={setUserBetTotal}
              />
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 5, lg: 6, xl: 7 }}>
            {betRoom?.urlType && betRoom?.urlLive && (
              <LiveStream
                sourceType={betRoom?.urlType}
                sourceUrl={betRoom?.urlLive}
              />
            )}
          </Grid>
          <Grid
            size={{ xs: 12, md: 3.5, lg: 3, xl: 2.5 }}
            sx={{
              display: { xs: isCommentOpen ? "block" : "none", md: "block" },
            }}
          >
            {betRoom?.latestSessionID && betRoom && (
              <BetControls
                isCommentOpen={isCommentOpen}
                setIsCommentOpen={setIsCommentOpen}
                setIsReloadBetting={setIsReload}
                sessionID={betRoom.latestSessionID}
                betRoom={betRoom}
              />
            )}
          </Grid>
        </Grid>
      </Box>
      <GameFooter userBetTotal={userBetTotal} />

      {/* Dialog for notifying room closure */}
      <Dialog
        open={isClosed}
        onClose={handleCloseDialog}
        maxWidth="xs"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "12px",
            backgroundColor: "#1E2A44",
            color: "#FFFFFF",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "#FFD700",
            pt: 3,
          }}
        >
          Phòng cược đã đóng
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", px: 4, py: 2 }}>
          <Typography sx={{ color: "#E0E0E0", fontSize: "1rem" }}>
            Phòng cược hiện tại đã đóng. Vui lòng rời khỏi và quay lại sau
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            sx={{
              backgroundColor: "#3B82F6",
              color: "#FFFFFF",
              textTransform: "none",
              fontWeight: 500,
              borderRadius: "8px",
              px: 4,
              "&:hover": {
                backgroundColor: "#2563EB",
              },
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
