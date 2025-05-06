"use client";
import React from "react";
import {
  Toolbar,
  Box,
  Avatar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { numberThousand } from "@/utils/function-convert.util";
import Link from "next/link";

export default function GameFooter() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      position="fixed"
      sx={{
        bgcolor: "#333",
        zIndex: 100,
        height: { xs: "60px", sm: "70px" },
        bottom: 0,
        width: "100%",
        px: { xs: 1, sm: 5 },
      }}
    >
      <Toolbar
        sx={{
          px: { xs: 1, sm: 2 },
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: { xs: "60px", sm: "70px" },
        }}
      >
        {/* Left: User Info */}
        <Box
          sx={{
            display: "flex",
            gap: { xs: 0.5, sm: 1 },
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "black",
            py: { xs: 0.5, sm: 1 },
            px: { xs: 1, sm: 2 },
            borderRadius: 2,
          }}
        >
          <Avatar
            alt="Remy Sharp"
            src="/images/game.png"
            sx={{ width: { xs: 30, sm: 40 }, height: { xs: 30, sm: 40 } }}
          />
          <Box flexDirection="column">
            <Typography
              variant="body2"
              color="white"
              fontSize={{ xs: "0.7rem", sm: "0.875rem" }}
            >
              Name user
            </Typography>
            <Typography
              variant="body2"
              color="white"
              fontSize={{ xs: "0.7rem", sm: "0.875rem" }}
            >
              {numberThousand("1201920")}{" "}
              <Link
                href="/"
                style={{
                  marginRight: "8px",
                  color: "#ffeb3b",
                  textDecoration: "none",
                  fontSize: isMobile ? "0.7rem" : "0.875rem",
                }}
              >
                Nạp tiền
              </Link>
            </Typography>
          </Box>
        </Box>

        {/* Right: Bet Info */}
        <Box
          sx={{
            display: "flex",
            gap: { xs: 0.5, sm: 1 },
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "black",
            py: { xs: 0.5, sm: 1 },
            px: { xs: 1, sm: 2 },
            borderRadius: 2,
          }}
        >
          <Typography
            variant="body2"
            color="white"
            fontSize={{ xs: 14, sm: 18 }}
          >
            Cược: 100
          </Typography>
        </Box>
      </Toolbar>
    </Box>
  );
}
