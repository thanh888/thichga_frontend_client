import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import {
  AccountCircleOutlined,
  CampaignOutlined,
  DashboardOutlined,
  PersonOutlineOutlined,
  VolumeOffOutlined,
} from "@mui/icons-material";
import Marquee from "react-fast-marquee";

interface BetContainerProps {
  session: { suggestOddsText: [string, string] } | null;
  onWagerClick: () => void;
}

const LiveStreamContainer: React.FC<BetContainerProps> = ({
  session,
  onWagerClick,
}) => {
  const router = useRouter();
  const currentDate = new Date()
    .toLocaleString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
      hour12: false,
    })
    .replace(", ", " ");

  return (
    <Paper
      elevation={0}
      sx={{
        p: 1,
        border: "4px solid #d7b500",
        borderRadius: 2,
        position: "relative",
        bgcolor: "black",
        "&::before": {
          content: '""',
          position: "absolute",
          top: -8,
          left: -8,
          width: 16,
          height: 16,
          bgcolor: "#d7b500",
          clipPath: "polygon(0 0, 100% 0, 0 100%)",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: -8,
          right: -8,
          width: 16,
          height: 16,
          bgcolor: "#d7b500",
          clipPath: "polygon(100% 0, 0 100%, 100% 100%)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          bgcolor: "#fff8e1",
          p: 1,
          borderRadius: 1,
        }}
      >
        <CampaignOutlined />

        <Marquee
          style={{
            fontSize: "1rem",
            fontFamily: "Roboto, Arial",
            color: "rgba(0,0,0,0.87)",
          }}
        >
          TUẦN LỄ VÀNG THICHGA.NET NHẬN NGAY 5% CHO LẦN NẠP ĐẦU TIÊN
        </Marquee>
      </Box>
      {/* Header */}
      <Box
        sx={{
          bgcolor: "#000",
          color: "#d7b500",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          height: 40,
          borderRadius: 4,
        }}
      >
        <Box
          sx={{
            bgcolor: "#000",
            color: "#d7b500",
            display: "flex",
            justifyContent: "center",
            borderRadius: 2,
            border: "2px solid #ffe88d",
            alignItems: "center",
            flexGrow: 1,
            p: 1,
          }}
        >
          <Typography
            variant="h6"
            fontSize={{ xs: 12, sm: 16 }}
            sx={{
              color: "#0D85D8",
              textShadow: "1px 1px 0 #ccc",
            }}
          >
            GÀ XANH {session?.suggestOddsText[0] || "4.5"}
          </Typography>
          <Typography
            variant="h6"
            fontSize={{ xs: 12, sm: 16 }}
            sx={{ mx: 1, color: "#d7b500" }}
          >
            :
          </Typography>
          <Typography
            fontSize={{ xs: 12, sm: 16 }}
            variant="h6"
            sx={{ color: "red", textShadow: "1px 1px 0 #ccc" }}
          >
            {session?.suggestOddsText[1] || "10"} GÀ ĐỎ
          </Typography>
        </Box>
        <Button
          variant="text"
          sx={{
            color: "black",
            bgcolor: "#d7b500",
            height: "100%",
            ml: 2,
          }}
          onClick={() => router.push("/ex-game")}
        >
          Chọn Phòng
        </Button>
      </Box>

      {/* Odds Display */}

      {/* Video Player */}
      <Box
        sx={{
          position: "relative",
          paddingTop: "56.25%",
          mb: 2,
          bgcolor: "#ff69b4", // Pink background
        }}
      >
        <iframe
          src="https://player.bakent.live/play.html?live=binhhiep1&index=1&v=1747700581"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none",
          }}
          frameBorder="0"
        />
      </Box>

      {/* User Info and Wager Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            borderRadius: 2,
            border: "2px solid #d7b500",
            padding: 1,
            bgcolor: "#3a2014",
            justifyContent: "space-between",
          }}
        >
          <PersonOutlineOutlined
            sx={{
              color: "#d7b500",
              fontSize: 36,
              width: 36,
              borderRadius: "50%",
              border: "2px solid #d7b500",
            }}
          />
          <Box>
            <Typography variant="body2" color="white">
              ID: :{" "}
              <strong
                style={{
                  color: "#d7b500",
                }}
              >
                thanhtest
              </strong>{" "}
            </Typography>
            <Typography variant="body2" color="white">
              Số dư:{" "}
              <strong
                style={{
                  color: "#d7b500",
                }}
              >
                999,870,258
              </strong>{" "}
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          sx={{
            color: "#d7b500",
            border: "2px solid #d7b500",
            bgcolor: "#3a2014",
            height: "100%",
            "&:hover": {
              opacity: 0.8,
            },
            borderRadius: 2,
            padding: "6px 16px",
          }}
          onClick={onWagerClick}
        >
          TẠO KÈO
        </Button>
      </Box>
    </Paper>
  );
};

export default LiveStreamContainer;
