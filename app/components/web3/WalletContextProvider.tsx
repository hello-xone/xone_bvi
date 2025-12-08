"use client";

import { ClientOnly } from "@chakra-ui/react";
import { WalletKitProvider, ChainType } from "@web3jskit/walletkit";
import { CHAIN_IDS, RPC_URLS, BLOCK_EXPLORER } from "~/config/env";

export default function WalletContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientOnly>
      <WalletKitProvider
        defaultChainType={ChainType.EVM}
        defaultChainId={CHAIN_IDS.TEST}
        theme="lightMode"
        isTokenUp
        customEvmNetworks={[
          {
            chainId: CHAIN_IDS.MAIN,
            chainName: "Xone Mainnet",
            rpcUrls: [RPC_URLS.MAIN],
            iconUrls: [],
            nativeCurrency: {
              name: "XOne Coin",
              symbol: "XOC",
              decimals: 18,
            },
            blockExplorerUrls: [BLOCK_EXPLORER],
          },
        ]}
      >
        {children}
      </WalletKitProvider>
    </ClientOnly>
  );
}
