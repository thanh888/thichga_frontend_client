"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { NumericFormat } from "react-number-format";

export default function WithdrawComponent() {
  const [money, setMoney] = useState<string>("");
  const [pin, setPin] = useState<string>("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMoney(e.target.value);
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        p: { xs: 1, sm: 2 },
        borderRadius: "8px",
        boxShadow: {
          xs: "0 1px 5px rgba(0,0,0,0.1)",
          sm: "0 2px 10px rgba(0,0,0,0.1)",
        },
      }}
    >
      <Typography
        variant="h5"
        mb={{ xs: 1, sm: 2 }}
        fontWeight={500}
        fontSize={{ xs: "1.25rem", sm: "1.5rem" }}
      >
        Rút tiền
      </Typography>

      <Box
        textAlign="center"
        borderBottom="1px solid #a19d9d"
        mb={{ xs: 1, sm: 2 }}
        pb={{ xs: 1, sm: 2 }}
      >
        <Typography
          variant="body1"
          mb={1}
          fontSize={{ xs: "0.875rem", sm: "1rem" }}
        >
          Nhập số tiền
        </Typography>
        <NumericFormat
          placeholder="1.000 vnđ"
          onChange={changeInput}
          customInput={TextField}
          thousandSeparator
          valueIsNumericString
          variant="standard"
          fullWidth
          value={money}
          name="money"
          InputProps={{
            disableUnderline: true,
            sx: {
              textAlign: "center",
              fontSize: { xs: "0.875rem", sm: "1rem" },
              "&:focus": {
                outline: "none",
              },
            },
          }}
          sx={{
            fontWeight: 600,
            mb: { xs: 1, sm: 2 },
            "& .MuiInputBase-root": {
              border: "none",
            },
            "& .MuiInputBase-input": {
              textAlign: "center",
              "&:focus": {
                outline: "none",
              },
            },
          }}
        />
        <Typography
          variant="body1"
          mb={1}
          sx={{
            color: "blue",
            fontWeight: 600,
            fontSize: { xs: "0.875rem", sm: "1rem" },
          }}
        >
          = {Number(money) === 0 ? 0 : money + ",000"} VND
        </Typography>
        <Box
          display="flex"
          flexWrap="wrap"
          gap={{ xs: 0.5, sm: 1 }}
          mb={{ xs: 1, sm: 2 }}
          justifyContent="center"
        >
          {["200", "500", "1,000", "5,000", "10,000"].map((amount) => (
            <Button
              key={amount}
              variant="outlined"
              onClick={() => setMoney(amount)}
              sx={{
                fontSize: { xs: "0.7rem", sm: "0.875rem" },
                px: { xs: 1, sm: 2 },
                py: { xs: 0.5, sm: 1 },
                minWidth: { xs: "60px", sm: "80px" },
              }}
            >
              {amount}
            </Button>
          ))}
        </Box>
      </Box>
      <Box textAlign="center">
        <Typography
          variant="body1"
          mb={1}
          fontSize={{ xs: "0.875rem", sm: "1rem" }}
        >
          Nhập mã pin
        </Typography>
        <TextField
          variant="standard"
          placeholder="******"
          type="password"
          InputProps={{
            disableUnderline: true,
            sx: {
              "& input": {
                textAlign: "center",
                fontSize: { xs: "18px", sm: "24px" },
              },
            },
          }}
          InputLabelProps={{
            shrink: true,
          }}
          name="pin"
          onChange={(e) => setPin(e.target.value)}
          value={pin}
          sx={{ mb: { xs: 1, sm: 2 } }}
        />
      </Box>

      <Button
        variant="contained"
        sx={{
          width: "100%",
          fontSize: { xs: "0.75rem", sm: "0.875rem" },
          py: { xs: 0.75, sm: 1 },
        }}
      >
        Xác nhận
      </Button>
    </Box>
  );
}
