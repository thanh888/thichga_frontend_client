import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_BASE_API_URL; // hoặc process.env.NEXT_PUBLIC_SOCKET_URL

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Đảm bảo chỉ gọi ở client
    const accessToken =
      typeof window !== "undefined" ? localStorage.getItem("account") : null;
    if (!accessToken) return;

    const socket = io(SOCKET_URL, {
      transports: ["websocket"],
      extraHeaders: {
        Authorization: accessToken,
      },
      auth: {
        token: accessToken,
      },
    });

    socket.on("connect", () => {
      console.log("✅ Connected to WebSocket");
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from WebSocket");
    });

    socket.on("error", (err) => {
      console.log("Socket error:", err);
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, []);

  return socketRef.current;
};
