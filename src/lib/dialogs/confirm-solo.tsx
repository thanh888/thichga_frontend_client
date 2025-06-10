import React, { useContext } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  CardContent,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { BettingHistoryInterface } from "@/utils/interfaces/bet-history.interface";
import { TeamEnum } from "@/utils/enum/team.enum";
import { calculateMoneyBet } from "@/utils/function-convert.util";
import { BettingRoomInterface } from "@/utils/interfaces/bet-room.interface";
import { BetHistoryStatusEnum } from "@/utils/enum/bet-history-status.enum";
import { updateMatchedBetHistoryApi } from "@/services/bet-history.api";
import { toast } from "react-toastify";
import { useSocket } from "@/socket";
import { UserContext } from "@/contexts/user-context";
import { useRouter } from "next/navigation";

interface AcceptBetDialogProps {
  acceptDialogOpen: boolean;
  selectedBet: BettingHistoryInterface | null;
  betRoom: BettingRoomInterface;
  setAcceptDialogOpen: (acceptDialogOpen: boolean) => void;
  setSelectedBet: (bet: BettingHistoryInterface | null) => void;
  setIsReloadBetting: React.Dispatch<React.SetStateAction<number>>;
}

const AcceptSolo: React.FC<AcceptBetDialogProps> = ({
  acceptDialogOpen,
  selectedBet,
  betRoom,
  setAcceptDialogOpen,
  setSelectedBet,
  setIsReloadBetting,
}) => {
  const userContext = useContext(UserContext);
  const user = userContext?.user;

  const checkSession = userContext?.checkSession;

  const socket = useSocket();
  const router = useRouter();

  const handleClose = () => {
    setAcceptDialogOpen(false);
    setSelectedBet(null);
  };

  const handleAcceptBet = async () => {
    if (!selectedBet) {
      return;
    }
    if (!user) {
      toast.warning("Đăng nhập để cược");
      router.push("/login");
      return;
    }

    const newData = {
      betSessionID: betRoom.latestSessionID,
      creatorID: user._id,
      money: calculateMoneyBet(
        selectedBet?.lost || 0,
        selectedBet?.win || 0,
        selectedBet?.money || 0
      ).toString(),
      selectedTeam:
        selectedBet?.selectedTeam === TeamEnum.BLUE
          ? TeamEnum.RED
          : TeamEnum.BLUE,
      status: BetHistoryStatusEnum.MATCHED,
      win: selectedBet?.lost,
      lost: selectedBet?.win,
      matchedUserId: selectedBet?.creatorID._id,
      betRoomID: betRoom._id,
    };

    try {
      const response = await updateMatchedBetHistoryApi(
        selectedBet?._id,
        newData
      );
      setAcceptDialogOpen(false);
      if (response.status === 200 || response.status === 201) {
        toast.success("Khớp kèo thành công");
        setSelectedBet(null);
        setIsReloadBetting((prev: number) => prev + 1);
        checkSession?.();
        if (socket) {
          socket.emit("bet-history", {
            roomID: betRoom._id,
          });
        }
      }
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message === "Betting is disable") {
        toast.warning("Phòng đã đóng cược");
      } else if (
        error?.response?.data?.message === "Bet history is already matched"
      ) {
        toast.warning("Cược này đã khớp, vui chọn cược khác");
      } else if (
        error?.response?.data?.message === "Bet has already been matched"
      ) {
        toast.warning("Cược này đã khớp, vui chọn cược khác");
      }
    }
  };

  return (
    <Dialog
      open={acceptDialogOpen}
      onClose={handleClose}
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
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
          onClick={handleClose}
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
        <CardContent sx={{ backgroundColor: "#212121", borderRadius: 2 }}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  border: "1px solid #ccc",
                  bgcolor: "white",
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="body2"
                  id="lost"
                  sx={{
                    color: "black",
                    alignContent: "center",
                    fontSize: 20,
                  }}
                  textAlign={"center"}
                  width={"100%"}
                >
                  Đặt
                </Typography>
                <Typography
                  variant="body2"
                  id="lost"
                  sx={{
                    color: "black",
                    border: "1px solid #ccc",
                    alignContent: "center",
                    fontSize: 20,
                  }}
                  textAlign={"center"}
                  width={"100%"}
                  height={40}
                >
                  {selectedBet?.win}
                </Typography>
              </Box>
            </Grid>
            <Grid size={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  border: "1px solid #ccc",
                  bgcolor: "white",
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="body2"
                  id="win"
                  sx={{
                    color: "black",
                    alignContent: "center",
                    fontSize: 20,
                  }}
                  textAlign={"center"}
                  width={"100%"}
                >
                  Ăn
                </Typography>
                <Typography
                  variant="body2"
                  id="win"
                  sx={{
                    color: "black",
                    border: "1px solid #ccc",
                    alignContent: "center",
                    fontSize: 20,
                  }}
                  textAlign={"center"}
                  width={"100%"}
                  height={40}
                >
                  {selectedBet?.lost}
                </Typography>
              </Box>
            </Grid>
            <Grid size={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  border: "1px solid #ccc",
                  bgcolor: "white",
                  borderRadius: 2,
                }}
              >
                <Typography
                  id="lable_money"
                  sx={{ color: "black" }}
                  textAlign={"center"}
                  width={"100%"}
                  whiteSpace={"nowrap"}
                  px={1}
                  fontSize={20}
                >
                  Số tiền
                </Typography>
                <Typography
                  variant="body2"
                  id="lable_ratio"
                  sx={{
                    color: "black",
                    border: "1px solid #ccc",
                    alignContent: "center",
                    fontSize: 20,
                  }}
                  textAlign={"center"}
                  width={"100%"}
                  height={40}
                >
                  {calculateMoneyBet(
                    selectedBet?.lost || 0,
                    selectedBet?.win || 0,
                    selectedBet?.money || 0
                  ).toString()}
                </Typography>
              </Box>
            </Grid>

            <Grid
              size={12}
              sx={{ display: "flex", justifyContent: "center", gap: 1 }}
            >
              <Button
                variant={
                  selectedBet?.selectedTeam === TeamEnum.BLUE
                    ? "contained"
                    : "outlined"
                }
                type="button"
                color="error"
                // disabled
                sx={{
                  width: "100%",
                  py: 1,
                  fontWeight: 500,
                }}
              >
                {betRoom?.redName}
              </Button>
              <Button
                variant={
                  selectedBet?.selectedTeam === TeamEnum.RED
                    ? "contained"
                    : "outlined"
                }
                color={
                  selectedBet?.selectedTeam === TeamEnum.RED
                    ? "primary"
                    : "info"
                }
                // disabled
                sx={{
                  width: "100%",
                  py: 1,
                  fontWeight: 500,
                }}
              >
                {betRoom?.blueName}
              </Button>
            </Grid>
            <Grid size={12} sx={{ mt: 2, textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleAcceptBet}
                sx={{
                  width: "60%",
                  mx: "auto",
                  borderRadius: 2,
                  backgroundColor: "#ffeb3b",
                  fontWeight: 600,
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#ffeb3b",
                    color: "black",
                  },
                  animation: "beat .25s infinite alternate",
                  transformOrigin: "center",
                  "@keyframes beat": {
                    "0%": {
                      transform: "scale(1)",
                    },
                    "100%": {
                      transform: "scale(1.05)",
                    },
                  },
                }}
              >
                Đặt cược
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </DialogContent>
    </Dialog>
  );
};

export default AcceptSolo;
