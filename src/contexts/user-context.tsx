"use client";

import * as React from "react";
import { getAccoutUserApi } from "@/services/auth/auth.api";
import { UserInterface } from "@/utils/interfaces/user.interface";

export interface UserContextValue {
  user: UserInterface | null;
  error: string | null;
  isLoading: boolean;
  checkSession: () => Promise<void>;
}

export const UserContext = React.createContext<UserContextValue | undefined>(
  undefined
);

export interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({
  children,
}: Readonly<UserProviderProps>): React.JSX.Element {
  const [state, setState] = React.useState<{
    user: UserInterface | null;
    error: string | null;
    isLoading: boolean;
  }>({
    user: null,
    error: null,
    isLoading: true,
  });

  const checkSession = React.useCallback(async (): Promise<void> => {
    try {
      const response = await getAccoutUserApi();

      if (response.status === 200 || response.status === 201) {
        setState({
          user: response.data,
          error: null,
          isLoading: false,
        });
      } else {
        setState({
          user: null,
          error: "Something went wrong",
          isLoading: false,
        });
      }
    } catch (err: any) {
      console.log("Error checking session:", err?.message || err);
      setState({
        user: null,
        error: "Something went wrong",
        isLoading: false,
      });
    }
  }, []);

  React.useEffect(() => {
    checkSession().catch(console.error);
  }, [checkSession]);

  const contextValue = React.useMemo(
    () => ({ ...state, checkSession }),
    [state, checkSession]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export const UserConsumer = UserContext.Consumer;
