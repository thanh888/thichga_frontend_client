"use client";
import BetControls from "@/components/game/bet-control.game";
import BetInfo from "@/components/game/bet-solo.game";
import BetNormal from "@/components/game/bet-normal.game";
import GameFooter from "@/components/game/footer.game";
import GameHeader from "@/components/game/header.game";
import LiveStream from "@/components/game/live-stream.game";
import { getListRoomsOpening, getRoomById } from "@/services/room.api";
import { useSocket } from "@/socket";
import { TypeBetRoomEnum } from "@/utils/enum/type-bet-room.enum";
import { BettingRoomInterface } from "@/utils/interfaces/bet-room.interface";
import { Box, Grid, Dialog, DialogTitle } from "@mui/material";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import CommentComponent from "@/components/game/comment.game";
import { UserContext } from "@/contexts/user-context";

// GameDetailPage.tsx
export default function GameDetailPage() {
  const params = useParams();
  const roomID = params?.id.toString();
  const userContext = useContext(UserContext);
  const checkSession = userContext?.checkSession;
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);
  const [isBetOpen, setIsBetOpen] = useState<boolean>(true);
  const [betRoom, setBetRoom] = useState<BettingRoomInterface>();
  const [userBetTotal, setUserBetTotal] = useState<number>(0);

  const [isReload, setIsReload] = useState<number>(0);

  const [isReloadBetting, setIsReloadBetting] = useState<number>(0);

  const [isClosed, setIsClosed] = useState<boolean>(false);

  const socket = useSocket();

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
    if (isClosed) {
      const timer = setTimeout(() => {
        setIsClosed(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isClosed]);

  const checkRoomClosed = async () => {
    try {
      const response = await getListRoomsOpening();
      if (response.status === 200 || response.status === 201) {
        const checkIsClosed = !response?.data?.some(
          (item: BettingRoomInterface) => item._id === roomID
        );

        setIsClosed(checkIsClosed);
        await checkSession?.();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (roomID) {
      getBetRoomInfo(roomID);
    }
  }, [roomID, isReload]);

  useEffect(() => {
    if (!socket || !roomID) return;
    socket.on("update-room", async () => {
      setIsReload((prev) => prev + 1);
      setIsReloadBetting((prev) => prev + 1);
      await checkRoomClosed();
    });
    socket.on("bet-history", (msg) => {
      if (msg.roomID === roomID) setIsReloadBetting((prev) => prev + 1);
    });
    return () => {
      socket.off("update-room");
      socket.off("bet-history");
    };
  }, [socket, roomID]);

  const handleCloseDialog = () => setIsClosed(false);

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
        setIsReload={setIsReload}
      />
      <Box
        sx={{
          width: "100%",
          pt: { xs: "70px", sm: "96px" },
          pb: { xs: "60px", sm: "70px" },
          px: { xs: 1, sm: 2 },
          bgcolor: "#101828",
          position: "fixed",
        }}
      >
        <Grid container spacing={{ xs: 1, sm: 2 }}>
          <Grid
            size={{ xs: 12, md: 3.5, lg: 3, xl: 2.5 }}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            {betRoom?.latestSessionID &&
              betRoom.typeRoom === TypeBetRoomEnum.SOLO && (
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
            {betRoom?.latestSessionID &&
              betRoom.typeRoom === TypeBetRoomEnum.NORMAL && (
                <BetNormal
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
              <LiveStream betRoom={betRoom} />
            )}
          </Grid>
          <Grid
            size={{ xs: 12, md: 3.5, lg: 3, xl: 2.5 }}
            sx={{ display: "block" }}
          >
            {betRoom?.latestSessionID &&
              betRoom.typeRoom === TypeBetRoomEnum.SOLO && (
                <BetControls
                  setIsReloadBetting={setIsReloadBetting}
                  sessionID={betRoom.latestSessionID}
                  betRoom={betRoom}
                />
              )}
            <CommentComponent
              isCommentOpen={isCommentOpen}
              setIsCommentOpen={setIsCommentOpen}
              betRoom={betRoom}
            />
          </Grid>
        </Grid>
      </Box>
      <GameFooter userBetTotal={userBetTotal} />
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
            fontSize: "1.2rem",
            fontWeight: 600,
            color: "#d7b500",
            py: 3,
          }}
        >
          Kết thúc
        </DialogTitle>
      </Dialog>
    </div>
  );
}
