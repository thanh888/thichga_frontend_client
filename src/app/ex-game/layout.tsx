import React from "react";
import { AuthGuard } from "@/components/auth/auth-guard";

export default function ClientLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}
