"use client";
import BetControls from "@/components/game/bet-control.game";
import BetInfo from "@/components/game/bet-info.game";
import GameFooter from "@/components/game/footer.game";
import GameHeader from "@/components/game/header.game";
import LiveStream from "@/components/game/live-stream.game";
import { getSessionIsOpenedApi } from "@/services/bet-session.api";
import { getRoomById } from "@/services/room.api";
import { BettingRoomInterface } from "@/utils/interfaces/bet-room.interface";
import { BettingSessionInterface } from "@/utils/interfaces/bet-sesion.interface";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function GamePage() {
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(true);
  const [isBetOpen, setIsBetOpen] = useState<boolean>(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [betSession, setBetSession] = useState<BettingSessionInterface>();
  const [betRoom, setBetRoom] = useState<BettingRoomInterface>();
  const [isReload, setIsReload] = useState<boolean>(true);

  const params = useParams();

  const roomID = params?.id.toString();

  const getSessionIsOpened = async (room_id: string) => {
    try {
      const response = await getSessionIsOpenedApi(room_id);
      if (response.status === 200 || response.status === 201) {
        setBetSession(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      getSessionIsOpened(roomID);
      getBetRoomInfo(roomID);
    }
  }, [roomID]);

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
      />
      <Box
        sx={{
          width: "100%",
          pt: { xs: "70px", sm: "96px" },
          pb: { xs: "60px", sm: "70px" }, // Space for GameFooter
          px: { xs: 1, sm: 2 },
          bgcolor: "#101828",
        }}
      >
        <Grid container spacing={{ xs: 1, sm: 2 }}>
          <Grid
            size={{ xs: 12, md: 3.5, lg: 3, xl: 2.5 }}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            {betSession && (
              <BetInfo
                sessionID={betSession._id}
                isBetOpen={isBetOpen}
                setIsBetOpen={setIsBetOpen}
                isReload={isReload}
                setIsReload={setIsReload}
                betRoom={betRoom}
              />
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 5, lg: 6, xl: 7 }}>
            <LiveStream />
          </Grid>
          <Grid
            size={{ xs: 12, md: 3.5, lg: 3, xl: 2.5 }}
            sx={{
              display: { xs: isCommentOpen ? "block" : "none", md: "block" },
            }}
          >
            {betSession && betRoom && (
              <BetControls
                isCommentOpen={isCommentOpen}
                setIsCommentOpen={setIsCommentOpen}
                setIsReload={setIsReload}
                sessionID={betSession._id}
                betRoom={betRoom}
              />
            )}
          </Grid>
        </Grid>
      </Box>
      <GameFooter />
    </div>
  );
}
