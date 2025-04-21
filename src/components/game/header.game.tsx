import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Stack } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import MarkUnreadChatAltOutlinedIcon from "@mui/icons-material/MarkUnreadChatAltOutlined";

const GameHeader: React.FC = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "#333" }}>
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            gap: 0,
            alignItems: "center",
          }}
        >
          <Button
            variant="text"
            sx={{
              color: "white",
              fontSize: 12,
              flexDirection: "column",
              ":hover": {
                backgroundColor: "none",
              },
              ":active": {
                backgroundColor: "none",
              },
              ":focus": {
                backgroundColor: "none",
              },
            }}
          >
            <ListAltOutlinedIcon
              sx={{
                color: "white",
                p: "4px",
                fontSize: 40,
                backgroundColor: "#ed6c02",
                borderRadius: "50%",
              }}
            />
            DS Cược
          </Button>
          <Button
            variant="text"
            sx={{
              color: "white",
              fontSize: 12,
              flexDirection: "column",
              ":hover": {
                backgroundColor: "none",
              },
              ":active": {
                backgroundColor: "none",
              },
              ":focus": {
                backgroundColor: "none",
              },
            }}
          >
            <MonetizationOnOutlinedIcon
              sx={{
                color: "white",
                p: "4px",
                fontSize: 40,
                backgroundColor: "#ed6c02",
                borderRadius: "50%",
              }}
            />
            Cược
          </Button>
          <Button
            variant="text"
            sx={{
              color: "white",
              fontSize: 12,
              flexDirection: "column",
              ":hover": {
                backgroundColor: "none",
              },
              ":active": {
                backgroundColor: "none",
              },
              ":focus": {
                backgroundColor: "none",
              },
            }}
          >
            <SupportAgentOutlinedIcon
              sx={{
                color: "white",
                p: "4px",
                fontSize: 40,
                backgroundColor: "#ed6c02",
                borderRadius: "50%",
              }}
            />
            Hỗ trợ
          </Button>
          <Button
            variant="text"
            sx={{
              color: "white",
              fontSize: 12,
              flexDirection: "column",
              ":hover": {
                backgroundColor: "none",
              },
              ":active": {
                backgroundColor: "none",
              },
              ":focus": {
                backgroundColor: "none",
              },
            }}
          >
            <ListAltOutlinedIcon
              sx={{
                color: "white",
                p: "4px",
                fontSize: 40,
                backgroundColor: "#ed6c02",
                borderRadius: "50%",
              }}
            />
            DS Cược
          </Button>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            gap: 1,
            justifyContent: "center",
            width: "800px",
            overflowX: "auto",
          }}
        >
          <Button variant="contained" color="warning" sx={{ width: "auto" }}>
            ĐAKPUER ĐỘ 1
          </Button>
          <Button variant="contained" color="warning">
            MỞC HÔ ĐỘ 6E
          </Button>
          <Button variant="contained" color="warning">
            MỞC HÔ ĐỘ 77
          </Button>
          <Button variant="contained" color="warning">
            MỞC HÔ ĐỘ 4
          </Button>
          <Button variant="contained" color="warning">
            ĐAKPUER ĐỘ 1
          </Button>
          <Button variant="contained" color="warning">
            MỞC HÔ ĐỘ 6E
          </Button>
          <Button variant="contained" color="warning">
            MỞC HÔ ĐỘ 77
          </Button>
          <Button variant="contained" color="warning">
            MỞC HÔ ĐỘ 4
          </Button>
          <Button variant="contained" color="warning">
            ĐAKPUER ĐỘ 1
          </Button>
          <Button variant="contained" color="warning">
            MỞC HÔ ĐỘ 6E
          </Button>
          <Button variant="contained" color="warning">
            MỞC HÔ ĐỘ 77
          </Button>
          <Button variant="contained" color="warning">
            MỞC HÔ ĐỘ 4
          </Button>
          <Button variant="contained" color="warning">
            ĐAKPUER ĐỘ 1
          </Button>
          <Button variant="contained" color="warning">
            MỞC HÔ ĐỘ 6E
          </Button>
          <Button variant="contained" color="warning">
            MỞC HÔ ĐỘ 77
          </Button>
          <Button variant="contained" color="warning">
            MỞC HÔ ĐỘ 4
          </Button>
          <Button variant="contained" color="warning">
            ĐAKPUER ĐỘ 1
          </Button>
          <Button variant="contained" color="warning">
            MỞC HÔ ĐỘ 6E
          </Button>
          <Button variant="contained" color="warning">
            MỞC HÔ ĐỘ 77
          </Button>
          <Button variant="contained" color="warning">
            MỞC HÔ ĐỘ 4
          </Button>
          <Button variant="contained" color="warning">
            ĐAKPUER ĐỘ 1
          </Button>
          <Button variant="contained" color="warning">
            MỞC HÔ ĐỘ 6E
          </Button>
          <Button variant="contained" color="warning">
            MỞC HÔ ĐỘ 77
          </Button>
          <Button variant="contained" color="warning">
            MỞC HÔ ĐỘ 4
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 0,
            alignItems: "center",
          }}
        >
          <Button
            variant="text"
            sx={{
              color: "white",
              fontSize: 12,
              flexDirection: "column",
              ":hover": {
                backgroundColor: "none",
              },
              ":active": {
                backgroundColor: "none",
              },
              ":focus": {
                backgroundColor: "none",
              },
            }}
          >
            <MarkUnreadChatAltOutlinedIcon
              sx={{
                color: "white",
                p: "4px",
                fontSize: 40,
                backgroundColor: "#ed6c02",
                borderRadius: "50%",
              }}
            />
            BÌnh luận
          </Button>
          <Button
            variant="text"
            sx={{
              color: "white",
              fontSize: 12,
              flexDirection: "column",
              ":hover": {
                backgroundColor: "none",
              },
              ":active": {
                backgroundColor: "none",
              },
              ":focus": {
                backgroundColor: "none",
              },
            }}
          >
            <ListAltOutlinedIcon
              sx={{
                color: "white",
                p: "4px",
                fontSize: 40,
                backgroundColor: "#ed6c02",
                borderRadius: "50%",
              }}
            />
            LS Cược
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default GameHeader;
