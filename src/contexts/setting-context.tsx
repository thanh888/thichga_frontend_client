"use client";

import * as React from "react";
import { SettingInterface } from "@/utils/interfaces/setting.interface";

import { GetSettingApi } from "@/services/setting.api";

export interface SettingContextValue {
  setting: SettingInterface;
  error: string | null;
  isLoading: boolean;
  checkSettingSession?: () => Promise<void>;
}

export const SettingContext = React.createContext<
  SettingContextValue | undefined
>(undefined);

export interface SettingProviderProps {
  children: React.ReactNode;
}

export function SettingProvider({
  children,
}: Readonly<SettingProviderProps>): React.JSX.Element {
  const [state, setState] = React.useState<{
    setting: any;
    error: string | null;
    isLoading: boolean;
  }>({
    setting: null,
    error: null,
    isLoading: true,
  });

  const checkSettingSession = React.useCallback(async (): Promise<void> => {
    try {
      const reponse = await GetSettingApi();

      if (reponse.status === 200) {
        setState((prev) => ({
          ...prev,
          setting: reponse.data[0] ?? null,
          error: null,
          isLoading: false,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          setting: null,
          error: "Something went wrong",
          isLoading: false,
        }));
        return;
      }
    } catch (err) {
      console.log(err);
      setState((prev) => ({
        ...prev,
        setting: null,
        error: "Something went wrong",
        isLoading: false,
      }));
    }
  }, []);

  React.useEffect(() => {
    checkSettingSession().catch((err: unknown) => {});
  }, []);

  const contextValue = React.useMemo(
    () => ({ ...state, checkSettingSession }),
    [state, checkSettingSession]
  );

  return (
    <SettingContext.Provider value={contextValue}>
      {children}
    </SettingContext.Provider>
  );
}

export const SettingConsumer = SettingContext.Consumer;
