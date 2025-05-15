"use client";
import FooterComponent from "@/components/footer/footer";
import HeaderComponent from "@/components/header/header";
import NotificationRealtime from "@/components/lib/dialogs/notification-realtime";
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

  const [notification, setNotification] = useState<any>(null);

  useEffect(() => {
    if (user && socket) {
      socket.on("deposit-money", (msg) => {
        console.log(msg);

        if (msg?.data?.userID === user._id && checkSession) {
          checkSession();
          const title = "Thông báo nạp tiền";
          const content = `Yêu cầu nạp ${ConvertMoneyVND(
            msg?.data?.money ?? 0
          )} của bạn đã 
            ${statusLabels[msg?.data?.status as DepositStatusEnum]}`;
          setNotification({ title, content });
        }
      });
      socket.on("withdraw-money", (msg) => {
        if (msg?.data?.userID === user._id && checkSession) {
          const title = "Thông báo rút tiền";
          const content = `Yêu cầu rút ${ConvertMoneyVND(
            msg?.data?.money ?? 0
          )} của bạn đã ${
            statusLabels[msg?.data?.status as DepositStatusEnum]
          }`;
          setNotification({ title, content });
        }
      });

      return () => {
        socket.off("deposit-money");
        socket.off("withdraw-money");
      };
    }
  }, [user, socket]);

  return (
    <>
      <HeaderComponent />
      <main style={{ marginTop: "60px" }}>{children}</main>
      <NotificationRealtime
        notification={notification}
        setNotification={setNotification}
      />
      <FooterComponent />
    </>
  );
}
