"use client";
import BetControls from "@/components/game/bet-control.game";
import BetInfo from "@/components/game/bet-info.game";
import GameFooter from "@/components/game/footer.game";
import GameHeader from "@/components/game/header.game";
import LiveStream from "@/components/game/live-stream.game";
import { getRoomById } from "@/services/room.api";
import { useSocket } from "@/socket";
import { BettingRoomInterface } from "@/utils/interfaces/bet-room.interface";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
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
  const [isReload, setIsReload] = useState<boolean>(true);
  const [isClosed, setIsClosed] = useState<boolean>(false);

  const [roomsOpening, setRoomsOpening] = useState<string[]>([]);

  const getBetRoomInfo = async (room_id: string) => {
    try {
      const response = await getRoomById(room_id);
      if (response.status === 200 || response.status === 201) {
        setBetRoom(response.data);
        // const sessionData = await getSessionIsOpenedApi(room_id)
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

  useEffect(() => {
    if (isClosed) {
      alert(123);
      setIsClosed(false);
    }
  }, [isClosed]);

  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
    if (!roomID) return;

    socket.on("update-room", (msg) => {
      console.log("💰 Received update room:", msg);
      // setRoomsOpening(msg.roomsOpening);
      console.log("werewr: ", !!msg.roomsOpening.includes(roomID));

      if (!msg.roomsOpening.includes(roomID)) {
        console.log("rewrwer");

        setIsClosed(true);
      }
    });

    socket.on("deposit-money", (msg) => {
      console.log("💰 Received deposit:", msg);
    });

    return () => {
      socket.off("deposit-money");
    };
  }, [socket, roomID]);

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
            {betRoom?.latestSessionID && (
              <BetInfo
                sessionID={betRoom.latestSessionID}
                isBetOpen={isBetOpen}
                setIsBetOpen={setIsBetOpen}
                isReload={isReload}
                setIsReload={setIsReload}
                betRoom={betRoom}
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
                setIsReload={setIsReload}
                sessionID={betRoom.latestSessionID}
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
