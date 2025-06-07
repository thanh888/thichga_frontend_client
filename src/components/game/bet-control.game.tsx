"use client";
import React, { useContext, useEffect, useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import { rates } from "@/utils/constans";
import { BetHistoryStatusEnum } from "@/utils/enum/bet-history-status.enum";
import { TeamEnum } from "@/utils/enum/team.enum";
import { BettingRoomInterface } from "@/utils/interfaces/bet-room.interface";
import { toast } from "react-toastify";
import { createBetHistorySoloApi } from "@/services/bet-history.api";
import { useSocket } from "@/socket";
import { sampleMoneys } from "@/utils/function-convert.util";
import { UserContext } from "@/contexts/user-context";
import { useRouter } from "next/navigation";

interface Props {
  setIsReloadBetting: React.Dispatch<React.SetStateAction<number>>;
  sessionID: string;
  betRoom: BettingRoomInterface;
}

// BetControls.tsx
export default function BetControls({
  setIsReloadBetting,
  sessionID,
  betRoom,
}: Readonly<Props>) {
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const checkSession = userContext?.checkSession;
  const [formData, setFormData] = useState({
    win: "10",
    lost: "10",
    money: "100",
    selectedTeam: null as TeamEnum | null,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const socket = useSocket();

  const router = useRouter();

  const handleSelect = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTeamSelect = (team: TeamEnum) => {
    setFormData((prevData) => ({ ...prevData, selectedTeam: team }));
  };

  const handleCreateBetHistory = async () => {
    if (!formData.selectedTeam) {
      toast.warning("Vui lòng chọn đội");
      return;
    }
    if (Number(formData.money) <= 0) {
      toast.warning("Vui lòng điền số tiền cược lớn hơn 0");
      return;
    }
    if (!user) {
      toast.warning("Đăng nhập để cược");
      router.push("/login");
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
      betRoomID: betRoom._id,
    };

    try {
      setLoading(true);
      const response = await createBetHistorySoloApi(newData);
      if (response.status === 200 || response.status === 201) {
        toast.success("Đặt cược thành công");
        setIsReloadBetting((prev) => prev + 1);
        if (socket) {
          socket.emit("bet-history", { roomID: betRoom._id });
        }
        if (checkSession) await checkSession();
      }
    } catch (error: any) {
      if (error?.response?.data?.message === "Betting is disable") {
        toast.warn("Phòng đã đóng cược");
      } else {
        console.log(error);
      }
    } finally {
      setLoading(false);
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
                  textAlign="center"
                  width="100%"
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
                    "& .MuiSelect-select": { py: 1 },
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
                  textAlign="center"
                  width="100%"
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
                    "& .MuiSelect-select": { py: 1 },
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
                  textAlign="center"
                  width="auto"
                  whiteSpace="nowrap"
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
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
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
                      "&:focus": { outline: "none" },
                    },
                    "& .MuiInputBase-root": { border: "none" },
                  }}
                  InputProps={{ sx: { "& input": { textAlign: "center" } } }}
                />
                <Select
                  id="money"
                  name="money"
                  sx={{
                    bgcolor: "white",
                    color: "black",
                    m: 0,
                    p: 0,
                    "& .MuiSelect-select": { py: 1 },
                  }}
                  onChange={handleSelect}
                  value=" "
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
                textAlign="left"
                width="100%"
                color="#ff4242"
                fontWeight={500}
              >
                Meron
              </Typography>
              <Typography
                variant="body2"
                id="lable_ratio"
                sx={{ color: "black" }}
                textAlign="center"
                width="100%"
                fontSize={14}
              >
                {betRoom?.redOdds} : {betRoom?.blueOdds}
              </Typography>
              <Typography
                variant="body2"
                id="lable_ratio"
                textAlign="right"
                width="100%"
                fontWeight={500}
                color="#0265ff"
              >
                Wala
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
              disabled={loading}
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
              disabled={loading}
            >
              {betRoom?.blueName}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
      <Box sx={{ width: "100%", textAlign: "center", my: 2 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleCreateBetHistory}
          disabled={loading}
          sx={{
            width: "60%",
            textAlign: "center",
            mx: "auto",
            borderRadius: 2,
            backgroundColor: "#ffeb3b",
            fontWeight: 600,
            color: "black",
            "&:hover": { backgroundColor: "#ffeb3b", color: "black" },
            animation: loading ? "none" : "beat .25s infinite alternate",
            transformOrigin: "center",
            "@keyframes beat": {
              "0%": { transform: "scale(1)" },
              "100%": { transform: "scale(1.05)" },
            },
          }}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "black" }} />
          ) : (
            "Đặt cược"
          )}
        </Button>
      </Box>
    </Box>
  );
}
