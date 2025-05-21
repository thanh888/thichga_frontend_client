"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Box, CircularProgress, Grid } from "@mui/material";
import HeaderExGame from "@/components/ex-game/header.ex-game";
import LiveStreamContainer from "@/components/ex-game/live-stream.ex-game";
import BetOptionTable from "@/components/ex-game/bet-option";
import WagerModal from "@/components/ex-game/WagerModal";
import PlaceBetModal from "@/components/ex-game/PlaceBetModal";
import HistoryModal from "@/components/ex-game/HistoryModal";
import { BettingRoomInterface } from "@/utils/interfaces/bet-room.interface";
import { getRoomById } from "@/services/room.api";

export default function ExGameDetailPage(): React.JSX.Element {
  const router = useRouter();

  const [isReloadOption, setIsReloadOption] = useState<boolean>(true);

  const [isWagerModalOpen, setWagerModalOpen] = useState(false);
  const [isPlaceBetModalOpen, setPlaceBetModalOpen] = useState(false);
  const [isChatModalOpen, setChatModalOpen] = useState(false);
  const [isHistoryModalOpen, setHistoryModalOpen] = useState(false);
  const [placeBetAction, setPlaceBetAction] = useState("");
  const [loading, setLoading] = useState(true);

  // if (loading) {
  //   return (
  //     <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

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
    <Box sx={{ bgcolor: "black", height: "100vh", overflow: "hidden" }}>
      <HeaderExGame
        onChatClick={() => setChatModalOpen(true)}
        onHistoryClick={() => setHistoryModalOpen(true)}
      />

      <Box
        component="main"
        sx={{
          p: 1,
          mx: "auto",
          maxWidth: "xl",
          overflow: "auto", // Enable scrolling for the main content
          maxHeight: "calc(100vh - 64px)", // Adjust for header height
        }}
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 8, xl: 9 }}>
            <LiveStreamContainer
              betRoom={betRoom}
              onWagerClick={() => setWagerModalOpen(true)}
            />
          </Grid>
          <Grid
            size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 3 }}
            sx={{ overflow: "auto", maxHeight: "100%" }}
          >
            {betRoom.latestSessionID && (
              <BetOptionTable
                // betOdds={betOdds}
                // userId={USER_ID}
                // onBetClick={handleOpenPlaceBetModal}
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
      <PlaceBetModal
        open={isPlaceBetModalOpen}
        onClose={() => setPlaceBetModalOpen(false)}
        action={placeBetAction}
      />
      {betRoom.latestSessionID && (
        <HistoryModal
          open={isHistoryModalOpen}
          onClose={() => setHistoryModalOpen(false)}
          sessionID={betRoom.latestSessionID}
        />
      )}
    </Box>
  );
}
