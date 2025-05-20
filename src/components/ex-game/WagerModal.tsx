import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";

interface WagerModalProps {
  open: boolean;
  onClose: () => void;
  gameId: string;
}

const WagerModal: React.FC<WagerModalProps> = ({ open, onClose, gameId }) => {
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [lost, setLost] = useState("10");
  const [win, setWin] = useState("10");
  const [betAmount, setBetAmount] = useState("");
  const [winAmount, setWinAmount] = useState(0);

  const rateOptions = [
    "0.3",
    "0.5",
    "0.7",
    "1",
    "1.5",
    "2",
    "2.5",
    "3",
    "3.5",
    "4",
    "4.5",
    "5",
    "5.5",
    "6",
    "6.5",
    "7",
    "7.5",
    "8",
    "8.5",
    "9",
    "9.5",
    "10",
  ];

  useEffect(() => {
    const calculatedWinAmount =
      (parseFloat(betAmount) / parseFloat(lost)) * parseFloat(win);
    setWinAmount(isNaN(calculatedWinAmount) ? 0 : calculatedWinAmount);
  }, [betAmount, lost, win, selectedTeam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("selectedTeam", selectedTeam);
    formData.append("lost", lost);
    formData.append("win", win);
    formData.append("betAmount", betAmount);
  };

  const handleTeamSelect = (team: string) => {
    setSelectedTeam(team === selectedTeam ? "" : team);
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
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography
            variant="h6"
            sx={{ color: "#FFFFFF", fontWeight: 600, fontSize: 16 }}
          >
            TẠO KÈO
          </Typography>
          <Button
            onClick={onClose}
            sx={{
              color: "#FFFFFF",
              fontWeight: 600,
              fontSize: 16,
              minWidth: "auto",
              p: 0,
            }}
          >
            ×
          </Button>
        </Box>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{ display: "flex", gap: 2, mb: 2, justifyContent: "center" }}
          >
            <Button
              onClick={() => handleTeamSelect("A")}
              variant="contained"
              sx={{
                bgcolor: selectedTeam === "A" ? "#d7b500" : "#333",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: 14,
                borderRadius: "20px",
                "&:hover": {
                  bgcolor: selectedTeam === "A" ? "#FFC107" : "#444",
                },
                minWidth: "100px",
              }}
            >
              GÀ XANH
            </Button>
            <Button
              onClick={() => handleTeamSelect("B")}
              variant="contained"
              sx={{
                bgcolor: selectedTeam === "B" ? "#d7b500" : "#333",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: 14,
                borderRadius: "20px",
                "&:hover": {
                  bgcolor: selectedTeam === "B" ? "#FFC107" : "#444",
                },
                minWidth: "100px",
              }}
            >
              GÀ ĐỎ
            </Button>
          </Box>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{ color: "#FFFFFF", fontWeight: 600, fontSize: 14, mb: 1 }}
              >
                ĐẶT
              </Typography>
              <Select
                value={lost}
                onChange={(e) => setLost(e.target.value)}
                fullWidth
                required
                sx={{
                  bgcolor: "#333",
                  color: "#FFFFFF",
                  border: "2px solid white",
                  borderRadius: "8px",
                  "& .MuiSelect-icon": { color: "#FFFFFF" },
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                }}
              >
                {rateOptions.map((opt) => (
                  <MenuItem
                    key={opt}
                    value={opt}
                    sx={{ color: "#FFFFFF", bgcolor: "#333" }}
                  >
                    {opt}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{ color: "#FFFFFF", fontWeight: 600, fontSize: 14, mb: 1 }}
              >
                ĂN
              </Typography>
              <Select
                value={win}
                onChange={(e) => setWin(e.target.value)}
                fullWidth
                required
                sx={{
                  bgcolor: "#333",
                  color: "#FFFFFF",
                  border: "2px solid white",
                  borderRadius: "8px",
                  "& .MuiSelect-icon": { color: "#FFFFFF" },
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                }}
              >
                {rateOptions.map((opt) => (
                  <MenuItem
                    key={opt}
                    value={opt}
                    sx={{ color: "#FFFFFF", bgcolor: "#333" }}
                  >
                    {opt}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography
              sx={{ color: "#FFFFFF", fontWeight: 600, fontSize: 14, mb: 1 }}
            >
              SỐ TIỀN ĐẶT
            </Typography>
            <TextField
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              fullWidth
              required
              inputProps={{ min: 100000 }}
              InputProps={{
                inputProps: {
                  list: "amountSuggestions",
                },
                sx: {
                  bgcolor: "#333",
                  color: "#FFFFFF",
                  border: "2px solid white",
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                },
              }}
              sx={{ "& .MuiInputBase-input": { padding: "10px" } }}
            />
            <datalist id="amountSuggestions">
              <option value="100000">100K</option>
              <option value="200000">200K</option>
              <option value="500000">500K</option>
              <option value="1000000">1M</option>
              <option value="2000000">2M</option>
              <option value="5000000">5M</option>
              <option value="10000000">10M</option>
            </datalist>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography
              sx={{ color: "#FFFFFF", fontWeight: 600, fontSize: 14, mb: 1 }}
            >
              SỐ TIỀN ĂN
            </Typography>
            <TextField
              type="number"
              value={winAmount}
              disabled
              fullWidth
              required
              InputProps={{
                sx: {
                  bgcolor: "#333",
                  color: "#FFFFFF",
                  border: "2px solid white",
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                },
              }}
              sx={{ "& .MuiInputBase-input": { padding: "10px" } }}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "#d7b500",
              color: "#000",
              fontWeight: 600,
              fontSize: 14,
              borderRadius: "20px",
              "&:hover": { bgcolor: "#FFC107" },
            }}
          >
            TẠO
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default WagerModal;
