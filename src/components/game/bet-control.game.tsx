"use client";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { AnimatePresence, motion } from "framer-motion";
import {
  CardContent,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Box,
  SelectChangeEvent,
  TextField,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DefaultMoney, rates } from "@/utils/constans";
import { useUser } from "@/hooks/use-user";
import { BetHistoryStatusEnum } from "@/utils/enum/bet-history-status.enum";
import { TeamEnum } from "@/utils/enum/team.enum";
import { BettingRoomInterface } from "@/utils/interfaces/bet-room.interface";
import { toast } from "react-toastify";
import { createBetHistoryApi } from "@/services/auth/bet-history.api";
import { useSocket } from "@/socket";
import { sampleMoneys } from "@/utils/function-convert.util";

interface Props {
  isCommentOpen: boolean;
  setIsCommentOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsReloadBetting: React.Dispatch<React.SetStateAction<boolean>>;
  sessionID: string;
  betRoom: BettingRoomInterface;
}

const slideVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: { height: "auto", opacity: 1 },
  exit: { height: 0, opacity: 0 },
};

export default function BetControls({
  isCommentOpen,
  setIsCommentOpen,
  setIsReloadBetting,
  sessionID,
  betRoom,
}: Readonly<Props>) {
  const { user } = useUser();
  const { checkSession } = useUser();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [formData, setFormData] = useState({
    win: "10",
    lost: "10",
    money: "100000",
    selectedTeam: null as TeamEnum | null,
  });

  const handleSelect = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTeamSelect = (team: TeamEnum) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedTeam: team,
    }));
  };

  const socket = useSocket();

  const handleCreateBetHistory = async () => {
    if (!formData.selectedTeam) {
      toast.warning("Vui lòng chọn đội");
      return;
    }
    if (Number(formData.money) <= 0) {
      toast.warning("Vui lòng điền số tiền cược lớn hơn 0");
      return;
    }
    if (Number(formData.money) > Number(user.money)) {
      toast.warning("Tài khoản không đủ");
      return;
    }

    const newData = {
      betSessionID: sessionID,
      creatorID: user._id,
      money: formData.money,
      selectedTeam: formData.selectedTeam,
      status: BetHistoryStatusEnum.NOT_MATCHED,
      win: formData.win,
      lost: formData.lost,
    };

    try {
      const response = await createBetHistoryApi(newData);
      if (response.status === 200 || response.status === 201) {
        toast.success("Đặt cược thành công");
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
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message === "Betting is disable") {
        toast.warning("Phòng đã đóng cược");
      }
    }
  };

  return (
    <Box sx={{ backgroundColor: "#101828" }}>
      <CardContent sx={{ backgroundColor: "#212121", borderRadius: 2 }}>
        <Grid container spacing={2}>
          <Grid size={6}>
            <FormControl fullWidth>
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
                  sx={{ color: "black" }}
                  textAlign={"center"}
                  width={"100%"}
                >
                  Đặt
                </Typography>
                <Select
                  id="lost"
                  value={formData.lost}
                  name="lost"
                  sx={{
                    bgcolor: "white",
                    color: "black",
                    "& .MuiSelect-select": {
                      py: 1,
                    },
                  }}
                  onChange={handleSelect}
                >
                  {rates.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </FormControl>
          </Grid>
          <Grid size={6}>
            <FormControl fullWidth>
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
                  sx={{ color: "black" }}
                  textAlign={"center"}
                  width={"100%"}
                >
                  Ăn
                </Typography>
                <Select
                  id="win"
                  name="win"
                  value={formData.win}
                  sx={{
                    bgcolor: "white",
                    color: "black",
                    "& .MuiSelect-select": {
                      py: 1,
                    },
                  }}
                  onChange={handleSelect}
                >
                  {rates.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </FormControl>
          </Grid>
          <Grid size={12}>
            <FormControl fullWidth>
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
                  width={"auto"}
                  whiteSpace={"nowrap"}
                  px={1}
                >
                  Số tiền
                </Typography>
                <TextField
                  id="money"
                  name="money"
                  type="number"
                  value={formData.money}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      money: e.target.value,
                    }))
                  }
                  variant="outlined"
                  size="small"
                  sx={{
                    bgcolor: "white",
                    color: "black",
                    border: "none",
                    outline: "none",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "&:focus .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "& input": {
                      textAlign: "center",
                      border: "none",
                      outline: "none",
                      "&:focus": {
                        outline: "none",
                      },
                    },
                    "& .MuiInputBase-root": {
                      border: "none",
                    },
                  }}
                  InputProps={{
                    sx: {
                      "& input": {
                        textAlign: "center",
                      },
                    },
                  }}
                />
                <Select
                  id="money"
                  name="money"
                  sx={{
                    bgcolor: "white",
                    color: "black",
                    m: 0,
                    p: 0,
                    "& .MuiSelect-select": {
                      py: 1,
                    },
                  }}
                  onChange={handleSelect}
                  value={" "}
                >
                  {sampleMoneys.map((item, index) => (
                    <MenuItem key={+index} value={item.value}>
                      {item.lable}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </FormControl>
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
                px: 1,
                py: 2,
                borderRadius: 2,
              }}
            >
              <Typography
                variant="body2"
                id="lable_ratio"
                textAlign={"left"}
                width={"100%"}
                color="#ff4242"
                fontWeight={500}
              >
                Gà đỏ
              </Typography>
              <Typography
                variant="body2"
                id="lable_ratio"
                sx={{ color: "black" }}
                textAlign={"center"}
                width={"100%"}
                fontSize={14}
              >
                {betRoom?.redOdds} : {betRoom?.blueOdds}
              </Typography>
              <Typography
                variant="body2"
                id="lable_ratio"
                textAlign={"right"}
                width={"100%"}
                fontWeight={500}
                color="#0265ff"
              >
                Gà xanh
              </Typography>
            </Box>
          </Grid>
          <Grid
            size={12}
            sx={{ display: "flex", justifyContent: "center", gap: 1 }}
          >
            <Button
              variant={
                formData.selectedTeam === TeamEnum.RED
                  ? "contained"
                  : "outlined"
              }
              color="error"
              sx={{
                width: "100%",
                py: 1,
                fontWeight: 500,
                backgroundColor:
                  formData.selectedTeam === TeamEnum.RED
                    ? "#d32f2f"
                    : undefined,
                "&:hover": {
                  backgroundColor:
                    formData.selectedTeam === TeamEnum.RED
                      ? "#b71c1c"
                      : undefined,
                },
              }}
              onClick={() => handleTeamSelect(TeamEnum.RED)}
            >
              {betRoom?.redName}
            </Button>
            <Button
              variant={
                formData.selectedTeam === TeamEnum.BLUE
                  ? "contained"
                  : "outlined"
              }
              color={
                formData.selectedTeam === TeamEnum.BLUE ? "primary" : "info"
              }
              sx={{
                width: "100%",
                py: 1,
                fontWeight: 500,
                backgroundColor:
                  formData.selectedTeam === TeamEnum.BLUE
                    ? "#0288d1"
                    : undefined,
                "&:hover": {
                  backgroundColor:
                    formData.selectedTeam === TeamEnum.BLUE
                      ? "#01579b"
                      : undefined,
                },
              }}
              onClick={() => handleTeamSelect(TeamEnum.BLUE)}
            >
              {betRoom?.blueName}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
          my: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleCreateBetHistory}
          sx={{
            width: "60%",
            textAlign: "center",
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
      </Box>

      <AnimatePresence initial={false}>
        {isCommentOpen && (
          <motion.div
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Box
              sx={{
                backgroundColor: "#212121",
                borderRadius: 2,
                height: { xs: "300px", sm: "400px" },
                position: "relative",
              }}
            >
              <CloseIcon
                sx={{
                  position: "absolute",
                  top: -8,
                  right: -8,
                  cursor: "pointer",
                  color: "black",
                  fontSize: 24,
                  zIndex: 2,
                  backgroundColor: "white",
                  borderRadius: "50%",
                }}
                onClick={() => setIsCommentOpen(false)}
                fontSize="large"
              />
              <Typography
                variant="h6"
                sx={{
                  position: "absolute",
                  height: "54px",
                  zIndex: 1,
                  bgcolor: "#212121",
                  width: "100%",
                  px: 2,
                  py: 1,
                  color: "white",
                  borderBottom: "1px solid white",
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                }}
              >
                Bình luận trực tuyến
              </Typography>
              {betRoom.chattingJframe && (
                <Box
                  sx={{
                    paddingTop: "54px",
                    height: "100%",
                    overflow: "hidden",
                  }}
                >
                  <iframe
                    src={betRoom.chattingJframe}
                    width="100%"
                    height={isMobile ? "246px" : "346px"}
                    allow="autoplay"
                    frameBorder="0"
                    scrolling="auto"
                    title="Live Comments"
                  />
                </Box>
              )}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
