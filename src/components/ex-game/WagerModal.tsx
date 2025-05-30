import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  Box,
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
  SelectChangeEvent,
  CircularProgress, // Added for loading indicator
} from "@mui/material";
import { TeamEnum } from "@/utils/enum/team.enum";
import { exRates } from "@/utils/constans";
import { useUser } from "@/hooks/use-user";
import { createOptionExGame } from "@/services/bet-option.api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { UserContext } from "@/contexts/user-context";
import { useSocket } from "@/socket";
import { numberThousandFload } from "@/utils/function-convert.util";

interface WagerModalProps {
  open: boolean;
  onClose: () => void;
  sessionID: string;
  setIsReloadOption: React.Dispatch<React.SetStateAction<boolean>>;
  betRoomID: string;
}

const WagerModal: React.FC<WagerModalProps> = ({
  open,
  onClose,
  sessionID,
  setIsReloadOption,
  betRoomID,
}) => {
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const { checkSession } = useUser();
  const router = useRouter();
  const socket = useSocket();

  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [lost, setLost] = useState("10");
  const [win, setWin] = useState("10");
  const [betAmount, setBetAmount] = useState("");
  const [winAmount, setWinAmount] = useState(0);
  const [loading, setLoading] = useState(false); // Added loading state
  const [errors, setErrors] = useState<{
    team?: string;
    betAmount?: string;
    lost?: string;
    win?: string;
    user?: string;
  }>({});

  useEffect(() => {
    const calculatedWinAmount =
      (parseFloat(betAmount) / parseFloat(lost)) * parseFloat(win);
    setWinAmount(isNaN(calculatedWinAmount) ? 0 : calculatedWinAmount);
  }, [betAmount, lost, win, selectedTeam]);

  const validateForm = () => {
    const newErrors: {
      team?: string;
      betAmount?: string;
      lost?: string;
      win?: string;
      user?: string;
    } = {};

    if (!user?._id) {
      newErrors.user = "Bạn cần đăng nhập để tạo kèo.";
    }
    if (!selectedTeam) {
      newErrors.team = "Vui lòng chọn một đội.";
    }
    if (!betAmount || parseFloat(betAmount) < 100) {
      newErrors.betAmount = "Số tiền đặt phải lớn hơn hoặc bằng 100";
    }
    if (!lost || isNaN(parseFloat(lost))) {
      newErrors.lost = "Vui lòng chọn tỷ lệ đặt hợp lệ.";
    }
    if (!win || isNaN(parseFloat(win))) {
      newErrors.win = "Vui lòng chọn tỷ lệ ăn hợp lệ.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!user?._id) {
      router.push("/login");
      return;
    }

    setLoading(true); // Set loading to true when submission starts

    const formData = new FormData();
    formData.append("selectedTeam", selectedTeam);
    formData.append("lost", lost);
    formData.append("win", win);
    formData.append("money", betAmount);
    formData.append("betSessionID", sessionID);
    formData.append("makerID", user._id);
    formData.append("creatorID", user._id);
    formData.append("betRoomID", betRoomID);

    try {
      const response = await createOptionExGame(formData);
      if (response.status === 200 || response.status === 201) {
        setIsReloadOption(true);
        onClose();
        toast.success("Tạo kèo thành công");
        if (checkSession) {
          checkSession();
        }
        if (socket) {
          socket.emit("bet-history", {
            roomID: betRoomID,
          });
        }
      }
    } catch (error: any) {
      if (error?.response?.data?.message === "Betting is disable") {
        toast.warning("Phòng đã đóng cược");
      } else {
        toast.warning("Tạo kèo thất bại, vui lòng thử lại sau");
      }
      console.log(error);
    } finally {
      setLoading(false); // Reset loading state when submission completes or fails
    }
  };

  const handleTeamSelect = (team: string) => {
    setSelectedTeam(team === selectedTeam ? "" : team);
    setErrors({ ...errors, team: undefined });
  };

  const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBetAmount(e.target.value);
    setErrors({ ...errors, betAmount: undefined });
  };

  const handleLostChange = (
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => {
    setLost(e.target.value);
    setErrors({ ...errors, lost: undefined });
  };

  const handleWinChange = (
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => {
    setWin(e.target.value);
    setErrors({ ...errors, win: undefined });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          bgcolor: "#222222",
          p: 3,
          borderRadius: 2,
          border: "2px solid #d7b500",
          width: "90%",
          maxWidth: 400,
          animation: open ? "modalOpening 0.2s" : "modalClosing 0.2s",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "#d7b500", fontWeight: 600, fontSize: 20 }}
          >
            TẠO KÈO
          </Typography>
          <Button
            onClick={onClose}
            sx={{
              color: "#FFFFFF",
              fontWeight: 600,
              fontSize: 24,
              minWidth: "auto",
              px: 1,
            }}
            disabled={loading} // Disable close button while loading
          >
            ×
          </Button>
        </Box>
        <form onSubmit={handleSubmit}>
          {errors.user && (
            <Typography sx={{ color: "red", mb: 2, fontSize: 14 }}>
              {errors.user}
            </Typography>
          )}
          <Box
            sx={{ display: "flex", gap: 2, mb: 2, justifyContent: "center" }}
          >
            <Button
              onClick={() => handleTeamSelect(TeamEnum.BLUE)}
              variant="outlined"
              disabled={loading} // Disable team selection while loading
              sx={{
                bgcolor: selectedTeam === TeamEnum.BLUE ? "#005FA7" : "#333",
                color: "#d7b500",
                fontWeight: 600,
                fontSize: 20,
                borderRadius: 2,
                border: "4px dashed #005FA7",
                width: "100%",
                "&:hover": {
                  bgcolor:
                    selectedTeam === TeamEnum.RED ? "#005FA7" : undefined,
                },
                minWidth: "100px",
              }}
            >
              GÀ XANH
            </Button>
            <Button
              onClick={() => handleTeamSelect(TeamEnum.RED)}
              variant="outlined"
              disabled={loading} // Disable team selection while loading
              sx={{
                bgcolor: selectedTeam === TeamEnum.RED ? "#B6080D" : "#333",
                color: "#F6D02F",
                fontWeight: 600,
                fontSize: 20,
                width: "100%",
                border: "4px dashed #B6080D",
                borderRadius: 2,
                "&:hover": {
                  bgcolor:
                    selectedTeam === TeamEnum.BLUE ? "#B6080D" : undefined,
                },
                minWidth: "100px",
              }}
            >
              GÀ ĐỎ
            </Button>
          </Box>
          {errors.team && (
            <Typography sx={{ color: "red", mb: 2, fontSize: 14 }}>
              {errors.team}
            </Typography>
          )}
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{ color: "#d7b500", fontWeight: 600, fontSize: 16, mb: 1 }}
              >
                ĐẶT
              </Typography>
              <Select
                value={lost}
                onChange={handleLostChange}
                fullWidth
                required
                disabled={loading} // Disable select while loading
                sx={{
                  bgcolor: "#333",
                  color: "#d7b500",
                  border: "2px solid #d7b500",
                  borderRadius: "8px",
                  "& .MuiSelect-icon": { color: "#d7b500" },
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                }}
              >
                {exRates.map((opt) => (
                  <MenuItem
                    key={opt}
                    value={opt}
                    sx={{ color: "#d7b500", bgcolor: "#333" }}
                  >
                    {opt}
                  </MenuItem>
                ))}
              </Select>
              {errors.lost && (
                <Typography sx={{ color: "red", mt: 1, fontSize: 14 }}>
                  {errors.lost}
                </Typography>
              )}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{ color: "#d7b500", fontWeight: 600, fontSize: 16, mb: 1 }}
              >
                ĂN
              </Typography>
              <Select
                value={win}
                onChange={handleWinChange}
                fullWidth
                required
                disabled={loading} // Disable select while loading
                sx={{
                  bgcolor: "#333",
                  color: "#d7b500",
                  border: "2px solid #d7b500",
                  borderRadius: "8px",
                  "& .MuiSelect-icon": { color: "#d7b500" },
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                }}
              >
                {exRates.map((opt) => (
                  <MenuItem
                    key={opt}
                    value={opt}
                    sx={{ color: "#d7b500", bgcolor: "#333" }}
                  >
                    {opt}
                  </MenuItem>
                ))}
              </Select>
              {errors.win && (
                <Typography sx={{ color: "red", mt: 1, fontSize: 14 }}>
                  {errors.win}
                </Typography>
              )}
            </Box>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography
              sx={{ color: "#d7b500", fontWeight: 600, fontSize: 16, mb: 1 }}
            >
              SỐ TIỀN ĐẶT
            </Typography>
            <TextField
              type="number"
              value={betAmount}
              onChange={handleBetAmountChange}
              fullWidth
              required
              inputProps={{ min: 100 }}
              disabled={loading} // Disable input while loading
              InputProps={{
                inputProps: {
                  list: "amountSuggestions",
                },
                sx: {
                  bgcolor: "#333",
                  color: "#d7b500",
                  border: "2px solid #d7b500",
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                },
              }}
              sx={{ "& .MuiInputBase-input": { padding: "10px" } }}
            />
            <datalist id="amountSuggestions">
              <option value="100">100K</option>
              <option value="200">200K</option>
              <option value="500">500K</option>
              <option value="1000">1M</option>
              <option value="2000">2M</option>
              <option value="5000">5M</option>
              <option value="10000">10M</option>
            </datalist>
            {errors.betAmount && (
              <Typography sx={{ color: "red", mt: 1, fontSize: 14 }}>
                {errors.betAmount}
              </Typography>
            )}
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography
              sx={{ color: "#d7b500", fontWeight: 600, fontSize: 16, mb: 1 }}
            >
              SỐ TIỀN ĂN
            </Typography>
            <TextField
              type="text"
              value={numberThousandFload(winAmount)}
              fullWidth
              InputProps={{
                sx: {
                  bgcolor: "#333",
                  color: "#d7b500",
                  border: "2px solid #d7b500",
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                },
              }}
              sx={{
                "& .MuiInputBase-input": { padding: "10px" },
                pointerEvents: "none",
              }}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading} // Disable button while loading
            sx={{
              bgcolor: "#d7b500",
              color: "#000",
              fontWeight: 600,
              fontSize: 16,
              borderRadius: "20px",
              "&:hover": { bgcolor: "#FFC107" },
              position: "relative",
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "#000" }} />
            ) : (
              "TẠO"
            )}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default WagerModal;
