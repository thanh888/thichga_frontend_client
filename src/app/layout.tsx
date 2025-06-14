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
              <ToastContainer
                autoClose={1500}
                position="top-right" // Keep the position
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" // Match your app's dark theme
                toastStyle={{
                  backgroundColor: "white", // Match your app's background
                  color: "black", // Match your app's text color
                  width: "300px",
                  marginTop: "16px",
                  borderRadius: "10px",
                  paddingTop: "0",
                  paddingBottom: "0",
                }}
              />
            </SettingProvider>
          </UserProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
