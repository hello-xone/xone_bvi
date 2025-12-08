import { useEffect, useState } from "react";
import { useWalletKit } from "@web3jskit/walletkit";
import { formatUnits } from "viem";
import { readContract } from "~/utils/contract";
import ERC20Abi from "~/config/abi/ERC20.json";
import { CONTRACT_ADDRESSES, RPC_URLS } from "~/config/env";

export const useWallet = () => {
	const [balance, setBalance] = useState<number>(0);


	const {
		walletAddress,
	} = useWalletKit();

	const getBalance = async () => {
		const res = await readContract({
			address: CONTRACT_ADDRESSES.WXOC,
			abi: ERC20Abi,
			functionName: "balanceOf",
			args: [walletAddress],
			rpcUrl: RPC_URLS.TEST,
		});
		setBalance(Number(formatUnits(res, 18)));
	};

	useEffect(() => {
		if (walletAddress) {
			getBalance();
		} else {
			setBalance(0);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [walletAddress]);

	return {
		balance
	}

}