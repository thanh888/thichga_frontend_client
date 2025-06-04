"use client";

import { ReactNode } from "react";

export default function GameLayout({
  children,
}: {
  readonly children: ReactNode;
}) {
  return <>{children}</>;
}
