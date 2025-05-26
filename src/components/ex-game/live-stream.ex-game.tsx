import React, { useContext } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import { CampaignOutlined, PersonOutlineOutlined } from "@mui/icons-material";
import Marquee from "react-fast-marquee";
import { BettingRoomInterface } from "@/utils/interfaces/bet-room.interface";
import { useUser } from "@/hooks/use-user";
import { ConvertMoneyVND } from "@/utils/function-convert.util";
import { UserContext } from "@/contexts/user-context";

interface BetContainerProps {
  betRoom: BettingRoomInterface;
  onWagerClick: () => void;
}

const LiveStreamContainer: React.FC<BetContainerProps> = ({
  betRoom,
  onWagerClick,
}) => {
  const router = useRouter();
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  return (
    <Paper
      elevation={0}
      sx={{
        p: 1,
        position: "relative",
        bgcolor: "black",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: "#fff8e1",
          p: 0.8,
          mb: 1,
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
          {betRoom?.marquee ??
            "TUẦN LỄ VÀNG THICHGA.NET NHẬN NGAY 5% CHO LẦN NẠP ĐẦU TIÊN"}
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
          mb: 1,
          height: 44,
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
            height: "100%",
            // p: 1,
          }}
        >
          <Typography
            variant="h6"
            fontSize={{ xs: 14, sm: 20 }}
            sx={{
              color: "#0D85D8",
              fontWeight: 600,
              textShadow: "1px 1px 1px #ccc",
            }}
          >
            GÀ XANH {betRoom?.blueOdds || "4.5"}
          </Typography>
          <Typography
            variant="h6"
            fontSize={{ xs: 14, sm: 20 }}
            sx={{ mx: 1, fontWeight: 600, color: "#d7b500" }}
          >
            :
          </Typography>
          <Typography
            fontSize={{ xs: 14, sm: 20 }}
            variant="h6"
            sx={{
              color: "red",
              fontWeight: 600,
              textShadow: "1px 1px 1px #ccc",
            }}
          >
            {betRoom?.redOdds || "10"} GÀ ĐỎ
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{
            color: "black",
            bgcolor: "#d7b500",
            ml: 2,
            fontWeight: 600,
            height: "100%",
          }}
          onClick={() => router.push("/ex-game")}
        >
          Chọn Phòng
        </Button>
      </Box>

      <Box
        sx={{
          position: "relative",
          paddingTop: "56.25%",
          borderRadius: 2,
          border: "4px solid #d7b500",
          mb: 2,
          bgcolor: "#ff69b4", // Pink background
        }}
      >
        {betRoom.urlLive && (
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
        )}
      </Box>

      {/* User Info and Wager Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: 56,
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
              ID:{" "}
              <strong
                style={{
                  color: "#d7b500",
                }}
              >
                {user?.username}
              </strong>{" "}
            </Typography>
            <Typography variant="body2" color="white">
              Số dư:{" "}
              <strong
                style={{
                  color: "#d7b500",
                }}
              >
                {ConvertMoneyVND(Number(user?.money))}
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
            fontSize: 20,
            fontWeight: 600,
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
