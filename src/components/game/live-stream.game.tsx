import React from "react";
import { Box, Typography } from "@mui/material";

const LiveStream: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: "#000",
        border: "2px solid #ffeb3b",
        borderRadius: 2,
        p: 1,
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "300px",
          bgcolor: "#424242",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" color="white">
          [Placeholder: Video Stream]
        </Typography>
      </Box>
      <Typography
        variant="body2"
        color="white"
        sx={{ mt: 1, textAlign: "center" }}
      >
        TELE TRƯỜNG: t.me/tgmchoa8888 - ANH HO TRONG GAI
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
        <Typography variant="body2" color="white">
          21/04/25 16:15:31
        </Typography>
        <Typography variant="body2" color="white">
          1990 KG
        </Typography>
      </Box>
    </Box>
  );
};

export default LiveStream;
