"use client";
import React from "react";
import { Box, Button, Grid } from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";
import ChatIcon from "@mui/icons-material/Chat";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { SettingContext } from "@/contexts/setting-context";

export default function SupportPage() {
  const settingContext = React.useContext(SettingContext);
  const setting = settingContext?.setting;

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
        {setting?.support_contact?.phone && (
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
              onClick={() =>
                handleLinkClick(setting?.support_contact?.phone ?? "")
              }
            >
              Chăm sóc 24/7
            </Button>
          </Grid>
        )}
        {setting?.support_contact?.telegram && (
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
              onClick={() =>
                handleLinkClick(setting?.support_contact?.telegram ?? "")
              }
            >
              Telegram
            </Button>
          </Grid>
        )}
        {setting?.support_contact?.messenger && (
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
              onClick={() =>
                handleLinkClick(setting?.support_contact?.messenger ?? "")
              }
            >
              Messenger
            </Button>
          </Grid>
        )}
        {setting?.support_contact?.facebook && (
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
              onClick={() =>
                handleLinkClick(setting?.support_contact?.facebook ?? "")
              }
            >
              Facebook
            </Button>
          </Grid>
        )}
        {setting?.support_contact?.zalo && (
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
              onClick={() =>
                handleLinkClick(setting?.support_contact?.zalo ?? "")
              }
            >
              Zalo
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
