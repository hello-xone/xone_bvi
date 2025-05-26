"use client";

import { ClientOnly } from "@chakra-ui/react";
import { WalletKitProvider, ChainType } from "@web3jskit/walletkit";

export default function WalletContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientOnly>
      <WalletKitProvider
        defaultChainType={ChainType.EVM}
        defaultChainId={Number(import.meta.env.VITE_APP_TEST_CHAIN_ID)}
        theme="lightMode"
        isTokenUp
        customEvmNetworks={[
          {
            chainId: import.meta.env.VITE_APP_MAIN_CHAIN_ID,
            chainName: "Xone Mainnet",
            rpcUrls: [import.meta.env.VITE_APP_MAIN_RPC_URL],
            iconUrls: [],
            nativeCurrency: {
              name: "XOne Coin",
              symbol: "XOC",
              decimals: 18,
            },
            blockExplorerUrls: [
              import.meta.env.VITE_APP_MAIN_BLOCK_EXPLORER_URL,
            ],
          },
        ]}
      >
        {children}
      </WalletKitProvider>
    </ClientOnly>
  );
}
