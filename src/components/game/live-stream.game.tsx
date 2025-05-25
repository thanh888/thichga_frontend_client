import React from "react";
import { Box, Typography } from "@mui/material";
import { UrlTypeEnum } from "@/utils/enum/url-type.enum";
import { BettingRoomInterface } from "@/utils/interfaces/bet-room.interface";

interface LiveStreamProps {
  betRoom: BettingRoomInterface;
}

const LiveStream: React.FC<LiveStreamProps> = ({ betRoom }) => {
  return (
    <Box
      sx={{
        bgcolor: "#000",
        border: "2px solid #ffeb3b",
        borderRadius: { xs: 1, sm: 2 },
        position: "relative",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "white",
          px: { xs: 0.5, sm: 1 },
          py: { xs: 0.25, sm: 0.5 },
          position: "absolute",
          top: 0,
          width: "100%",
          backgroundColor: "rgba(100, 100, 100, 0.5)",
          zIndex: 10,
        }}
      >
        <Typography
          variant="body2"
          color="white"
          whiteSpace="nowrap"
          textAlign="left"
          fontSize={{ xs: "0.7rem", sm: "0.875rem" }}
        >
          {betRoom?.leftText}
        </Typography>
        <Typography
          variant="body2"
          color="white"
          textAlign="center"
          flexGrow={1}
          fontSize={{ xs: "0.7rem", sm: "0.875rem" }}
          sx={{ mx: 1, overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {betRoom?.centerText}
        </Typography>
        <Typography
          variant="body2"
          color="white"
          whiteSpace="nowrap"
          textAlign="right"
          fontSize={{ xs: "0.7rem", sm: "0.875rem" }}
        >
          {betRoom?.rightText}
        </Typography>
      </Box>
      <Box
        sx={{
          position: "relative",
          paddingTop: "56.25%", // 16:9 aspect ratio
          width: "100%",
          height: 0,
        }}
      >
        {betRoom.urlType === "iframe" && betRoom.urlLive ? (
          <iframe
            src={betRoom.urlLive}
            title="Video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          ></iframe>
        ) : (
          // <HlsPlayer
          //   src={sourceUrl}
          //   autoPlay={false}
          //   controls
          //   width="100%"
          //   height="100%"
          //   style={{
          //     position: "absolute",
          //     top: 0,
          //     left: 0,
          //   }}
          // />
          <></>
        )}
      </Box>
    </Box>
  );
};

export default LiveStream;
