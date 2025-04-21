"use client";
import React, { useState } from "react";
import { Box, Tabs, Tab, Typography, Avatar, Divider } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import UserAccount from "@/components/account/user.account";
import DepositComponent from "@/components/account/deposit.account";
import WithdrawComponent from "@/components/account/withdraw.account";
import DepositHistoryComponent from "@/components/account/history_deposit.account";
import WithdrawHistoryComponent from "@/components/account/history_withdraw.account";

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
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const AccountPage: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        minHeight: "100vh",
        px: 2,
        py: 3,
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: "280px",
          bgcolor: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 2,
            bgcolor: "white",
          }}
        >
          <Avatar
            alt="User"
            src="https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_1280.png"
            sx={{ width: 48, height: 48 }}
          />
          <Box ml={2}>
            <Typography variant="h6" fontWeight={600} color="#1a202c">
              thanhnest
            </Typography>
            <Typography
              variant="body2"
              color="#4a5568"
              display="flex"
              alignItems="center"
            >
              <img
                src="https://cdn.pixabay.com/photo/2016/03/31/15/03/phoenix-1292958_1280.png"
                alt="coin"
                width={16}
                height={16}
                style={{ marginRight: "4px" }}
              />{" "}
              2,002,695.00
            </Typography>
          </Box>
        </Box>

        <Divider />

        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            "& .MuiTab-root": {
              alignItems: "center",
              justifyContent: "start",
              textTransform: "none",
              fontSize: "15px",
              color: "#4a5568",
              py: 1.5,
              px: 2,
              borderRadius: "8px",
              mx: 1,
              my: 0.5,
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
          }}
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
      </Box>

      {/* Tab Panels */}
      <Box sx={{ flex: 1, ml: 3 }}>
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
