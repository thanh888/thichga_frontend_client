import Homepage from "@/pages/homepage.page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thích Gà",
  description: "Chào mừng ban đến với Thích Gà",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Thích Gà",
    description: "Chào mừng ban đến với Thích Gà",
    url: "https://thichga.com",
    siteName: "Thích Gà",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "vi-VN",
    type: "website",
  },
};

export default function HomeLayout() {
  return <Homepage />;
}
