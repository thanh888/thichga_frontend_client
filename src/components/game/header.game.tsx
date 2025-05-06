import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
} from "@mui/material";
import {
  ListAltOutlined,
  MonetizationOnOutlined,
  SupportAgentOutlined,
  MarkUnreadChatAltOutlined,
  ViewListOutlined,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [roomDialogOpen, setRoomDialogOpen] = useState(false);

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
        fontSize: { xs: "10px", sm: "12px" },
        flexDirection: "column",
        whiteSpace: "nowrap",
        minWidth: { xs: "50px", sm: "60px" },
        p: { xs: 0.5, sm: 1 },
        ":hover": { backgroundColor: "transparent" },
      }}
    >
      <Icon
        sx={{
          color: "white",
          p: { xs: 0.5, sm: 1 },
          fontSize: { xs: 30, sm: 40 },
          backgroundColor: "#ed6c02",
          borderRadius: "50%",
        }}
      />
      {label}
    </Button>
  );

  const handleOpenRoomDialog = () => {
    setRoomDialogOpen(true);
  };

  const handleCloseRoomDialog = () => {
    setRoomDialogOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "#333",
          zIndex: 100,
          height: { xs: "60px", sm: "80px" },
        }}
      >
        <Toolbar
          sx={{
            px: { xs: 1, sm: 2 },
            justifyContent: "space-between",
            minHeight: { xs: "60px", sm: "80px" },
          }}
        >
          {/* Trái */}
          <Box
            sx={{
              display: "flex",
              gap: { xs: 0.5, sm: 1 },
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <HeaderIconButton
              icon={ListAltOutlined}
              label="Trang chủ"
              onClick={() => router.push("/")}
            />
            <HeaderIconButton
              icon={ListAltOutlined}
              label="DS Cược"
              onClick={() => setIsBetOpen(!isBetOpen)}
            />
          </Box>

          {/* Giữa */}
          <Box
            sx={{
              flexGrow: 1,
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              px: { xs: 1, sm: 2 },
            }}
          >
            {isMobile ? (
              <HeaderIconButton
                icon={ViewListOutlined}
                label="Phòng"
                onClick={handleOpenRoomDialog}
              />
            ) : (
              <Box
                sx={{
                  display: "flex",
                  gap: { xs: 0.5, sm: 1 },
                  alignItems: "center",
                  overflowX: "auto",
                  whiteSpace: "nowrap",
                  scrollBehavior: "smooth",
                  px: { xs: 0.5, sm: 1 },
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
                      fontSize: { xs: "12px", sm: "16px" },
                      borderRadius: 2,
                      flexShrink: 0,
                      whiteSpace: "nowrap",
                      px: { xs: 1, sm: 2 },
                      py: { xs: 0.5, sm: 1 },
                      minWidth: { xs: "100px", sm: "120px" },
                    }}
                  >
                    {label}
                  </Button>
                ))}
              </Box>
            )}
          </Box>

          {/* Phải */}
          <Box
            sx={{
              display: "flex",
              gap: { xs: 0.5, sm: 1 },
              alignItems: "center",
              flexShrink: 0,
            }}
          >
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

      {/* Dialog for Room List on Mobile */}
      <Dialog
        open={roomDialogOpen}
        onClose={handleCloseRoomDialog}
        fullScreen={isMobile}
        sx={{
          "& .MuiDialog-paper": {
            bgcolor: "#333",
            color: "white",
            borderRadius: { xs: 0, sm: "8px" },
            width: { sm: "400px" },
            maxWidth: "100%",
          },
        }}
      >
        <DialogContent sx={{ p: { xs: 1, sm: 2 } }}>
          <Typography
            variant="h6"
            fontWeight={500}
            mb={{ xs: 1, sm: 2 }}
            fontSize={{ xs: "1rem", sm: "1.25rem" }}
            textAlign="center"
          >
            Danh sách phòng
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {scrollButtonList.map((label, index) => (
              <Button
                key={index}
                variant="contained"
                color="warning"
                sx={{
                  color: "white",
                  fontSize: { xs: "14px", sm: "16px" },
                  borderRadius: 2,
                  py: { xs: 1, sm: 1.5 },
                  textTransform: "none",
                }}
                onClick={handleCloseRoomDialog}
              >
                {label}
              </Button>
            ))}
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: { xs: 2, sm: 3 } }}>
          <Button
            onClick={handleCloseRoomDialog}
            variant="outlined"
            sx={{
              color: "white",
              borderColor: "white",
              fontSize: { xs: "12px", sm: "14px" },
              px: { xs: 2, sm: 3 },
            }}
          >
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
