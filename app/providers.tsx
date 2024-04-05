// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import "@rainbow-me/rainbowkit/styles.css";
import { darkTheme, getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { filecoin, filecoinCalibration } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: "EnigmAi",
  projectId: "db1b8a46ffa835bd9a48a89ff540f990",
  chains: [filecoinCalibration, filecoin],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient} >
          <RainbowKitProvider
            theme={darkTheme({
              accentColor: "#0764f7",
              accentColorForeground: "white",
              borderRadius: "medium",
            })}
            coolMode
            modalSize="compact"
          >
            {children}{" "}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </NextUIProvider>
  );
}
