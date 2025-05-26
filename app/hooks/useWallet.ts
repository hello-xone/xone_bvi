import { useEffect, useState } from "react";
import { useWalletKit } from "@web3jskit/walletkit";
import { formatUnits } from "viem";
import { readContract } from "~/utils/contract";
import ERC20Abi from "~/config/abi/ERC20.json";

export const useWallet = () => {
	const [balance, setBalance] = useState<number>(0);


	const {
		walletAddress,
	} = useWalletKit();

	const getBalance = async () => {
		const res = await readContract({
			address: import.meta.env.VITE_APP_WXOC_ADDRESS,
			abi: ERC20Abi,
			functionName: "balanceOf",
			args: [walletAddress],
			rpcUrl: import.meta.env.VITE_APP_TEST_RPC_URL,
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