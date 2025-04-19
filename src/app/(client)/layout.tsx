import HeaderComponent from "@/components/header/header";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderComponent />
      <main>{children}</main>
    </>
  );
}
