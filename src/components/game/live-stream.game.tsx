import React from "react";
import { Box, Grid, Typography } from "@mui/material";

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
          alignItems: "center",
          color: "black",
          px: 1,
          py: 0.5,
          position: "absolute",
          top: 0,
          width: "100%",
          backgroundColor: "rgba(100, 100, 100, 0.5)",
        }}
      >
        <Typography
          variant="body2"
          color="white"
          whiteSpace={"nowrap"}
          textAlign={"left"}
        >
          21/04/25 16:15:31
        </Typography>
        <Typography
          variant="body2"
          color="white"
          // width={"100%"}
          textAlign={"center"}
          flexGrow={1}
        >
          TELE TRƯỜNG: t.me/tgmchoa8888 - ANH HO TRONG GAI
        </Typography>
        <Typography
          variant="body2"
          color="white"
          whiteSpace={"nowrap"}
          textAlign={"right"}
        >
          1990 KG
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Box sx={{}}>
          <iframe
            src="https://www.youtube.com/embed/hmqYNvNqA-o?si=OxUpobQmTI0dMJWN"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            style={{
              width: "100%",
              height: "100%",
            }}
          ></iframe>
        </Box>
      </Grid>
    </Box>
  );
};

export default LiveStream;
