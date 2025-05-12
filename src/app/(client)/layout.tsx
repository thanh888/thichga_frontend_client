"use client";
import FooterComponent from "@/components/footer/footer";
import HeaderComponent from "@/components/header/header";
import { useUser } from "@/hooks/use-user";
import { useSocket } from "@/socket";
import { DepositStatusEnum } from "@/utils/enum/deposit-status.enum";
import { ConvertMoneyVND } from "@/utils/function-convert.util";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useUser();
  const { checkSession } = useUser();
  const socket = useSocket();

  const statusLabels: { [key in DepositStatusEnum]: string } = {
    [DepositStatusEnum.PENDING]: "Chờ xử lý",
    [DepositStatusEnum.SUCCESS]: "thành công",
    [DepositStatusEnum.REJECT]: "bị từ chối",
  };

  const [isClosed, setIsClosed] = useState<any>(null);

  const handleCloseDialog = () => {
    setIsClosed(false);
  };

  useEffect(() => {
    if (user && socket) {
      socket.on("deposit-money", (msg) => {
        if (msg?.data?.userID === user._id && checkSession) {
          checkSession();
          setIsClosed(msg.data);
        }
      });

      return () => {
        socket.off("deposit-money");
      };
    }
  }, [user, socket]);

  return (
    <>
      <HeaderComponent />
      <main style={{ marginTop: "60px" }}>{children}</main>
      <Dialog
        open={isClosed}
        onClose={handleCloseDialog}
        maxWidth="xs"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "12px",
            backgroundColor: "#1E2A44",
            color: "#FFFFFF",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "#FFD700",
            pt: 3,
          }}
        >
          Thông báo yêu cầu nạp tiền
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", px: 4, py: 2 }}>
          <Typography sx={{ color: "#E0E0E0", fontSize: "1rem" }}>
            Yêu cầu nạp {ConvertMoneyVND(isClosed?.money ?? 0)} của bạn đã{" "}
            {statusLabels[isClosed?.status as DepositStatusEnum]}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <Button
            onClick={() => {
              handleCloseDialog();
            }}
            variant="contained"
            sx={{
              backgroundColor: "#3B82F6",
              color: "#FFFFFF",
              textTransform: "none",
              fontWeight: 500,
              borderRadius: "8px",
              px: 4,
              "&:hover": {
                backgroundColor: "#2563EB",
              },
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <FooterComponent />
    </>
  );
}
