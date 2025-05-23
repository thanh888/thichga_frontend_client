"use client";
import * as React from "react";
import { Box, Paper, Typography } from "@mui/material";
import HistoryTableComponent from "./table_history.account";

export default function DepositHistoryComponent() {
  const [isReload, setIsReload] = React.useState<boolean>(false);

  return (
    <Box sx={{ width: "100%", px: { xs: 1, sm: 2 }, py: { xs: 1, sm: 2 } }}>
      <Paper
        sx={{
          width: "100%",
          mb: { xs: 1, sm: 2 },
          p: { xs: 1, sm: 2 },
          boxShadow: {
            xs: "0 1px 5px rgba(0,0,0,0.1)",
            sm: "0 2px 10px rgba(0,0,0,0.1)",
          },
          borderRadius: "8px",
        }}
      >
        <Typography
          variant="h5"
          fontWeight={500}
          fontSize={{ xs: "1.25rem", sm: "1.5rem" }}
          mb={{ xs: 1, sm: 2 }}
        >
          Lịch sử nạp tiền
        </Typography>
        <HistoryTableComponent
          isReload={isReload}
          setIsReload={setIsReload}
          type="deposit"
        />
      </Paper>
    </Box>
  );
}
