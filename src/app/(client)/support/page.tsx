import SupportPage from "@/pages/support.page";
import { Container } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hỗ trợ",
  description: "Hãy liên hệ với chúng tôi nếu bạn cần hỗ trợ",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Hỗ trợ người dùng",
    description: "Hãy liên hệ với chúng tôi nếu bạn cần hỗ trợ",
    url: "https://thichga.com",
    siteName: "Support",
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

export default function SupportLayout() {
  return (
    <Container maxWidth="xl" className="support-page">
      <SupportPage />
    </Container>
  );
}
