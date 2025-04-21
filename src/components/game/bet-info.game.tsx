import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const BetInfo: React.FC = () => {
  const bets = [
    { user: "thanhtest", ratio: "10:10", amount: 100, status: "Đã khớp" },
    { user: "thanhtest1", ratio: "10:10", amount: 100, status: "Đã khớp" },
    { user: "thanhtest", ratio: "10:10", amount: 100, status: "Đã khớp" },
  ];

  return (
    <Box>
      <Typography variant="h6" color="white">
        Số lượng cược đang chờ: 4 (Gà xanh) - 400.00
      </Typography>
      {bets.map((bet, index) => (
        <Paper key={index} sx={{ p: 1, mt: 1, bgcolor: "#333" }}>
          <Typography variant="body2" color="white">
            {bet.user} - {bet.ratio} - {bet.amount} - {bet.status}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default BetInfo;
