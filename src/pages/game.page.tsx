import BetControls from "@/components/game/bet-control.game";
import BetInfo from "@/components/game/bet-info.game";
import GameHeader from "@/components/game/header.game";
import LiveStream from "@/components/game/live-stream.game";
import { Box, Grid } from "@mui/material";

export default function GamePage() {
  return (
    <>
      <GameHeader />
      <Box sx={{ width: "100%", mt: 2 }}>
        <Grid container spacing={2}>
          <Grid size={2}>
            <BetInfo />
          </Grid>
          <Grid size={8}>
            <LiveStream />
          </Grid>
          <Grid size={2}>
            <BetControls />
          </Grid>
        </Grid>
      </Box>
      <div className="flex flex-row items-center  w-full h-screen bg-gray-900 text-white"></div>
    </>
  );
}
