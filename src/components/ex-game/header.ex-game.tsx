import React from "react";
import { useRouter } from "next/navigation";
import { AppBar, Toolbar, Box, Typography, IconButton } from "@mui/material";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import { SupportAgentOutlined } from "@mui/icons-material";

interface HeaderProps {
  onChatClick: () => void;
  onHistoryClick: () => void;
}

const HeaderExGame: React.FC<HeaderProps> = ({
  onChatClick,
  onHistoryClick,
}) => {
  const router = useRouter();

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ bgcolor: "#000" }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "60px", // Match the image height
          padding: "0 10px",
        }}
      >
        {/* Back Button */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            bgcolor: "#3a2014",
            border: "2px solid #FFC107",
            borderRadius: "50%",
            cursor: "pointer",
            "&:hover": { bgcolor: "#3a2014" },
          }}
          onClick={() => router.push("/ex-game")}
        >
          <ArrowBackIosOutlinedIcon sx={{ color: "#d7b500", fontSize: 20 }} />
        </Box>

        {/* Room Name */}
        <Typography
          variant="h6"
          component="span"
          sx={{
            flexGrow: 1,
            textAlign: "center",
            color: "#d7b500",
            fontWeight: 700,
            textTransform: "uppercase",
            fontSize: "18px",
          }}
        >
          MỘC HÓA ĐỘ 1
        </Typography>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              bgcolor: "#3a2014",
              border: "2px solid #FFC107",
              borderRadius: "50%",
              cursor: "pointer",
              "&:hover": { bgcolor: "#3a2014" },
            }}
            onClick={() =>
              (window.location.href = "https://t.me/cskh_thichga02")
            }
          >
            <SupportAgentOutlined sx={{ color: "#d7b500", fontSize: 24 }} />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              bgcolor: "#3a2014",
              borderRadius: "50%",
              border: "2px solid #FFC107",
              cursor: "pointer",
              "&:hover": { bgcolor: "#3a2014" },
            }}
            onClick={onHistoryClick}
          >
            <HistoryOutlinedIcon sx={{ color: "#d7b500", fontSize: 24 }} />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderExGame;
