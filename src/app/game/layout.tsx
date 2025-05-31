"use client";

import { AuthGuard } from "@/components/auth/auth-guard";

import { ReactNode } from "react";

export default function GameLayout({
  children,
}: {
  readonly children: ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}
