import { Box, Paper, Typography } from "@mui/material";
import HistoryTable from "./table_history.account";

export default function WithdrawHistoryComponent() {
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, p: 2 }}>
        <Typography variant="h5" fontWeight={500}>
          Lịch sử rút tiền
        </Typography>
        <HistoryTable />
      </Paper>
    </Box>
  );
}
