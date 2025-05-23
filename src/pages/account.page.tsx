"use client";
import React, { useEffect, useState } from "react";
import { Box, Tabs, Tab, Typography, Avatar } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import UserAccount from "@/components/account/user.account";
import DepositComponent from "@/components/account/deposit.account";
import WithdrawComponent from "@/components/account/withdraw.account";
import DepositHistoryComponent from "@/components/account/history_deposit.account";
import WithdrawHistoryComponent from "@/components/account/history_withdraw.account";
import { ConvertMoneyVND } from "@/utils/function-convert.util";
import { useRouter } from "next/navigation";
import { UserContext } from "@/contexts/user-context";
import { useContext } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: Readonly<TabPanelProps>) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      className="w-full"
      hidden={value !== index}
      id={`horizontal-tabpanel-${index}`}
      aria-labelledby={`horizontal-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: { xs: 1, sm: 2 } }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `horizontal-tab-${index}`,
    "aria-controls": `horizontal-tabpanel-${index}`,
  };
}

const AccountPage: React.FC = () => {
  const [value, setValue] = useState(0);

  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const isLoading = userContext?.isLoading;
  const error = userContext?.error;

  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabStyles = {
    "& .MuiTab-root": {
      textTransform: "none",
      fontSize: { xs: "12px", sm: "14px", md: "15px" },
      color: "#4a5568",
      py: { xs: 1, sm: 1.5 },
      px: { xs: 1, sm: 2 },
      minHeight: { xs: "40px", sm: "48px" },
      "&:hover": {
        bgcolor: "#e3f2fd",
        color: "#1e88e5",
      },
    },
    "& .Mui-selected": {
      bgcolor: "#e3f2fd",
      color: "#1e88e5",
      fontWeight: 600,
    },
    "& .MuiTabs-indicator": {
      backgroundColor: "#1e88e5",
    },
  };

  const [isChecking, setIsChecking] = useState(true);
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    if (isLoading || hasRedirected) return;

    // Nếu có lỗi hoặc chưa đăng nhập
    if (error || !user) {
      setHasRedirected(true);
      router.push("/login");
    } else {
      setIsChecking(false);
    }
  }, [isLoading, user, error, hasRedirected, router]);

  if (isLoading || isChecking) {
    // Loading UI (tùy bạn có thể thay đổi thành spinner)
    return <div className="absolute top-[50%] left-[50%]">Loading...</div>;
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {/* User Info */}
      <Box
        sx={{
          bgcolor: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          p: { xs: 1.5, sm: 2 },
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar
            alt="User"
            src="https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_1280.png"
            sx={{ width: { xs: 36, sm: 48 }, height: { xs: 36, sm: 48 } }}
          />
          <Box ml={1.5}>
            <Typography
              variant="h6"
              fontWeight={600}
              color="#1a202c"
              fontSize={{ xs: "1rem", sm: "1.25rem" }}
            >
              {user?.username ?? ""}
            </Typography>
            <Typography
              variant="body2"
              color="#4a5568"
              display="flex"
              alignItems="center"
              fontSize={{ xs: "0.75rem", sm: "0.875rem" }}
            >
              <img
                src="https://cdn.pixabay.com/photo/2016/03/31/15/03/phoenix-1292958_1280.png"
                alt="coin"
                width={16}
                height={16}
                style={{ marginRight: "4px" }}
              />{" "}
              {ConvertMoneyVND(user?.money ?? 0)}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Tabs */}
      <Tabs
        orientation="horizontal"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Account tabs"
        sx={tabStyles}
        scrollButtons="auto"
        allowScrollButtonsMobile
      >
        <Tab
          label="Tài khoản"
          iconPosition="start"
          icon={<AccountCircleOutlinedIcon />}
          {...a11yProps(0)}
        />
        <Tab
          label="Nạp tiền tự động"
          iconPosition="start"
          icon={<AddCardOutlinedIcon />}
          {...a11yProps(1)}
        />
        <Tab
          label="Rút tiền"
          iconPosition="start"
          icon={<CurrencyExchangeOutlinedIcon />}
          {...a11yProps(2)}
        />
        <Tab
          label="Lịch sử nạp tiền"
          iconPosition="start"
          icon={<ChecklistOutlinedIcon />}
          {...a11yProps(3)}
        />
        <Tab
          label="Lịch sử rút tiền"
          iconPosition="start"
          icon={<ChecklistOutlinedIcon />}
          {...a11yProps(4)}
        />
      </Tabs>

      {/* Tab Panels */}
      <Box sx={{ flex: 1 }}>
        <TabPanel value={value} index={0}>
          <UserAccount />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <DepositComponent />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <WithdrawComponent />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <DepositHistoryComponent />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <WithdrawHistoryComponent />
        </TabPanel>
      </Box>
    </Box>
  );
};

export default AccountPage;
