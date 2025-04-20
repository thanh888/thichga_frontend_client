"use client";
import React from "react";
import { Box, Button, Grid } from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";
import ChatIcon from "@mui/icons-material/Chat";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

export default function SupportPage() {
  const handleLinkClick = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <Box sx={{ maxWidth: "800px", mx: "auto", my: 10, p: 3 }}>
      {/* Hình ảnh minh họa */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Box
          component="img"
          src="https://thichga.com/User/assets/photos/support-photo.png"
          alt="Support 24/7"
          sx={{ maxWidth: "100%", height: "auto" }}
        />
      </Box>
      <Grid container spacing={2}>
        <Grid size={12} sx={{ textAlign: "center" }} bgcolor={"#f0f0f0"}>
          <Button
            variant="contained"
            startIcon={<SupportAgentIcon />}
            sx={{
              backgroundColor: "#1E90FF",
              "&:hover": { backgroundColor: "#1565C0" },
              textTransform: "none",
              fontSize: "1rem",
              py: 1.5,
              width: "100%",
            }}
            onClick={() => handleLinkClick("https://your-support-link.com")}
          >
            Chăm sóc 24/7
          </Button>
        </Grid>
        <Grid size={6}>
          <Button
            variant="contained"
            startIcon={<TelegramIcon />}
            sx={{
              backgroundColor: "#1E90FF",
              "&:hover": { backgroundColor: "#1565C0" },
              textTransform: "none",
              fontSize: "1rem",
              py: 1.5,
              width: "100%",
            }}
            onClick={() => handleLinkClick("https://t.me/your-telegram")}
          >
            Telegram
          </Button>
        </Grid>
        <Grid size={6}>
          <Button
            variant="contained"
            startIcon={<ChatIcon />}
            sx={{
              backgroundColor: "#1E90FF",
              "&:hover": { backgroundColor: "#1565C0" },
              textTransform: "none",
              fontSize: "1rem",
              py: 1.5,
              width: "100%",
            }}
            onClick={() => handleLinkClick("https://m.me/your-messenger")}
          >
            Messenger
          </Button>
        </Grid>
        <Grid size={6}>
          <Button
            variant="contained"
            startIcon={<FacebookIcon />}
            sx={{
              backgroundColor: "#1E90FF",
              "&:hover": { backgroundColor: "#1565C0" },
              textTransform: "none",
              fontSize: "1rem",
              py: 1.5,
              width: "100%",
            }}
            onClick={() => handleLinkClick("https://facebook.com/your-page")}
          >
            Facebook
          </Button>
        </Grid>
        <Grid size={6}>
          <Button
            variant="contained"
            startIcon={<ChatIcon />}
            sx={{
              backgroundColor: "#1E90FF",
              "&:hover": { backgroundColor: "#1565C0" },
              textTransform: "none",
              fontSize: "1rem",
              py: 1.5,
              width: "100%",
            }}
            onClick={() => handleLinkClick("https://zalo.me/your-zalo")}
          >
            Zalo
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
