"use client";
import FooterComponent from "@/components/footer/footer";
import HeaderComponent from "@/components/header/header";
import NotificationRealtime from "@/lib/dialogs/notification-realtime";
import { UserContext, UserProvider } from "@/contexts/user-context";
import { useSocket } from "@/socket";
import { DepositStatusEnum } from "@/utils/enum/deposit-status.enum";
import {
  ConvertMoneyVND,
  numberThousandFload,
} from "@/utils/function-convert.util";
import { useContext, useEffect, useState } from "react";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const checkSession = userContext?.checkSession;
  const socket = useSocket();

  const statusLabels: { [key in DepositStatusEnum]: string } = {
    [DepositStatusEnum.PENDING]: "Chờ xử lý",
    [DepositStatusEnum.SUCCESS]: "thành công",
    [DepositStatusEnum.REJECT]: "bị từ chối",
  };

  const [notification, setNotification] = useState<any>(null);

  useEffect(() => {
    if (!user || !socket) return; // Tránh lỗi khi user hoặc socket chưa sẵn sàng

    socket.on("deposit-money", (msg) => {
      if (msg?.data?.userID === user._id && checkSession) {
        checkSession();
        const title = "Thông báo nạp tiền";
        const content = `Yêu cầu nạp ${numberThousandFload(
          msg?.data?.money ?? 0
        )} của bạn đã ${statusLabels[msg?.data?.status as DepositStatusEnum]}`;
        setNotification({ title, content });
      }
    });

    socket.on("withdraw-money", (msg) => {
      if (msg?.data?.userID === user._id && checkSession) {
        const title = "Thông báo rút tiền";
        const content = `Yêu cầu rút ${numberThousandFload(
          msg?.data?.money ?? 0
        )} của bạn đã ${statusLabels[msg?.data?.status as DepositStatusEnum]}`;
        setNotification({ title, content });
      }
    });

    return () => {
      socket.off("deposit-money");
      socket.off("withdraw-money");
    };
  }, [user, socket, checkSession]);

  return (
    <UserProvider>
      <HeaderComponent />
      <main style={{ marginTop: "48px" }}>{children}</main>
      <NotificationRealtime
        notification={notification}
        setNotification={setNotification}
      />
      <FooterComponent />
    </UserProvider>
  );
}
