"use client";
import React, { useEffect, useState } from "react";
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
import { getHistoriesBySession } from "@/services/auth/bet-history.api";
import { BettingHistoryInterface } from "@/utils/interfaces/bet-history.interface";
import { TeamEnum } from "@/utils/enum/team.enum";
import { BetHistoryStatusEnum } from "@/utils/enum/bet-history-status.enum";
import { useUser } from "@/hooks/use-user";

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
  betHistories: any;
}> = ({ title, color, betHistories }) => {
  const { user } = useUser();

  const handleCancelBet = (bet: BettingHistoryInterface) => {
    alert(
      `Bạn đã hủy cược của ${bet.creatorID.username} với số tiền ${bet.money}.`
    );
  };

  const handleAcceptBet = (bet: BettingHistoryInterface) => {
    alert(
      `Bạn đã chấp nhận cược của ${bet.creatorID.username} với số tiền ${bet.money}.`
    );
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
          100,00
        </Typography>
      </Typography>
      <ScrollContainer>
        {betHistories?.map((bet: BettingHistoryInterface, index: number) => (
          <Box
            key={index}
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
              {bet.red_odds}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 10, sm: 11 },
                width: "100%",
                color: "#fff",
                textAlign: "center",
              }}
            >
              {bet.blue_odds}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 10, sm: 11 },
                width: "100%",
                color: "#fff",
                textAlign: "center",
              }}
            >
              {bet.money}
            </Typography>
            {user._id === bet.creatorID._id &&
            bet.status === BetHistoryStatusEnum.NOT_MATCHED ? (
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
                  backgroundColor: "#ff4242", // Red for Cancel
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#d32f2f", // Darker red on hover
                  },
                }}
              >
                Hủy
              </Button>
            ) : bet.status === BetHistoryStatusEnum.MATCHED ? (
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
                  backgroundColor: "#4caf50", // Green for Matched
                  color: "#fff",
                  "&.Mui-disabled": {
                    backgroundColor: "#81c784", // Lighter green for disabled
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
                onClick={() => handleAcceptBet(bet)}
                sx={{
                  fontSize: { xs: 9, sm: 10 },
                  width: { xs: "40px", sm: "50px" },
                  px: 0,
                  py: { xs: 0.05, sm: 0.1 },
                  fontWeight: 600,
                  backgroundColor: "#0288d1", // Blue for Accept
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#01579b", // Darker blue on hover
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
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [betHistories, setBetHistories] = useState<BettingHistoryInterface[]>();

  const getBetHistories = async (session_id: string) => {
    try {
      const response = await getHistoriesBySession(session_id);
      if (response.status === 200 || response.status === 201) {
        setBetHistories(response.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getBetHistories(sessionID);
  }, [sessionID]);

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
                />
                <Box sx={{ height: "5px", mx: 2 }} />
                <BetList
                  title="Số lượt cược đang chờ: 1 (Gà Xanh)"
                  color="#0265ff"
                  betHistories={betHistories?.filter(
                    (item) => item.selectedTeam === TeamEnum.BLUE && item
                  )}
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
            />
            <Box sx={{ height: "5px", mx: 2 }} />
            <BetList
              title="Số lượt cược đang chờ: 1 (Gà Xanh)"
              color="#0265ff"
              betHistories={betHistories?.filter(
                (item) => item.selectedTeam === TeamEnum.BLUE && item
              )}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default BetInfo;
