"use client";

import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AnimatePresence, motion } from "framer-motion";
import {
  getHistoriesBySession,
  UpdateDeleteBetHistoryApi,
} from "@/services/bet-history.api";
import { BettingHistoryInterface } from "@/utils/interfaces/bet-history.interface";
import { TeamEnum } from "@/utils/enum/team.enum";
import { BetHistoryStatusEnum } from "@/utils/enum/bet-history-status.enum";
import { toast } from "react-toastify";
import { useSocket } from "@/socket";
import AcceptSolo from "../../lib/dialogs/confirm-solo";
import { UserContext } from "@/contexts/user-context";
import { numberThousandFloadBigMoney } from "@/utils/function-convert.util";

const ScrollContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Box
    sx={{
      height: { xs: "20vh", lg: "300px" },
      overflowY: "auto",
      "&::-webkit-scrollbar": { bgcolor: "black", width: "8px" },
      "&::-webkit-scrollbar-thumb": { bgcolor: "#888", borderRadius: "4px" },
      "&::-webkit-scrollbar-thumb:hover": { bgcolor: "#555" },
      "&::-webkit-scrollbar-track": { bgcolor: "#333" },
      "&::-webkit-scrollbar-track-piece": { backgroundColor: "#212529" },
      "&::-webkit-scrollbar-corner": { backgroundColor: "#212529" },
      "&::-webkit-scrollbar-button": { backgroundColor: "#212529" },
      "&::-webkit-scrollbar-thumb:horizontal": { display: "none" },
    }}
  >
    {children}
  </Box>
);

const BetList: React.FC<{
  title: string;
  color: string;
  betHistories: any[];
  setIsReloadBetting: Dispatch<SetStateAction<number>>;
  sessionID: string;
  setAcceptDialogOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedBet: Dispatch<SetStateAction<BettingHistoryInterface | null>>;
  betRoom: any;
}> = ({
  title,
  color,
  betHistories,
  setIsReloadBetting,
  sessionID,
  setAcceptDialogOpen,
  setSelectedBet,
  betRoom,
}) => {
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const checkSession = userContext?.checkSession;

  const [loadingCancel, setLoadingCancel] = useState<boolean>(false);

  const socket = useSocket();

  const handleCancelBet = async (bet: BettingHistoryInterface) => {
    if (!bet._id) {
      return;
    }

    try {
      const response = await UpdateDeleteBetHistoryApi(bet?._id, {
        betSessionID: sessionID,
        money: bet.money,
      });
      if (response.status === 200 || response.status === 201) {
        toast.success("Hủy thành công");
        if (socket) {
          socket.emit("bet-history", {
            roomID: betRoom._id,
          });
        }
        if (checkSession) {
          await checkSession();
        }
      }
      setIsReloadBetting((prev) => prev + 1);
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message === "Betting is disable") {
        toast.warn("Phiên cược đã đóng, không thể hủy");
      }
    } finally {
      setLoadingCancel(false);
    }
  };

  const handleOpenAcceptDialog = (bet: BettingHistoryInterface) => {
    setSelectedBet(bet);
    setAcceptDialogOpen(true);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 0.5, sm: 1 },
        backgroundColor: "#212529",
        borderRadius: 2,
      }}
    >
      <Typography
        variant="body2"
        gutterBottom
        borderBottom="1px solid #ccc"
        sx={{
          display: "flex",
          alignItems: "center",
          fontSize: { xs: 11, sm: 12 },
          color: "#fff",
        }}
      >
        {title} --{" "}
        <Typography
          variant="caption"
          color={color}
          fontWeight={600}
          fontSize={{ xs: 10, sm: 11 }}
        >
          {numberThousandFloadBigMoney(
            betHistories
              ?.map((item) => item.money)
              .reduce((prev, next) => prev + next, 0)
          )}
        </Typography>
      </Typography>
      <ScrollContainer>
        {betHistories?.map((bet: BettingHistoryInterface, index: number) => (
          <Box
            key={+index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "0.5px solid #ccc",
              py: { xs: 0.25, sm: 0.5 },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: 10, sm: 11 },
                width: "100%",
                color: "#fff",
                textAlign: "left",
              }}
            >
              {bet?.creatorID?.username}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 10, sm: 11 },
                width: "100%",
                color: "#fff",
                textAlign: "center",
              }}
            >
              {bet?.lost}:{bet?.win}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 10, sm: 11 },
                width: "100%",
                color: "#fff",
                textAlign: "center",
              }}
            >
              {bet?.money}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 10, sm: 11 },
                width: "100%",
                color:
                  bet?.selectedTeam === TeamEnum.RED ? "#ff3601" : "#0265ff",
                textAlign: "center",
              }}
            >
              {bet?.selectedTeam === TeamEnum.RED ? "Meron" : "Wala"}
            </Typography>
            {user?._id === bet?.creatorID._id &&
            bet?.status === BetHistoryStatusEnum.NOT_MATCHED ? (
              <Button
                variant="contained"
                size="small"
                onClick={() => handleCancelBet(bet)}
                disabled={loadingCancel}
                sx={{
                  fontSize: { xs: 9, sm: 10 },
                  width: { xs: "40px", sm: "50px" },
                  px: 0,
                  py: { xs: 0.05, sm: 0.1 },
                  fontWeight: 600,
                  backgroundColor: "#ff4242",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#d32f2f",
                  },
                }}
              >
                Hủy
              </Button>
            ) : bet?.status === BetHistoryStatusEnum.MATCHED ? (
              <Button
                variant="contained"
                size="small"
                disabled
                sx={{
                  fontSize: { xs: 9, sm: 10 },
                  width: { xs: "40px", sm: "50px" },
                  px: 0,
                  py: { xs: 0.05, sm: 0.1 },
                  fontWeight: 600,
                  backgroundColor: "#4caf50",
                  color: "#fff",
                  "&.Mui-disabled": {
                    backgroundColor: "#81c784",
                    color: "#fff",
                  },
                }}
              >
                Khớp
              </Button>
            ) : (
              <Button
                variant="contained"
                size="small"
                onClick={() => handleOpenAcceptDialog(bet)}
                sx={{
                  fontSize: { xs: 9, sm: 10 },
                  width: { xs: "40px", sm: "50px" },
                  px: 0,
                  py: { xs: 0.05, sm: 0.1 },
                  fontWeight: 600,
                  backgroundColor: "#0288d1",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#01579b",
                  },
                }}
              >
                Ăn
              </Button>
            )}
          </Box>
        ))}
      </ScrollContainer>
    </Paper>
  );
};

