"use client";

import { ClientOnly } from "@chakra-ui/react";
import { WalletKitProvider, ChainType } from "@tokenup/walletkit";

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
      >
        {children}
      </WalletKitProvider>
    </ClientOnly>
  );
}
