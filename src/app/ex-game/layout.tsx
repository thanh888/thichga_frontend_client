"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user";
import { AuthGuard } from "@/components/auth/auth-guard";

export default function ClientLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  // const router = useRouter();
  // const { user, isLoading, error } = useUser();

  // const [isChecking, setIsChecking] = useState(true);
  // const [hasRedirected, setHasRedirected] = useState(false);

  // useEffect(() => {
  //   if (isLoading || hasRedirected) return;

  //   // Nếu có lỗi hoặc chưa đăng nhập
  //   if (error || !user) {
  //     setHasRedirected(true);
  //     router.push("/login");
  //   } else {
  //     setIsChecking(false);
  //   }
  // }, [isLoading, user, error, hasRedirected, router]);

  // if (isLoading || isChecking) {
  //   return <div className="absolute top-[50%] left-[50%]">Đang tải...</div>;
  // }

  return <AuthGuard>{children}</AuthGuard>;
}
