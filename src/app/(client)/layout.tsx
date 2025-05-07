"use client";
import FooterComponent from "@/components/footer/footer";
import HeaderComponent from "@/components/header/header";
import { useUser } from "@/hooks/use-user";
import { useEffect } from "react";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {});
  return (
    <>
      <HeaderComponent />
      <main style={{ marginTop: "60px" }}>{children}</main>
      <FooterComponent />
    </>
  );
}
