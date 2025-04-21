"use client";
import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { NumericFormat } from "react-number-format";

export default function WithdrawComponent() {
  const [money, setMoney] = useState<string>("");
  const [pin, setPin] = useState<string>("");

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMoney(e.target.value);
  };
  return (
    <Box
      sx={{ backgroundColor: "white", p: 2, borderRadius: "8px", boxShadow: 1 }}
    >
      <Typography variant="h5" mb={2} fontWeight={500}>
        Rút tiền
      </Typography>

      <Box textAlign={"center"} borderBottom={"1px solid #a19d9d"} mb={2}>
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
          value={money}
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
            fontWeight: 600,
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
        <Typography
          variant="body1"
          mb={1}
          sx={{ color: "blue", fontWeight: 600 }}
        >
          = {Number(money) === 0 ? 0 : money + ",000"} VND
        </Typography>
        <Box
          flexDirection={"row"}
          gap={2}
          mb={2}
          justifyContent={"center"}
          sx={{ display: "flex", gap: 1 }}
        >
          <Button variant="outlined" onClick={() => setMoney("200")}>
            200
          </Button>
          <Button variant="outlined" onClick={() => setMoney("500")}>
            500
          </Button>
          <Button variant="outlined" onClick={() => setMoney("1,000")}>
            1,000
          </Button>
          <Button variant="outlined" onClick={() => setMoney("5,000")}>
            5,000
          </Button>
          <Button variant="outlined" onClick={() => setMoney("10,000")}>
            10,000
          </Button>
        </Box>
      </Box>
      <Box textAlign="center">
        <Typography variant="body1" mb={1}>
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
                textAlign: "center", // Căn giữa văn bản trong input
                fontSize: "24px", // Tăng kích thước font
              },
            },
          }}
          InputLabelProps={{
            shrink: true,
          }}
          name="pin"
          onChange={(e) => setPin(e.target.value)}
          value={pin}
        />
      </Box>

      <Button variant="contained" sx={{ width: "100%" }}>
        {" "}
        Xác nhận
      </Button>
    </Box>
  );
}
