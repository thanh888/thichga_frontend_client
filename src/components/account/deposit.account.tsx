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

export default function DepositComponent() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [money, setMoney] = useState<string>("0");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSelectIndex = (index: number) => {
    setSelectedIndex(index);
  };

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.split(",").join("");
    setMoney(numericValue);
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
        Chọn phương thức
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        mb={{ xs: 1, sm: 2 }}
        gap={{ xs: 1, sm: 2 }}
      >
        <Button
          variant={selectedIndex === 0 ? "contained" : "text"}
          sx={{
            width: "100%",
            flexDirection: "column",
            fontSize: { xs: "0.7rem", sm: "0.875rem" },
            py: { xs: 0.5, sm: 1 },
            minHeight: { xs: "60px", sm: "80px" },
          }}
          onClick={() => handleSelectIndex(0)}
        >
          <img
            alt="bank_image"
            src="/images/bank_icon.png"
            width={isMobile ? 40 : 50}
            height={isMobile ? 40 : 50}
          />
          Ngân hàng
        </Button>
        <Button
          variant={selectedIndex === 1 ? "contained" : "text"}
          sx={{
            width: "100%",
            flexDirection: "column",
            fontSize: { xs: "0.7rem", sm: "0.875rem" },
            py: { xs: 0.5, sm: 1 },
            minHeight: { xs: "60px", sm: "80px" },
          }}
          onClick={() => handleSelectIndex(1)}
        >
          <img
            alt="bank_image"
            src="/images/MoMo_icon.png"
            width={isMobile ? 40 : 50}
            height={isMobile ? 40 : 50}
          />
          Momo
        </Button>
      </Box>
      <Box textAlign="center">
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
          color="blue"
          fontWeight={600}
          fontSize={{ xs: "0.875rem", sm: "1rem" }}
        >
          = {money},000 VND
        </Typography>
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
    </Box>
  );
}
