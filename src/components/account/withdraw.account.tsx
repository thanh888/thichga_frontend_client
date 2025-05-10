"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { useUser } from "@/hooks/use-user";
import { createWithdrawApi } from "@/services/withdraw.api";
import { toast } from "react-toastify";
import { numberThousand, sampleMoneys } from "@/utils/function-convert.util";

export default function WithdrawComponent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { user } = useUser();
  const { checkSession } = useUser();
  const [money, setMoney] = useState<string>("");
  const [pin, setPin] = useState<string>("");
  const [errors, setErrors] = useState<{
    money: string;
    pin: string;
  }>({ money: "", pin: "" });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, ""); // Remove commas for processing
    if (value === "" || /^\d+$/.test(value)) {
      setMoney(value);
      setErrors((prev) => ({ ...prev, money: "" }));
    }
  };

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPin(value);
    setErrors((prev) => ({ ...prev, pin: "" }));
  };

  const handleQuickAmount = (amount: string) => {
    setMoney(amount.replace(/,/g, ""));
    setErrors((prev) => ({ ...prev, money: "" }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { money: "", pin: "" };

    // Money validation
    if (!money) {
      newErrors.money = "Vui lòng nhập số tiền";
      isValid = false;
    } else if (!/^\d+$/.test(money)) {
      newErrors.money = "Số tiền chỉ được chứa số";
      isValid = false;
    } else {
      const numericValue = parseInt(money, 10);
      if (numericValue <= 0) {
        newErrors.money = "Số tiền phải lớn hơn 0";
        isValid = false;
      } else if (numericValue < 100000) {
        newErrors.money = "Số tiền tối thiểu là 100.000 VND";
        isValid = false;
      }
    }

    // PIN validation
    if (!pin) {
      newErrors.pin = "Vui lòng nhập mã PIN";
      isValid = false;
    } else if (!/^\d{4,6}$/.test(pin)) {
      newErrors.pin = "Mã PIN phải là số từ 4 đến 6 chữ số";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      if (!user._id) {
        alert("Không tìm thấy thông tin người dùng");
        setIsSubmitting(false);
        return;
      }

      const response = (await createWithdrawApi({
        userID: user._id.toString(),
        money: parseInt(money, 10),
        pin,
        bank: user.bank,
      })) as any;

      if (response.status === 200 || response.status === 201) {
        toast.success("Yêu cầu rút tiền thành công, vui lòng đợi xác nhận");
        setMoney("");
        setPin("");
        setErrors({ money: "", pin: "" });
        if (checkSession) {
          checkSession();
        }
      }
    } catch (error: any) {
      console.error("Error withdrawing money:", error);
      console.log(error?.response?.data?.message);

      if (error?.response?.data?.message === "Pin is incorrect") {
        toast.warning("Mã pin không chính xác");
      } else toast.warning("Yêu cầu thất bạn, vui lòng thử lại sau");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
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
        <TextField
          placeholder="1.000 VND"
          name="money"
          value={money}
          onChange={handleMoneyChange}
          fullWidth
          variant="standard"
          error={!!errors.money}
          helperText={errors.money}
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
            style: { textAlign: "center" },
          }}
          InputProps={{
            disableUnderline: true,
            sx: {
              textAlign: "center",
              fontSize: { xs: "0.875rem", sm: "1rem" },
            },
          }}
          sx={{
            fontWeight: 600,
            mb: { xs: 1, sm: 2 },
            "& .MuiInputBase-root": {
              border: "none",
            },
          }}
          aria-label="Số tiền rút"
        />
        <Typography
          variant="body1"
          mb={1}
          color="blue"
          fontWeight={600}
          fontSize={{ xs: "0.875rem", sm: "1rem" }}
        >
          = {money ? numberThousand(money) : "0"} VND
        </Typography>
        <Box
          display="flex"
          flexWrap="wrap"
          gap={{ xs: 0.5, sm: 1 }}
          mb={{ xs: 1, sm: 2 }}
          justifyContent="center"
        >
          {sampleMoneys.map((item, index) => (
            <Button
              key={+index}
              variant="outlined"
              onClick={() => handleQuickAmount(item.value)}
              sx={{
                fontSize: { xs: "0.7rem", sm: "0.875rem" },
                px: { xs: 1, sm: 2 },
                py: { xs: 0.5, sm: 1 },
                minWidth: { xs: "60px", sm: "80px" },
              }}
            >
              {item.lable}
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
          Nhập mã PIN
        </Typography>
        <TextField
          variant="standard"
          placeholder="******"
          type="password"
          name="pin"
          value={pin}
          onChange={handlePinChange}
          error={!!errors.pin}
          helperText={errors.pin}
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
            style: {
              textAlign: "center",
              fontSize: isMobile ? "18px" : "24px",
            },
          }}
          InputProps={{
            disableUnderline: true,
            sx: { textAlign: "center" },
          }}
          sx={{ mb: { xs: 1, sm: 2 } }}
          aria-label="Mã PIN"
        />
      </Box>
      <Button
        variant="contained"
        type="submit"
        disabled={isSubmitting}
        sx={{
          width: "100%",
          fontSize: { xs: "0.75rem", sm: "0.875rem" },
          py: { xs: 0.75, sm: 1 },
        }}
      >
        {isSubmitting ? (
          <CircularProgress size={20} color="inherit" />
        ) : (
          "Xác nhận"
        )}
      </Button>
    </Box>
  );
}
