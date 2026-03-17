import { ConfigProvider, App as AntApp } from "antd";
import type { PropsWithChildren } from "react";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#275d48",
          colorInfo: "#275d48",
          borderRadius: 14,
          fontFamily: '"Satoshi", "Avenir Next", "Segoe UI", sans-serif',
        },
      }}
    >
      <AntApp>{children}</AntApp>
    </ConfigProvider>
  );
}
