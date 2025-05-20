import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";

interface PlaceBetModalProps {
  open: boolean;
  onClose: () => void;
  action: string;
}

const PlaceBetModal: React.FC<PlaceBetModalProps> = ({
  open,
  onClose,
  action,
}) => {
  const [betTarget, setBetTarget] = useState<"A" | "B">("A");
  const [betRate, setBetRate] = useState("10");
  const [winRate, setWinRate] = useState("10");
  const [amount, setAmount] = useState("");
  const [winAmount, setWinAmount] = useState(0);
  const [cuaThua, setCuaThua] = useState("---");
  const [tienThieu, setTienThieu] = useState(0);
  const [totalXanh, setTotalXanh] = useState(0);
  const [totalDo, setTotalDo] = useState(0);

  const formatter = new Intl.NumberFormat("vi-VN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  });
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
      (parseFloat(amount) / parseFloat(betRate)) * parseFloat(winRate);
    setWinAmount(isNaN(calculatedWinAmount) ? 0 : calculatedWinAmount);
  }, [amount, betRate, winRate, betTarget]);

  const handlePercentClick = (percent: number) => {
    const newAmount = Math.floor((tienThieu / 100) * percent);
    setAmount(newAmount.toString());
    setWinAmount((newAmount / parseFloat(betRate)) * parseFloat(winRate));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("betTarget", betTarget);
    formData.append("betRate", betRate);
    formData.append("winRate", winRate);
    formData.append("amount", amount);

    // try {
    //   const response = await fetch(action, { method: "POST", body: formData });
    //   const result = await response.json();
    //   Swal.fire({
    //     text: result.message,
    //     icon: result.code === 200 || result.code === 201 ? "success" : "error",
    //   }).then(() => {
    //     if (result.code === 200 || result.code === 201) {
    //       location.reload();
    //     }
    //   });
    // } catch (error) {
    //   Swal.fire({ text: "Error placing bet", icon: "error" });
    // }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          bgcolor: "white",
          p: 3,
          borderRadius: 2,
          width: "90%",
          maxWidth: 400,
          animation: open ? "modalOpening 0.2s" : "modalClosing 0.2s",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6">ĐẶT CƯỢC</Typography>
          <Button onClick={onClose}>×</Button>
        </Box>
        <form onSubmit={handleSubmit}>
          <Typography sx={{ mb: 2 }}>{cuaThua}</Typography>
          <RadioGroup
            row
            value={betTarget}
            onChange={(e) => setBetTarget(e.target.value as "A" | "B")}
            sx={{ mb: 2 }}
          >
            <FormControlLabel
              value="A"
              control={<Radio />}
              label={
                <Box>
                  <span>GÀ XANH</span>
                  <span>({formatter.format(totalXanh)})</span>
                </Box>
              }
            />
            <FormControlLabel
              value="B"
              control={<Radio />}
              label={
                <Box>
                  <span>GÀ ĐỎ</span>
                  <span>({formatter.format(totalDo)})</span>
                </Box>
              }
            />
          </RadioGroup>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography>ĐẶT</Typography>
              <Select value={betRate} disabled fullWidth required>
                {rateOptions.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            mosa
            <Box sx={{ flex: 1 }}>
              <Typography>ĂN</Typography>
              <Select value={winRate} disabled fullWidth required>
                {rateOptions.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
          {tienThieu > 0 && (
            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              {[25, 50, 75, 100].map((percent) => (
                <Button
                  key={percent}
                  variant="outlined"
                  onClick={() => handlePercentClick(percent)}
                >
                  {percent}%
                </Button>
              ))}
            </Box>
          )}
          <Box sx={{ mb: 2 }}>
            <Typography>SỐ TIỀN ĐẶT</Typography>
            <TextField
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              required
              inputProps={{ min: 100000 }}
              InputProps={{
                inputProps: {
                  list: "amountSuggestions123",
                },
              }}
            />
            <datalist id="amountSuggestions123">
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
            <Typography>SỐ TIỀN ĂN</Typography>
            <TextField
              type="number"
              value={winAmount}
              disabled
              fullWidth
              required
            />
          </Box>
          <Button type="submit" variant="contained" fullWidth>
            ĐẶT CƯỢC
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default PlaceBetModal;
