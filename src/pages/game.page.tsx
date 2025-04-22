"use client";
import BetControls from "@/components/game/bet-control.game";
import BetInfo from "@/components/game/bet-info.game";
import GameFooter from "@/components/game/footer.game";
import GameHeader from "@/components/game/header.game";
import LiveStream from "@/components/game/live-stream.game";
import { Box, Grid } from "@mui/material";
import { useState } from "react";

export default function GamePage() {
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(true);
  const [isBetOpen, setIsBetOpen] = useState<boolean>(true);

  return (
    <div
      className="game-main bg-['#101828'] h-screen"
      style={{ position: "relative", backgroundColor: "#101828" }}
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
          pt: "96px",
          px: 2,
          bgcolor: "#101828",
          // height: "100vh",
        }}
      >
        <Grid container spacing={2}>
          <Grid
            size={{ xs: 12, md: 3.5, lg: 3, xl: 2.5 }}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <BetInfo isBetOpen={isBetOpen} setIsBetOpen={setIsBetOpen} />
          </Grid>
          <Grid size={{ xs: 12, md: 5, lg: 6, xl: 7 }}>
            <LiveStream />
          </Grid>
          <Grid size={{ xs: 12, md: 3.5, lg: 3, xl: 2.5 }}>
            <BetControls
              isCommentOpen={isCommentOpen}
              setIsCommentOpen={setIsCommentOpen}
            />
          </Grid>
        </Grid>
      </Box>
      <GameFooter />
    </div>
  );
}
