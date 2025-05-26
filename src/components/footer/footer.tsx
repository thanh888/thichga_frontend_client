import * as React from "react";
import Box from "@mui/material/Box";
import {
  BottomNavigation,
  BottomNavigationAction,
  Container,
} from "@mui/material";
import CottageIcon from "@mui/icons-material/Cottage";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user";
export default function FooterComponent() {
  const { user } = useUser();

  const router = useRouter();
  const [value, setValue] = React.useState(0);

  const menuItems = [
    {
      label: "Trang chủ",
      icon: <CottageIcon />,
      path: "/",
    },
    {
      label: "Liên hệ",
      icon: <PermPhoneMsgIcon />,
      path: "/support",
    },
    {
      label: "Tài khoản",
      icon: <AccountCircleIcon />,
      path: "/account",
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        // bgcolor: "background.paper",
        backgroundColor: "white",
        zIndex: 10,
        boxShadow: 3,
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Container maxWidth="xl">
        {/* sx={{
          maxWidth: "100%",
          mx: "auto", // center horizontally
          boxShadow: 3,
        }} */}

        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          sx={{
            // borderRadius: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          {menuItems.map((item: any, index: number) => (
            <BottomNavigationAction
              key={+index}
              label={item.label}
              icon={item.icon}
              sx={{
                color: "black",
                "&.Mui-selected": {
                  color: "#1976d2",
                },
              }}
              onClick={() =>
                !user && item.path === "account"
                  ? router.push("/login")
                  : router.push(item.path)
              }
            />
          ))}
        </BottomNavigation>
      </Container>
    </Box>
  );
}
