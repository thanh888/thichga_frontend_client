"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, CircularProgress, Grid } from "@mui/material";
import HeaderExGame from "@/components/ex-game/header.ex-game";
import LiveStreamContainer from "@/components/ex-game/live-stream.ex-game";
import BetOptionTable from "@/components/ex-game/bet-option";
import WagerModal from "@/components/ex-game/WagerModal";
import PlaceBetModal from "@/components/ex-game/PlaceBetModal";
import HistoryModal from "@/components/ex-game/HistoryModal";

interface BetOdds {
  id: string;
  oddsA: number;
  oddsB: number;
  targetBet: "A" | "B";
  totalMatchPoolOnA: number;
  totalMatchPoolOnB: number;
  matchPools: { user: { id: number }; amount: number }[];
  matchedBets: { user: { id: number }; betTarget: "A" | "B"; amount: number }[];
}

interface Session {
  id: string;
  suggestOddsText: [string, string];
  status: "OPEN" | "CLOSED";
  result?: "A" | "B" | "T" | "X";
  nameOfA?: string;
  nameOfB?: string;
}

const USER_ID = 104;
const GAME_ID = "211";

export default function ExGameDetailPage(): React.JSX.Element {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [betOdds, setBetOdds] = useState<BetOdds[]>([]);
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
        <Grid container spacing={2} sx={{ height: "100%" }}>
          <Grid item size={{ xs: 12, sm: 12, md: 6, lg: 8, xl: 9 }}>
            <LiveStreamContainer
              session={session}
              onWagerClick={() => setWagerModalOpen(true)}
            />
          </Grid>
          <Grid
            item
            size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 3 }}
            sx={{ overflow: "auto", maxHeight: "100%" }}
          >
            <BetOptionTable
            // betOdds={betOdds}
            // userId={USER_ID}
            // onBetClick={handleOpenPlaceBetModal}
            />
          </Grid>
        </Grid>
      </Box>
      <WagerModal
        open={isWagerModalOpen}
        onClose={() => setWagerModalOpen(false)}
        gameId={GAME_ID}
      />
      <PlaceBetModal
        open={isPlaceBetModalOpen}
        onClose={() => setPlaceBetModalOpen(false)}
        action={placeBetAction}
      />
      <HistoryModal
        open={isHistoryModalOpen}
        onClose={() => setHistoryModalOpen(false)}
        gameId={GAME_ID}
      />
    </Box>
  );
}
