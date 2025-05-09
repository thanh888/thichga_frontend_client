import React from "react";
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
import { DefaultMoney, rates } from "@/utils/constans";
import { BettingHistoryInterface } from "@/utils/interfaces/bet-history.interface";
import { TeamEnum } from "@/utils/enum/team.enum";
import {
  calculateMoneyBet,
  numberThousand,
} from "@/utils/function-convert.util";

interface AcceptBetDialogProps {
  open: boolean;
  onClose: () => void;
  selectedBet: BettingHistoryInterface | null;
  betRoom: any;
  handleAcceptBet: () => void;
  user: any;
}

const AcceptBetDialog: React.FC<AcceptBetDialogProps> = ({
  open,
  onClose,
  selectedBet,
  betRoom,
  handleAcceptBet,
  user,
}) => {
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
                  id="win"
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
                  {selectedBet?.lost}
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
                  id="lable_ratio"
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
                  {selectedBet?.win}
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
                  {numberThousand(
                    calculateMoneyBet(
                      selectedBet?.win || 0,
                      selectedBet?.lost || 0,
                      selectedBet?.money || 0
                    ).toString()
                  )}
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

export default AcceptBetDialog;
