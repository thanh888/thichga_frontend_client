"use client";
import React, { useEffect, useState, useContext } from "react";
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
  Typography,
  Grid,
} from "@mui/material";
import {
  ListAltOutlined,
  SupportAgentOutlined,
  MarkUnreadChatAltOutlined,
  HomeOutlined,
  HistoryOutlined,
  DoorSlidingOutlined,
} from "@mui/icons-material";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";
import ChatIcon from "@mui/icons-material/Chat";
import { useParams, useRouter } from "next/navigation";
import { getListRoomsOpening } from "@/services/room.api";
import { SettingContext } from "@/contexts/setting-context";
import UserBetHistories from "./user-bet-history.game";
import { UserContext } from "@/contexts/user-context";

interface GameHeaderProps {
  isCommentOpen: boolean;
  setIsCommentOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isBetOpen: boolean;
  setIsBetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isReload: boolean;
  setIsReload: React.Dispatch<React.SetStateAction<boolean>>;
}

enum BetType {
  SOLO = "SOLO",
  NORMAL = "NORMAL",
}

export default function GameHeader({
  isCommentOpen,
  setIsCommentOpen,
  isBetOpen,
  setIsBetOpen,
  isReload,
  setIsReload,
}: Readonly<GameHeaderProps>) {
  const router = useRouter();
  const param = useParams();
  const id = param?.id;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [roomDialogOpen, setRoomDialogOpen] = useState(false);
  const [supportDialogOpen, setSupportDialogOpen] = useState(false);
  const [betHistoryDialogOpen, setBetHistoryDialogOpen] = useState(false);
  const [listRooms, setListRooms] = useState<any[]>([]);

  const userContext = useContext(UserContext);
  const user = userContext?.user;

  const settingContext = useContext(SettingContext);
  const setting = settingContext?.setting;

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

  const getListRooms = async () => {
    try {
      const response = await getListRoomsOpening();
      if (response.status === 200 || response.status === 201) {
        setListRooms(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isReload) {
      getListRooms();
      setIsReload(false);
    }
  }, [isReload]);

  const handleOpenRoomDialog = () => {
    setRoomDialogOpen(true);
  };

  const handleCloseRoomDialog = () => {
    setRoomDialogOpen(false);
  };

  const handleOpenSupportDialog = () => {
    setSupportDialogOpen(true);
  };

  const handleCloseSupportDialog = () => {
    setSupportDialogOpen(false);
  };

  const handleOpenBetHistoryDialog = () => {
    if (!user?._id) {
      alert("Vui lòng đăng nhập để xem lịch sử cược.");
      return;
    }
    setBetHistoryDialogOpen(true);
  };

  const handleLinkClick = (url: string) => {
    window.open(url, "_blank");
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
              icon={HomeOutlined}
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
                icon={DoorSlidingOutlined}
                label="Chọn trận"
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
                {listRooms?.map((room, index) => (
                  <Button
                    key={+index}
                    variant={room._id === id ? "contained" : "outlined"}
                    color="warning"
                    onClick={() => router.push(`/game/${room._id}`)}
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
                    {room?.roomName}
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
            <HeaderIconButton
              icon={HistoryOutlined}
              label="LS Cược"
              onClick={handleOpenBetHistoryDialog}
            />
            <HeaderIconButton
              icon={SupportAgentOutlined}
              label="Hỗ trợ"
              onClick={handleOpenSupportDialog}
            />
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
            Danh sách trận đấu
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {listRooms.map((room, index) => (
              <Button
                key={index}
                variant={room._id === id ? "contained" : "outlined"}
                color="warning"
                sx={{
                  color: "white",
                  fontSize: { xs: "14px", sm: "16px" },
                  borderRadius: 2,
                  py: { xs: 1, sm: 1.5 },
                  textTransform: "none",
                }}
                onClick={() => {
                  router.push(`/game/${room._id}`);
                  handleCloseRoomDialog();
                }}
              >
                {room.roomName}
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
      <UserBetHistories
        betHistoryDialogOpen={betHistoryDialogOpen}
        setBetHistoryDialogOpen={setBetHistoryDialogOpen}
      />

      <Dialog
        open={supportDialogOpen}
        onClose={handleCloseSupportDialog}
        fullScreen={isMobile}
        sx={{
          "& .MuiDialog-paper": {
            bgcolor: "#fff",
            color: "#000",
            borderRadius: { xs: 0, sm: "8px" },
            maxWidth: { sm: "800px" },
            width: "100%",
          },
        }}
      >
        <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Box sx={{ maxWidth: "800px", mx: "auto", my: 2 }}>
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
                <Grid
                  size={12}
                  sx={{ textAlign: "center" }}
                  bgcolor={"#f0f0f0"}
                >
                  <Button
                    variant="contained"
                    startIcon={<SupportAgentOutlined />}
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
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: { xs: 2, sm: 3 } }}>
          <Button
            onClick={handleCloseSupportDialog}
            variant="outlined"
            sx={{
              color: "#000",
              borderColor: "#000",
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
