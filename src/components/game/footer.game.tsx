import React from "react";
import { Toolbar, Button, Box, Avatar, Typography } from "@mui/material";
import { ListAltOutlined, SupportAgentOutlined } from "@mui/icons-material";
import { numberThousand } from "@/utils/function-convert.util";
import Link from "next/link";

export default function GameFooter() {
  return (
    <Box
      position="fixed"
      sx={{
        bgcolor: "#333",
        position: "fixed",
        zIndex: 100,
        height: "70px",
        bottom: 0,
        width: "100%",
        alignItems: "center",
        px: 5,
      }}
    >
      <Toolbar
        sx={{ px: 2, justifyContent: "space-between", alignItems: "center" }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "black",
            py: 1,
            px: 2,
            borderRadius: 2,
          }}
        >
          <Avatar alt="Remy Sharp" src="/images/game.png" />
          <Box flexDirection={"column"}>
            <Typography variant="body2" color="white">
              Name user
            </Typography>
            <Typography variant="body2" color="white">
              {numberThousand("1201920")}{" "}
              <Link href="/" style={{ marginRight: "8px" }}>
                Nạp tiền
              </Link>
            </Typography>
          </Box>
        </Box>

        {/* Phải */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "black",
            py: 1,
            px: 2,
            borderRadius: 2,
          }}
        >
          <Typography variant="body2" color="white" fontSize={18}>
            Cược: 100
          </Typography>
        </Box>
      </Toolbar>
    </Box>
  );
}
