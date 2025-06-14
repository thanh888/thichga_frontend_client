"use client";
import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Grid,
  Tooltip,
  IconButton,
} from "@mui/material";
import { numberThousand, sampleMoneys } from "@/utils/function-convert.util";
import { createDepositApi } from "@/services/deposit.api";
import { DepositMethod } from "@/utils/enum/deposit-method.enum";
import { toast } from "react-toastify";
import { UserContext } from "@/contexts/user-context";
import { SettingContext } from "@/contexts/setting-context";
import { ContentCopyOutlined } from "@mui/icons-material";
import { useSocket } from "@/socket";
import { DepositStatusEnum } from "@/utils/enum/deposit-status.enum";
import { DepositModeEnum } from "@/utils/enum/deposit-mode.enum";

export default function DepositManualComponent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const userContext = useContext(UserContext);
  const user = userContext?.user;

  const settingContext = useContext(SettingContext);
  const setting = settingContext?.setting;

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [money, setMoney] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const socket = useSocket();

  const handleSelectIndex = (index: number) => {
    setSelectedIndex(index);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, ""); // Remove commas for processing
    if (value === "" || /^\d+$/.test(value)) {
      setMoney(value);
      setError("");
    }
  };

  const validateForm = () => {
    let isValid = true;
    let errorMessage = "";

    if (!money) {
      errorMessage = "Vui lòng nhập số tiền";
      isValid = false;
    } else if (!/^\d+$/.test(money)) {
      errorMessage = "Số tiền chỉ được chứa số";
      isValid = false;
    } else {
      const numericValue = parseInt(money, 10);
      if (numericValue <= 0) {
        errorMessage = "Số tiền phải lớn hơn 0";
        isValid = false;
      } else if (numericValue < 20) {
        errorMessage = "Số tiền tối thiểu là 20.000VND";
        isValid = false;
      } else if (numericValue > 200000) {
        errorMessage = "Số tiền tối đa là 200.000.000VND";
        isValid = false;
      }
    }

    setError(errorMessage);
    return isValid;
  };
  const handleQuickAmount = (amount: string) => {
    setMoney(amount);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      if (!user?._id) {
        toast.warning("Không tìm thấy thông tin người dùng");
        setIsSubmitting(false);
        return;
      }
      if (!user.bank?.accountNumber) {
        toast.warning("Hãy thêm thông tin ngân hàng");
        setIsSubmitting(false);
        return;
      }

      const method =
        selectedIndex === 0 ? DepositMethod.BANK : DepositMethod.MOMO;
      const response = (await createDepositApi({
        userID: user._id.toString(),
        money: parseFloat(money),
        method,
        status: DepositStatusEnum.PENDING,
        bank: user.bank,
        mode: DepositModeEnum.MANUAL,
      })) as any;

      if (response.status === 200 || response.status === 201) {
        toast.success("Yêu cầu thành công, vui lòng đợi xác nhận");
        setMoney("");
        setError("");
        if (socket) {
          socket.emit("request-deposit", {
            status: DepositStatusEnum.PENDING,
            userID: user._id.toString(),
            money: money,
          });

          socket.off("request-deposit");
        }
      }
    } catch (error: any) {
      console.log("Error depositing money:", error);
      toast.warning("Yêu cầu thất bạn, vui lòng thử lại sau");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
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
              alt="Ngân hàng"
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
              alt="Momo"
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
          <TextField
            placeholder="0"
            name="money"
            value={money}
            onChange={handleInputChange}
            fullWidth
            variant="standard"
            error={!!error}
            helperText={error}
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
              mb: { xs: 1, sm: 2 },
              "& .MuiInputBase-root": {
                border: "none",
              },
            }}
            aria-label="Số tiền nạp"
          />
          <Typography
            variant="body1"
            mb={1}
            color="blue"
            fontWeight={600}
            fontSize={{ xs: "0.875rem", sm: "1rem" }}
          >
            = {money ? numberThousand(String(Number(money) * 1000)) : "0"} VND
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
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: "white",
          alignItems: "center",
          display: "flex",
          flexDirection: { xs: "column", lg: "row-reverse" },
          p: { xs: 1, sm: 2 },
          mt: 2,
          mb: 4,
          borderRadius: "8px",
          boxShadow: {
            xs: "0 1px 5px rgba(0,0,0,0.1)",
            sm: "0 2px 10px rgba(0,0,0,0.1)",
          },
        }}
      >
        <Box
          width={"100%"}
          textAlign="left"
          sx={{
            p: { xs: 0.5, sm: 1 },
            display: "flex",
            flexDirection: "column",
            gap: { xs: 1, sm: 2 },
          }}
        >
          <Typography
            variant="h5"
            fontWeight={500}
            fontSize={{ xs: "1rem", sm: "1.2rem" }}
          >
            Thông tin ngân hàng hệ thống
          </Typography>

          <Typography
            variant="body2"
            sx={{
              width: "100%",
              justifyContent: "space-between",
              display: "flex",
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            }}
          >
            Tên ngân hàng:
            <Typography variant="caption">
              {setting?.bank?.bankName ?? "Chưa cập nhật"}
            </Typography>
          </Typography>
          <Typography
            variant="body2"
            sx={{
              width: "100%",
              justifyContent: "space-between",
              display: "flex",
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            }}
          >
            Tên tài khoản:
            <Typography variant="caption">
              {setting?.bank?.accountName ?? "Chưa cập nhật"}
            </Typography>
          </Typography>
          <Typography
            variant="body2"
            sx={{
              width: "100%",
              justifyContent: "space-between",
              display: "flex",
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            }}
          >
            Số tài khoản:
            <Typography variant="caption">
              {setting?.bank?.accountNumber && (
                <Tooltip title="Sao chép">
                  <IconButton
                    size="small"
                    onClick={() =>
                      window.navigator.clipboard.writeText(
                        setting?.bank?.accountNumber?.toString() ?? ""
                      )
                    }
                    sx={{ ml: 1, p: 0.5 }}
                  >
                    <ContentCopyOutlined sx={{ width: 14, height: 14 }} />
                  </IconButton>
                </Tooltip>
              )}
              {setting?.bank?.accountNumber ?? "Chưa cập nhật"}
            </Typography>
          </Typography>
          <Typography
            variant="body2"
            sx={{
              width: "100%",
              justifyContent: "space-between",
              display: "flex",
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            }}
          >
            Chi nhánh:
            <Typography variant="caption">
              {setting?.bank?.branch ?? "Chưa cập nhật"}
            </Typography>
          </Typography>
          <Typography
            variant="body2"
            sx={{
              width: "100%",
              justifyContent: "space-between",
              display: "flex",
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            }}
          >
            Nội dung chuyển khoản:
            <Typography variant="caption">
              {setting?.bank?.transferContent ?? "Chưa cập nhật"}
            </Typography>
          </Typography>
        </Box>
        {setting?.bank?.imageQR && (
          <img
            alt="qr-bank-system"
            src={
              process.env.NEXT_PUBLIC_BASE_API_URL +
              "/" +
              setting?.bank?.imageQR
            }
            height={150}
            width={150}
            style={{
              objectFit: "contain",
            }}
          />
        )}
      </Box>
    </>
  );
}
