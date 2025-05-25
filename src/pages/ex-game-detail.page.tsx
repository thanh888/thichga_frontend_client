"use client";
import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import HeaderExGame from "@/components/ex-game/header.ex-game";
import LiveStreamContainer from "@/components/ex-game/live-stream.ex-game";
import BetOptionTable from "@/components/ex-game/bet-option";
import WagerModal from "@/components/ex-game/WagerModal";
import PlaceBetModal from "@/components/ex-game/PlaceBetModal";
import HistoryModal from "@/components/ex-game/HistoryModal";
import { BettingRoomInterface } from "@/utils/interfaces/bet-room.interface";
import { getRoomById } from "@/services/room.api";
import { useParams } from "next/navigation";
import UserBetHistories from "@/components/ex-game/user-bet-history.ex-game";

export default function ExGameDetailPage(): React.JSX.Element {
  const [isReloadOption, setIsReloadOption] = useState<boolean>(true);
  const [isWagerModalOpen, setWagerModalOpen] = useState<boolean>(false);
  const [isPlaceBetModalOpen, setPlaceBetModalOpen] = useState<any>(null);
  const [isHistoryModalOpen, setHistoryModalOpen] = useState<boolean>(false);
  const param = useParams();
  const roomID = param?.id?.toString();
  const [betRoom, setBetRoom] = useState<BettingRoomInterface>({});

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

  return (
    <Box sx={{ bgcolor: "black", minHeight: "100vh", overflow: "hidden" }}>
      <HeaderExGame onHistoryClick={() => setHistoryModalOpen(true)} />
      <Box
        component="main"
        sx={{
          p: 1,
          mx: "auto",
          maxWidth: "xl",
          maxHeight: "calc(100vh - 64px)", // Subtract header height
          overflowY: "auto", // Enable vertical scrolling if needed
        }}
      >
        <Grid container spacing={2}>
          <Grid
            size={{ xs: 12, sm: 12, md: 6, lg: 8, xl: 9 }}
            sx={{ height: "100%" }}
          >
            <LiveStreamContainer
              betRoom={betRoom}
              onWagerClick={() => setWagerModalOpen(true)}
            />
          </Grid>
          <Grid
            size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 3 }}
            sx={{ maxHeight: "calc(100vh - 80px)", overflowY: "auto" }}
          >
            {betRoom.latestSessionID && (
              <BetOptionTable
                setOpenBetting={setPlaceBetModalOpen}
                isReloadOption={isReloadOption}
                setIsreloadOption={setIsReloadOption}
                sessionID={betRoom.latestSessionID}
              />
            )}
          </Grid>
        </Grid>
      </Box>
      {betRoom.latestSessionID && (
        <WagerModal
          open={isWagerModalOpen}
          onClose={() => setWagerModalOpen(false)}
          sessionID={betRoom.latestSessionID}
          setIsReloadOption={setIsReloadOption}
        />
      )}
      {betRoom.latestSessionID && (
        <PlaceBetModal
          open={isPlaceBetModalOpen}
          onClose={() => setPlaceBetModalOpen(false)}
          sessionID={betRoom.latestSessionID}
          setIsReloadOption={setIsReloadOption}
        />
      )}
      {betRoom.latestSessionID && (
        <UserBetHistories
          betHistoryDialogOpen={isHistoryModalOpen}
          setBetHistoryDialogOpen={setHistoryModalOpen}
        />
      )}
    </Box>
  );
}
