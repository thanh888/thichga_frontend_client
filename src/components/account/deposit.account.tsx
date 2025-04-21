"use client";
import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { NumericFormat } from "react-number-format";

export default function DepositComponent() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const [money, setMoney] = useState<string>("0");

  const handleSelectIndex = (index: number) => {
    setSelectedIndex(index);
  };

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value.split(",").join(""));

    setMoney(e.target.value);
  };
  return (
    <Box
      sx={{ backgroundColor: "white", p: 2, borderRadius: "8px", boxShadow: 1 }}
    >
      <Typography variant="h5" mb={2} fontWeight={500}>
        Chọn phương thức
      </Typography>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button
          variant={selectedIndex === 0 ? "contained" : "text"}
          sx={{ width: "100%", flexDirection: "column" }}
          onClick={() => handleSelectIndex(0)}
        >
          <img
            alt="bank_image"
            src="/images/bank_icon.png"
            width={50}
            height={50}
          />{" "}
          Ngân hàng
        </Button>
        <Button
          variant={selectedIndex === 1 ? "contained" : "text"}
          sx={{ width: "100%", flexDirection: "column" }}
          onClick={() => handleSelectIndex(1)}
        >
          <img
            alt="bank_image"
            src="/images/MoMo_icon.png"
            width={50}
            height={50}
          />{" "}
          Momo
        </Button>
      </Box>
      <Box textAlign={"center"}>
        <Typography variant="body1" mb={1}>
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
            disableUnderline: true, // Loại bỏ underline (outline)
            sx: {
              textAlign: "center", // Căn giữa văn bản
              "&:focus": {
                outline: "none", // Loại bỏ outline khi focus
              },
            },
          }}
          sx={{
            mb: 2,
            "& .MuiInputBase-root": {
              border: "none", // Loại bỏ border
            },
            "& .MuiInputBase-input": {
              textAlign: "center", // Căn giữa văn bản
              "&:focus": {
                outline: "none", // Loại bỏ outline khi focus
              },
            },
          }}
        />
        <Typography variant="body1" mb={1} color="blue" fontWeight={600}>
          = {money},000 VND
        </Typography>
        <Button variant="contained" sx={{ width: "100%" }}>
          {" "}
          Xác nhận
        </Button>
      </Box>
    </Box>
  );
}
