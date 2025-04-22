import React from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import {
  ListAltOutlined,
  MonetizationOnOutlined,
  SupportAgentOutlined,
  MarkUnreadChatAltOutlined,
} from "@mui/icons-material";

interface GameHeaderProps {
  isCommentOpen: boolean;
  setIsCommentOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isBetOpen: boolean;
  setIsBetOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GameHeader({
  isCommentOpen,
  setIsCommentOpen,
  isBetOpen,
  setIsBetOpen,
}: Readonly<GameHeaderProps>) {
  const scrollButtonList = [
    "MỞC HÔ ĐỘ 6E",
    "MỞC HÔ ĐỘ 77",
    "MỞC HÔ ĐỘ 4",
    "ĐAKPUER ĐỘ 1",
  ];

  const HeaderIconButton = ({
    icon: Icon,
    label,
    onClick,
  }: {
    icon: any;
    label: string;
    onClick?: () => void;
  }) => (
    <Button
      variant="text"
      onClick={onClick}
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

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "#333",
        position: "fixed",
        zIndex: 100,
        height: "80px",
      }}
    >
      <Toolbar sx={{ px: 2, justifyContent: "space-between" }}>
        {/* Trái */}
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <HeaderIconButton icon={ListAltOutlined} label="Trang chủ" />
          <HeaderIconButton
            icon={ListAltOutlined}
            label="DS Cược"
            onClick={() => setIsBetOpen(!isBetOpen)}
          />
          <HeaderIconButton
            icon={MonetizationOnOutlined}
            label="Cược"
            onClick={() => setIsCommentOpen(!isCommentOpen)}
          />
        </Box>

        {/* Giữa */}
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
                key={+index}
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

        {/* Phải */}
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <HeaderIconButton
            icon={MarkUnreadChatAltOutlined}
            label="Bình luận"
            onClick={() => setIsCommentOpen(!isCommentOpen)}
          />
          <HeaderIconButton icon={ListAltOutlined} label="LS Cược" />
          <HeaderIconButton icon={SupportAgentOutlined} label="Hỗ trợ" />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
