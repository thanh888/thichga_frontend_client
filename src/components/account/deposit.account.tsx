"use client";
import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import DepositManualComponent from "./deposit-manual.account";
import DepositAutoComponent from "./deposit-auto.account";

export default function DepositComponent() {
  const [selectedMethod, setSelectedMethod] = useState<"manual" | "auto">(
    "manual"
  );

  const handleSelectMethod = (method: "manual" | "auto") => {
    setSelectedMethod(method);
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="center"
        gap={{ xs: 1, sm: 2 }}
        mb={{ xs: 2, sm: 3 }}
      >
        <Button
          variant={selectedMethod === "manual" ? "contained" : "outlined"}
          onClick={() => handleSelectMethod("manual")}
          sx={{
            fontSize: { xs: "0.875rem", sm: "1rem" },
            px: { xs: 2, sm: 3 },
            py: { xs: 0.5, sm: 1 },
            width: "100%",
          }}
        >
          Nạp thủ công
        </Button>
        <Button
          variant={selectedMethod === "auto" ? "contained" : "outlined"}
          onClick={() => handleSelectMethod("auto")}
          sx={{
            fontSize: { xs: "0.875rem", sm: "1rem" },
            px: { xs: 2, sm: 3 },
            width: "100%",
            py: { xs: 0.5, sm: 1 },
          }}
        >
          Nạp tự động
        </Button>
      </Box>
      {selectedMethod === "manual" ? (
        <DepositManualComponent />
      ) : (
        <DepositAutoComponent />
      )}
    </Box>
  );
}
