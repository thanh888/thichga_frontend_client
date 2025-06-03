import AccountPage from "@/pages/account.page";
import { Container } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tài khoản",
};

export default function AccountLayout() {
  return (
    <Container
      maxWidth="xl"
      sx={{ px: { xs: 1, sm: 2 }, py: { xs: 1, sm: 2 } }}
      className="account-page"
    >
      <AccountPage />
    </Container>
  );
}
