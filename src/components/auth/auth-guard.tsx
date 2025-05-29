"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Box, CircularProgress } from "@mui/material";
import { useUser } from "@/hooks/use-user";

export interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({
  children,
}: AuthGuardProps): React.JSX.Element | null {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  const [isChecking, setIsChecking] = React.useState<boolean>(true);

  const checkPermissions = async (): Promise<void> => {
    if (isLoading) return;

    if (error || !user || !user._id || !user.username) {
      setIsChecking(false);
      router.replace("/login");
      return;
    }

    setIsChecking(false);
  };

  React.useEffect(() => {
    checkPermissions().catch((err) => {
      console.log("Check permissions failed:", err);
      setIsChecking(false);
      router.replace("/login");
    });
  }, [user, error, isLoading]);

  if (isChecking || isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return <React.Fragment>{children}</React.Fragment>;
}
