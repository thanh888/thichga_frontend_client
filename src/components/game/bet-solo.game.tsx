"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
  deleteBetHistoryApi,
  getHistoriesBySession,
  updateMatchedBetHistoryApi,
} from "@/services/auth/bet-history.api";
import { BettingHistoryInterface } from "@/utils/interfaces/bet-history.interface";
import { TeamEnum } from "@/utils/enum/team.enum";
import { BetHistoryStatusEnum } from "@/utils/enum/bet-history-status.enum";
import { useUser } from "@/hooks/use-user";
import { toast } from "react-toastify";
import { calculateMoneyBet } from "@/utils/function-convert.util";
import { useSocket } from "@/socket";
import AcceptSolo from "../lib/dialogs/confirm-solo";

const ScrollContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Box
    sx={{
      height: { xs: "200px", sm: "300px" },
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
  setIsReloadBetting: Dispatch<SetStateAction<boolean>>;
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
  const { user } = useUser();

  const socket = useSocket();

  const handleCancelBet = async (bet: BettingHistoryInterface) => {
    try {
      const response = await deleteBetHistoryApi(bet?._id);
      if (response.status === 200 || response.status === 201) {
        toast.success("Hủy thành công");
        if (socket) {
          socket.emit("bet-history", {
            roomID: betRoom._id,
          });
        }
      }
      setIsReloadBetting(true);
    } catch (error) {
      console.log(error);
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
          {betHistories
            ?.map((item) => item.money)
            .reduce((prev, next) => prev + next, 0)}
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
              {bet?.win}:{bet?.lost}
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
                color: bet?.selectedTeam === TeamEnum.RED ? "red" : "#0265ff",
                textAlign: "center",
              }}
            >
              {bet?.selectedTeam === TeamEnum.RED ? "Gà đỏ" : "Gà xanh"}
            </Typography>
            {user._id === bet?.creatorID._id &&
            bet?.status === BetHistoryStatusEnum.NOT_MATCHED ? (
              <Button
                variant="contained"
                size="small"
                onClick={() => handleCancelBet(bet)}
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
  isReloadBetting: boolean;
  setIsReloadBetting: React.Dispatch<React.SetStateAction<boolean>>;
  setUserBetTotal: React.Dispatch<React.SetStateAction<number>>;
}

const slideVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: { height: "auto", opacity: 1 },
  exit: { height: 0, opacity: 0 },
};

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
  const { user } = useUser();
  const { checkSession } = useUser();

  const socket = useSocket();

  const getBetHistories = async () => {
    try {
      const response = await getHistoriesBySession(sessionID);
      if (response.status === 200 || response.status === 201) {
        setBetHistories(response.data);
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
      console.log(error);
    }
  };

  useEffect(() => {
    if (!socket || !betRoom?._id) return;

    socket.on("bet-history", (msg) => {
      if (msg.roomID === betRoom._id) {
        getBetHistories();
      }
    });

    return () => {
      socket.off("bet-history");
    };
  }, [socket, betRoom?._id]);

  const handleAcceptBet = async () => {
    if (!selectedBet) return;

    const newData = {
      betSessionID: sessionID,
      creatorID: user._id,
      money: calculateMoneyBet(
        selectedBet?.win ?? 0,
        selectedBet?.lost ?? 0,
        selectedBet?.money ?? 0
      ),
      selectedTeam:
        selectedBet?.selectedTeam === TeamEnum.BLUE
          ? TeamEnum.RED
          : TeamEnum.BLUE,
      status: BetHistoryStatusEnum.MATCHED,
      win: selectedBet?.lost,
      lost: selectedBet?.win,
      matchedUserId: selectedBet?.creatorID._id,
      betOptionID: "",
    };

    try {
      const response = await updateMatchedBetHistoryApi(
        selectedBet?._id,
        newData
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("Khớp kèo thành công");
        setAcceptDialogOpen(false);
        setSelectedBet(null);
        setIsReloadBetting(true);
        if (socket) {
          if (checkSession) {
            checkSession();
          }
          socket.emit("bet-history", {
            roomID: betRoom._id,
          });
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Lỗi khi khớp kèo");
    }
  };

  useEffect(() => {
    if (isReloadBetting) {
      getBetHistories();
      setIsReloadBetting(false);
    }
  }, [isReloadBetting]);

  useEffect(() => {
    console.log("123213:");

    getBetHistories();
  }, []);

  return (
    <>
      {/* Desktop: Inline BetInfo */}
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
                  title="Số lượt cược đang chờ: 1 (Gà đỏ)"
                  color="#ff4242"
                  betHistories={betHistories?.filter(
                    (item) => item.selectedTeam === TeamEnum.RED && item
                  )}
                  setIsReloadBetting={setIsReloadBetting}
                  sessionID={sessionID}
                  setAcceptDialogOpen={setAcceptDialogOpen}
                  setSelectedBet={setSelectedBet}
                  betRoom={betRoom}
                />
                <Box sx={{ height: "5px", mx: 2 }} />
                <BetList
                  title="Số lượt cược đang chờ: 1 (Gà Xanh)"
                  color="#0265ff"
                  betHistories={betHistories?.filter(
                    (item) => item.selectedTeam === TeamEnum.BLUE && item
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

      {/* Mobile: Dialog BetInfo */}
      {isMobile && (
        <Dialog
          open={isBetOpen}
          onClose={() => setIsBetOpen(false)}
          fullWidth
          sx={{
            "& .MuiDialog-paper": {
              position: "absolute",
              bottom: 0,
              m: 0,
              bgcolor: "#212529",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              maxHeight: "70vh",
              width: "100%",
            },
          }}
        >
          <DialogContent sx={{ p: { xs: 1, sm: 2 }, position: "relative" }}>
            <IconButton
              onClick={() => setIsBetOpen(false)}
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
              title="Số lượt cược đang chờ: 1 (Gà đỏ)"
              color="#ff4242"
              betHistories={betHistories?.filter(
                (item) => item.selectedTeam === TeamEnum.RED && item
              )}
              setIsReloadBetting={setIsReloadBetting}
              sessionID={sessionID}
              setAcceptDialogOpen={setAcceptDialogOpen}
              setSelectedBet={setSelectedBet}
              betRoom={betRoom}
            />
            <Box sx={{ height: "5px", mx: 2 }} />
            <BetList
              title="Số lượt cược đang chờ: 1 (Gà Xanh)"
              color="#0265ff"
              betHistories={betHistories?.filter(
                (item) => item.selectedTeam === TeamEnum.BLUE && item
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

      {/* Accept Bet Dialog */}
      <AcceptSolo
        open={acceptDialogOpen}
        onClose={() => {
          setAcceptDialogOpen(false);
          setSelectedBet(null);
        }}
        selectedBet={selectedBet}
        betRoom={betRoom}
        handleAcceptBet={handleAcceptBet}
      />
    </>
  );
};

export default BetInfo;