interface BetInfoProps {
  sessionID: string;
  isBetOpen: boolean;
  setIsBetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  betRoom: any;
  isReloadBetting: number;
  setIsReloadBetting: React.Dispatch<React.SetStateAction<number>>;
  setUserBetTotal: React.Dispatch<React.SetStateAction<number>>;
}

const slideVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: { height: "auto", opacity: 1 },
  exit: { height: 0, opacity: 0 },
};

// BetInfo.tsx
const BetInfo: React.FC<BetInfoProps> = ({
  sessionID,
  isBetOpen,
  setIsBetOpen,
  betRoom,
  isReloadBetting,
  setIsReloadBetting,
  setUserBetTotal,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [betHistories, setBetHistories] = useState<BettingHistoryInterface[]>(
    []
  );
  const [acceptDialogOpen, setAcceptDialogOpen] = useState(false);
  const [selectedBet, setSelectedBet] =
    useState<BettingHistoryInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const socket = useSocket();

  const getBetHistories = async () => {
    if (!betRoom?.latestSessionID) {
      console.warn("User or latestSessionID is missing");
      return;
    }
    try {
      const response = await getHistoriesBySession(betRoom.latestSessionID);
      if (response.status === 200 || response.status === 201) {
        setBetHistories(response.data);
        if (!user?._id) {
          return;
        }
        const userTotalBet = response?.data
          ?.filter(
            (item: BettingHistoryInterface) => item.creatorID._id === user._id
          )
          .reduce(
            (total: number, item: BettingHistoryInterface) =>
              total + Number(item.money),
            0
          );
        setUserBetTotal(userTotalBet);
      }
    } catch (error) {
      console.log("Error fetching bet histories:", error);
    }
  };

  useEffect(() => {
    if (!betRoom?.latestSessionID || !user) return;
    getBetHistories();
  }, [betRoom?.latestSessionID, user]);

  useEffect(() => {
    if (!socket || !betRoom?._id) return;
    const handler = async (msg: any) => {
      if (msg.roomID === betRoom._id) {
        await getBetHistories();
        setIsReloadBetting((prev) => prev + 1);
      }
    };
    socket.on("bet-history", handler);
    return () => {
      socket.off("bet-history", handler);
    };
  }, [socket, betRoom?._id, user]);

  useEffect(() => {
    getBetHistories();
  }, [isReloadBetting]);

  return (
    <>
      {!isMobile && (
        <AnimatePresence initial={false}>
          {isBetOpen && (
            <motion.div
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Box
                sx={{
                  width: "100%",
                  backgroundColor: "#212529",
                  position: "relative",
                  borderRadius: 2,
                }}
              >
                <CloseIcon
                  sx={{
                    fontSize: 24,
                    position: "absolute",
                    top: -8,
                    right: -8,
                    backgroundColor: "white",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                  onClick={() => setIsBetOpen(false)}
                />
                <BetList
                  title="Số lượt cược đang chờ: 1 (Meron)"
                  color="#ff4242"
                  betHistories={betHistories?.filter(
                    (item) => item.selectedTeam === TeamEnum.RED
                  )}
                  setIsReloadBetting={setIsReloadBetting}
                  sessionID={sessionID}
                  setAcceptDialogOpen={setAcceptDialogOpen}
                  setSelectedBet={setSelectedBet}
                  betRoom={betRoom}
                />
                <Box sx={{ height: "5px", mx: 2 }} />
                <BetList
                  title="Số lượt cược đang chờ: 1 (Wala)"
                  color="#0265ff"
                  betHistories={betHistories?.filter(
                    (item) => item.selectedTeam === TeamEnum.BLUE
                  )}
                  setIsReloadBetting={setIsReloadBetting}
                  sessionID={sessionID}
                  setAcceptDialogOpen={setAcceptDialogOpen}
                  setSelectedBet={setSelectedBet}
                  betRoom={betRoom}
                />
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      )}
      {isMobile && (
        <Dialog
          open={!isBetOpen}
          disableEscapeKeyDown
          fullWidth
          PaperProps={{
            sx: {
              position: "fixed",
              bottom: 0,
              m: 0,
              bgcolor: "#212529",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              maxHeight: "100%",
              width: "100%",
              boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.3)",
            },
          }}
          BackdropProps={{ sx: { backgroundColor: "transparent" } }}
          sx={{
            pointerEvents: "none",
            "& .MuiDialog-paper": { pointerEvents: "auto" },
          }}
        >
          <DialogContent sx={{ p: { xs: 1, sm: 2 }, position: "relative" }}>
            <IconButton
              onClick={() => setIsBetOpen(!isBetOpen)}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "white",
                bgcolor: "rgba(255,255,255,0.2)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
            <BetList
              title="Số lượt cược đang chờ: 1 (Meron)"
              color="#ff4242"
              betHistories={betHistories?.filter(
                (item) => item.selectedTeam === TeamEnum.RED
              )}
              setIsReloadBetting={setIsReloadBetting}
              sessionID={sessionID}
              setAcceptDialogOpen={setAcceptDialogOpen}
              setSelectedBet={setSelectedBet}
              betRoom={betRoom}
            />
            <Box sx={{ height: "5px", mx: 2 }} />
            <BetList
              title="Số lượt cược đang chờ: 1 (Wala)"
              color="#0265ff"
              betHistories={betHistories?.filter(
                (item) => item.selectedTeam === TeamEnum.BLUE
              )}
              setIsReloadBetting={setIsReloadBetting}
              sessionID={sessionID}
              setAcceptDialogOpen={setAcceptDialogOpen}
              setSelectedBet={setSelectedBet}
              betRoom={betRoom}
            />
          </DialogContent>
        </Dialog>
      )}
      <AcceptSolo
        acceptDialogOpen={acceptDialogOpen}
        setAcceptDialogOpen={setAcceptDialogOpen}
        setSelectedBet={setSelectedBet}
        setIsReloadBetting={setIsReloadBetting}
        selectedBet={selectedBet}
        betRoom={betRoom}
      />
    </>
  );
};
export default BetInfo;
