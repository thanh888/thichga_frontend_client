"use client";
import FooterComponent from "@/components/footer/footer";
import HeaderComponent from "@/components/header/header";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderComponent />
      <main style={{ marginTop: "60px" }}>{children}</main>
      <FooterComponent />
    </>
  );
}
