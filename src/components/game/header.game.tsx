import React from "react";
import { AppBar, Toolbar, Button, Box, Stack, Typography } from "@mui/material";
import {
  ListAltOutlined,
  MonetizationOnOutlined,
  SupportAgentOutlined,
  MarkUnreadChatAltOutlined,
} from "@mui/icons-material";

// 👉 Component riêng cho các nút icon

const GameHeader: React.FC = () => {
  const HeaderIconButton = ({
    icon: Icon,
    label,
  }: {
    icon: any;
    label: string;
  }) => (
    <Button
      variant="text"
      sx={{
        color: "white",
        fontSize: 12,
        flexDirection: "column",
        whiteSpace: "nowrap",

        ":hover": { backgroundColor: "transparent" },
      }}
    >
      <Icon
        sx={{
          color: "white",
          p: 1,
          fontSize: 40,
          backgroundColor: "#ed6c02",
          borderRadius: "50%",
        }}
      />
      {label}
    </Button>
  );
  const scrollButtonList = [
    "MỞC HÔ ĐỘ 6E",
    "MỞC HÔ ĐỘ 77",
    "MỞC HÔ ĐỘ 4",
    "ĐAKPUER ĐỘ 1",
  ];

  return (
    <AppBar position="static" sx={{ bgcolor: "#333" }}>
      <Toolbar sx={{ px: 2, justifyContent: "space-between" }}>
        {/* Khu vực trái */}
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <HeaderIconButton icon={ListAltOutlined} label="Trang chủ" />
          <HeaderIconButton icon={ListAltOutlined} label="DS Cược" />
          <HeaderIconButton icon={MonetizationOnOutlined} label="Cược" />
        </Box>

        {/* Khu vực scroll ngang giữa */}
        <Box
          sx={{
            flexGrow: 1,
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            px: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              overflowX: "auto",
              whiteSpace: "nowrap",
              scrollBehavior: "smooth",
              px: 1,
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {scrollButtonList.map((label, index) => (
              <Button
                key={index}
                variant="contained"
                color="warning"
                sx={{
                  color: "white",
                  fontSize: 16,
                  borderRadius: 2,
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Khu vực phải */}
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <HeaderIconButton
            icon={MarkUnreadChatAltOutlined}
            label="Bình luận"
          />
          <HeaderIconButton icon={ListAltOutlined} label="LS Cược" />
          <HeaderIconButton icon={SupportAgentOutlined} label="Hỗ trợ" />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default GameHeader;
