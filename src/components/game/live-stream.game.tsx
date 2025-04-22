import React from "react";
import { Box, Typography } from "@mui/material";

const LiveStream: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: "#000",
        border: "2px solid #ffeb3b",
        borderRadius: 2,
        height: "h-screen",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          opacity: 0.2,
          alignItems: "center",
          color: "black",
          px: 1,
          py: 1,
          position: "absolute",
          top: 0,
          width: "100%",
        }}
      >
        <Typography variant="body2" color="white">
          TELE TRƯỜNG: t.me/tgmchoa8888 - ANH HO TRONG GAI
        </Typography>
        <Typography variant="body2" color="white">
          21/04/25 16:15:31
        </Typography>
        <Typography variant="body2" color="white">
          1990 KG
        </Typography>
      </Box>
      <iframe
        width="100%"
        height="h-screen"
        src="https://www.youtube.com/embed/hmqYNvNqA-o?si=OxUpobQmTI0dMJWN"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </Box>
  );
};

export default LiveStream;
