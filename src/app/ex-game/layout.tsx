"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user"; // Hook này bạn có thể dùng Firebase Auth hoặc JWT

export default function ClientLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading, error } = useUser();

  const [isChecking, setIsChecking] = useState(true);
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    if (isLoading || hasRedirected) return;

    // Nếu có lỗi hoặc chưa đăng nhập
    if (error || !user) {
      setHasRedirected(true);
      router.push("/login");
    } else {
      setIsChecking(false);
    }
  }, [isLoading, user, error, hasRedirected, router]);

  if (isLoading || isChecking) {
    // Loading UI (tùy bạn có thể thay đổi thành spinner)
    return <div className="absolute top-[50%] left-[50%]">Loading...</div>;
  }

  return <>{children}</>;
}
