"use client";
import React, { useContext } from "react";
import {
  Toolbar,
  Box,
  Avatar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  numberThousand,
  numberThousandFload,
} from "@/utils/function-convert.util";
import Link from "next/link";
import { UserContext } from "@/contexts/user-context";

export default function GameFooter({
  userBetTotal,
}: Readonly<{ userBetTotal: number }>) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const userContext = useContext(UserContext);
  const user = userContext?.user;

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
              {user?.username}
            </Typography>
            <Typography
              variant="body2"
              color="white"
              fontSize={{ xs: "0.7rem", sm: "0.875rem" }}
            >
              {numberThousandFload(user?.money?.toString() || "0")}{" "}
              <Link
                href="/account"
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
            Cược: {userBetTotal ?? 0}
          </Typography>
        </Box>
      </Toolbar>
    </Box>
  );
}
