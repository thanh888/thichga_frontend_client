"use client";
import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import DepositManualComponent from "./deposit-manual.account";
import DepositAutoComponent from "./deposit-auto.account";
import { SettingContext } from "@/contexts/setting-context";
import { DepositModeEnum } from "@/utils/enum/deposit-mode.enum";

export default function DepositComponent() {
  const settingContext = useContext(SettingContext);
  const setting = settingContext?.setting;
  const checkSettingSession = settingContext?.checkSettingSession;

  useEffect(() => {
    checkSettingSession?.();
  }, []);

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="center"
        gap={{ xs: 1, sm: 2 }}
        mb={{ xs: 2, sm: 3 }}
      ></Box>
      {setting?.deposit_mode &&
      setting.deposit_mode === DepositModeEnum.AUTO ? (
        <>
          <Button
            variant={"outlined"}
            sx={{
              fontSize: { xs: "0.875rem", sm: "1rem" },
              px: { xs: 2, sm: 3 },
              width: "100%",
              py: { xs: 0.5, sm: 1 },
              pointerEvents: "none",
            }}
          >
            Nạp tự động
          </Button>
          <DepositAutoComponent />
        </>
      ) : (
        <>
          <Button
            variant={"outlined"}
            sx={{
              pointerEvents: "none",
              fontSize: { xs: "0.875rem", sm: "1rem" },
              px: { xs: 2, sm: 3 },
              py: { xs: 0.5, sm: 1 },
              width: "100%",
            }}
          >
            Nạp thủ công
          </Button>
          <DepositManualComponent />
        </>
      )}
    </Box>
  );
}
