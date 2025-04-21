import React from "react";
import { Box, Typography, Button, TextField } from "@mui/material";

const BetControls: React.FC = () => {
  return (
    <Box sx={{ bgcolor: "#333", p: 2, borderRadius: 2 }}>
      <Typography variant="h6" color="white">
        BÀ ĐÔNG BAD 50
      </Typography>
      <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
        <Box>
          <Typography variant="body2" color="white">
            Đặt
          </Typography>
          <TextField
            value="10"
            size="small"
            sx={{ bgcolor: "white", borderRadius: 1, width: "80px" }}
          />
        </Box>
        <Box>
          <Typography variant="body2" color="white">
            Ăn
          </Typography>
          <TextField
            value="10"
            size="small"
            sx={{ bgcolor: "white", borderRadius: 1, width: "80px" }}
          />
        </Box>
      </Box>
      <Typography variant="body2" color="white" sx={{ mt: 1 }}>
        Số tiền 100
      </Typography>
      <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
        <Button variant="contained" color="error">
          TÂY NINH
        </Button>
        <Button variant="contained" color="success">
          QUẰNG NGÁI
        </Button>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="white">
          Gà đỏ
        </Typography>
        <TextField
          value="10:9"
          size="small"
          sx={{ bgcolor: "white", borderRadius: 1, width: "100%" }}
        />
      </Box>
      <Button variant="contained" color="success" fullWidth sx={{ mt: 2 }}>
        Đặt cược
      </Button>
    </Box>
  );
};

export default BetControls;
