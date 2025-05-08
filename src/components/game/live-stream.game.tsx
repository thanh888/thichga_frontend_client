import React, { useEffect, useState } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { UrlTypeEnum } from "@/utils/enum/url-type.enum";
// import HlsPlayer from "react-hls-player";

interface LiveStreamProps {
  sourceType?: UrlTypeEnum | string;
  sourceUrl?: string;
}

const LiveStream: React.FC<LiveStreamProps> = ({ sourceType, sourceUrl }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [url, setUrl] = useState<string>("");

  // useEffect(() => {
  //   if (sourceUrl) {
  //     // console.log(sourceUrl.split(" ")[3].split('"')[1]);
  //     setUrl(sourceUrl.split(" ")[3].split('"')[1]);
  //   }
  // }, [sourceUrl]);

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
          21/04/25 16:15:31
        </Typography>
        <Typography
          variant="body2"
          color="white"
          textAlign="center"
          flexGrow={1}
          fontSize={{ xs: "0.7rem", sm: "0.875rem" }}
          sx={{ mx: 1, overflow: "hidden", textOverflow: "ellipsis" }}
        >
          TELE TRƯỜNG: t.me/tgmchoa8888 - ANH HO TRONG GAI
        </Typography>
        <Typography
          variant="body2"
          color="white"
          whiteSpace="nowrap"
          textAlign="right"
          fontSize={{ xs: "0.7rem", sm: "0.875rem" }}
        >
          1990 KG
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
        {sourceType === "iframe" ? (
          <iframe
            src={sourceUrl ?? ""}
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
