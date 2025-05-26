"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext, UserProvider } from "@/contexts/user-context";
import { AuthGuard } from "@/components/auth/auth-guard";

export default function ClientLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  // const router = useRouter();
  // const userContext = useContext(UserContext);
  // const user = userContext?.user;
  // const isLoading = userContext?.isLoading;
  // const error = userContext?.error;

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
  //   return (
  //     <div
  //       className="absolute top-[50%] left-[40%] "
  //       style={{ backgroundColor: "white", color: "black" }}
  //     >
  //       Đang tải...
  //     </div>
  //   );
  // }

  return <AuthGuard>{children}</AuthGuard>;
}
