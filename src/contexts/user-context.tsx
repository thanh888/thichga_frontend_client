"use client";

import * as React from "react";
import { getAccoutUserApi } from "@/services/auth/auth.api";
import { UserInterface } from "@/utils/interfaces/user.interface";
import { useRouter } from "next/navigation";

export interface UserContextValue {
  user: UserInterface;
  error: string | null;
  isLoading: boolean;
  checkSession?: () => Promise<void>;
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
    user: any;
    error: string | null;
    isLoading: boolean;
  }>({
    user: null,
    error: null,
    isLoading: true,
  });

  const router = useRouter();

  const checkSession = React.useCallback(async (): Promise<void> => {
    try {
      const response = await getAccoutUserApi();

      if (response.status === 200 || response.status === 201) {
        setState((prev) => ({
          ...prev,
          user: response.data ?? null,
          error: null,
          isLoading: false,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          user: null,
          error: "Something went wrong",
          isLoading: false,
        }));
        return;
      }
    } catch (err) {
      console.log(err);
      setState((prev) => ({
        ...prev,
        user: null,
        error: "Something went wrong",
        isLoading: false,
      }));
      router.replace("/login");
    }
  }, []);

  React.useEffect(() => {
    checkSession().catch((err: unknown) => {
      console.log(err);
      // noop
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, []);

  const contextValue = React.useMemo(
    () => ({ ...state, checkSession }),
    [state, checkSession]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export const UserConsumer = UserContext.Consumer;
