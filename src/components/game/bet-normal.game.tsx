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
import { BettingOptionInterface } from "@/utils/interfaces/bet-option.interface";
import { TeamEnum } from "@/utils/enum/team.enum";
import { useSocket } from "@/socket";
import { getOptionsBySession } from "@/services/bet-option.api";
import AcceptNormal from "../../lib/dialogs/confirm-normal";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../spinner/LoadingSpinner";

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

const OptionList: React.FC<{
  title: string;
  color: string;
  betOptions: any[];
  setAcceptDialogOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedBet: Dispatch<SetStateAction<BettingOptionInterface | null>>;
}> = ({ title, color, betOptions, setAcceptDialogOpen, setSelectedBet }) => {
  const handleOpenAcceptDialog = (bet: BettingOptionInterface) => {
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
          {betOptions.length}
        </Typography>
      </Typography>
      <ScrollContainer>
        {betOptions?.map((bet: BettingOptionInterface, index: number) => (
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
                textAlign: "center",
              }}
            >
              {bet?.lost}:{bet?.win}
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

// BetNormal.tsx
const BetNormal: React.FC<BetInfoProps> = ({
  sessionID,
  isBetOpen,
  betRoom,
  isReloadBetting,
  setIsBetOpen,
  setIsReloadBetting,
  setUserBetTotal,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [betOptions, setBetOptions] = useState<BettingOptionInterface[]>([]);
  const [acceptDialogOpen, setAcceptDialogOpen] = useState(false);
  const [selectedOption, setSelectedBet] =
    useState<BettingOptionInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const socket = useSocket();

  const getBetOptions = async () => {
    try {
      setLoading(true);
      const response = await getOptionsBySession(sessionID);
      if (response.status === 200 || response.status === 201) {
        setBetOptions(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!socket || !betRoom?._id) return;
    socket.on("update-option", (msg) => {
      if (msg.roomID === betRoom._id) getBetOptions();
    });
    return () => {
      socket.off("update-option");
    };
  }, [socket, betRoom?._id]);

  useEffect(() => {
    getBetOptions();
  }, [isReloadBetting]);

  useEffect(() => {
    getBetOptions();
  }, [sessionID]);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
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
                    <OptionList
                      title="Số lượt cược đang chờ: (Meron)"
                      color="#ff4242"
                      betOptions={betOptions?.filter(
                        (item) => item.selectedTeam === TeamEnum.RED
                      )}
                      setAcceptDialogOpen={setAcceptDialogOpen}
                      setSelectedBet={setSelectedBet}
                    />
                    <Box sx={{ height: "5px", mx: 2 }} />
                    <OptionList
                      title="Số lượt cược đang chờ: (Wala)"
                      color="#0265ff"
                      betOptions={betOptions?.filter(
                        (item) => item.selectedTeam === TeamEnum.BLUE
                      )}
                      setAcceptDialogOpen={setAcceptDialogOpen}
                      setSelectedBet={setSelectedBet}
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
                  maxHeight: "50vh",
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
                <OptionList
                  title="Số lượt cược đang chờ: (Meron)"
                  color="#ff4242"
                  betOptions={betOptions?.filter(
                    (item) => item.selectedTeam === TeamEnum.RED
                  )}
                  setAcceptDialogOpen={setAcceptDialogOpen}
                  setSelectedBet={setSelectedBet}
                />
                <Box sx={{ height: "5px", mx: 2 }} />
                <OptionList
                  title="Số lượt cược đang chờ: (Wala)"
                  color="#0265ff"
                  betOptions={betOptions?.filter(
                    (item) => item.selectedTeam === TeamEnum.BLUE
                  )}
                  setAcceptDialogOpen={setAcceptDialogOpen}
                  setSelectedBet={setSelectedBet}
                />
              </DialogContent>
            </Dialog>
          )}
          <AcceptNormal
            open={acceptDialogOpen}
            onClose={() => {
              setAcceptDialogOpen(false);
              setSelectedBet(null);
            }}
            selectedOption={selectedOption}
            betRoom={betRoom}
            setUserBetTotal={setUserBetTotal}
          />
        </>
      )}
    </>
  );
};
export default BetNormal;
