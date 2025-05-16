import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  CardContent,
  Grid,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DefaultMoney, rates } from "@/utils/constans";
import { BettingHistoryInterface } from "@/utils/interfaces/bet-history.interface";
import { TeamEnum } from "@/utils/enum/team.enum";
import {
  calculateMoneyBet,
  numberThousand,
} from "@/utils/function-convert.util";
import { BettingRoomInterface } from "@/utils/interfaces/bet-room.interface";
import { useUser } from "@/hooks/use-user";
import { BetHistoryStatusEnum } from "@/utils/enum/bet-history-status.enum";
import {
  createBetHistoryApi,
  createBetHistoryByOptionApi,
  getHistoriesBySession,
  updateMatchedBetHistoryApi,
} from "@/services/auth/bet-history.api";
import { toast } from "react-toastify";
import { BettingOptionInterface } from "@/utils/interfaces/bet-option.interface";

interface AcceptBetDialogProps {
  open: boolean;
  onClose: () => void;
  selectedOption: BettingOptionInterface | null;
  betRoom: BettingRoomInterface;
  setUserBetTotal: React.Dispatch<React.SetStateAction<number>>;
}

const AcceptNormal: React.FC<AcceptBetDialogProps> = ({
  open,
  onClose,
  selectedOption,
  betRoom,
  setUserBetTotal,
}) => {
  const { user } = useUser();
  const { checkSession } = useUser();
  const [money, setMoney] = useState<string>("100000");

  const handleAcceptBet = async () => {
    if (!selectedOption) return;

    if (Number(money) < 50000) {
      toast.warning("Số tiền phải lớn hơn 50k");
      return;
    }

    const newData = {
      betSessionID: betRoom.latestSessionID,
      creatorID: user._id,
      money: money,
      selectedTeam:
        selectedOption?.selectedTeam === TeamEnum.BLUE
          ? TeamEnum.RED
          : TeamEnum.BLUE,
      status: BetHistoryStatusEnum.MATCHED,
      win: selectedOption?.lost,
      lost: selectedOption?.win,
      betOptionID: selectedOption._id,
    };

    try {
      const response = await createBetHistoryApi(newData);
      if (response.status === 200 || response.status === 201) {
        toast.success("Khớp kèo thành công");

        onClose();
        if (checkSession) {
          checkSession();
        }
        setIsReload(true);
      }
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message === "Betting is disable") {
        toast.warning("Phòng đã đóng cược");
      }
    }
  };

  const [isReload, setIsReload] = useState<boolean>(true);

  useEffect(() => {
    if (setIsReload) {
      getTotalBetOfUser();
      setIsReload(false);
    }
  }, [isReload]);

  const getTotalBetOfUser = async () => {
    if (!betRoom.latestSessionID) {
      return;
    }
    try {
      const response = await getHistoriesBySession(betRoom.latestSessionID);
      if (response.status === 200 || response.status === 201) {
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

  return (
    <Dialog
      open={open}
      onClose={onClose}
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
          onClick={onClose}
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
                  {selectedOption?.win}
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
                  id="wint"
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
                  id="wint"
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
                  {selectedOption?.lost}
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
                  variant="body2"
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
                <TextField
                  id="money"
                  name="money"
                  value={money}
                  onChange={(e) => setMoney(e.target.value)}
                  type="number"
                  sx={{
                    color: "black",
                    border: "1px solid #ccc",
                    alignContent: "center",
                    fontSize: 20,
                    width: "100%",
                  }}
                />
              </Box>
            </Grid>

            <Grid
              size={12}
              sx={{ display: "flex", justifyContent: "center", gap: 1 }}
            >
              <Button
                variant={
                  selectedOption?.selectedTeam === TeamEnum.BLUE
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
                  selectedOption?.selectedTeam === TeamEnum.RED
                    ? "contained"
                    : "outlined"
                }
                color={
                  selectedOption?.selectedTeam === TeamEnum.RED
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

export default AcceptNormal;
