import AccountPage from "@/pages/account.page";
import { Container } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {};

export default function AccountLayout() {
  return (
    <Container maxWidth="xl" className="account-page">
      <AccountPage />
    </Container>
  );
}
