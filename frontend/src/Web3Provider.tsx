import { WagmiProvider, createConfig, http } from "wagmi";
import { hardhat, localhost, mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { PropsWithChildren } from "react";

const config = createConfig(
  getDefaultConfig({
    chains: [hardhat],
    transports: {
      [hardhat.id]: http(),
    },

    // Required API Keys
    walletConnectProjectId: "",

    // Required App Info
    appName: "Weather Station",

    // Optional App Info
    appDescription: "Weather Station Description",
  })
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: PropsWithChildren) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
