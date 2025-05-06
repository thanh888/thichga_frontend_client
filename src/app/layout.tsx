import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserProvider } from "@/contexts/user-context";
import { SettingProvider } from "@/contexts/setting-context";
import { ToastContainer } from "react-toastify";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="mdl-js">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppRouterCacheProvider options={{ key: "css" }}>
          <UserProvider>
            <SettingProvider>
              {children}
              <ToastContainer />
            </SettingProvider>
          </UserProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
