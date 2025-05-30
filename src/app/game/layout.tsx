"use client";

import { useContext, useEffect } from "react";
import { UserContext } from "@/contexts/user-context";
import { useRouter } from "next/navigation";

import { ReactNode } from "react";

interface GameLayoutProps {
  children: ReactNode;
}

export default function GameLayout({ children }: GameLayoutProps) {
  const user = useContext(UserContext)?.user;
  const checkSession = useContext(UserContext)?.checkSession;
  const router = useRouter();

  useEffect(() => {
    if (!user && checkSession) {
      checkSession(); // Gọi để re-check session từ cookie hoặc localStorage
    }
  }, []);

  useEffect(() => {
    if (user === null) {
      router.replace("/login");
    }
  }, [user]);

  return <>{children}</>;
}
