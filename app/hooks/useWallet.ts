import { useEffect, useState } from "react";
import { useWalletKit } from "@tokenup/walletkit";
import { formatUnits } from "viem";
import { readContract } from "~/utils/contract";
import ERC20Abi from "~/config/abi/ERC20.json";

export const useWallet = (token: 'xoc' | 'wxoc' = 'xoc') => {
	const [balance, setBalance] = useState<number | bigint>(0);
	const [loading, setLoading] = useState<boolean>(false);

	const {
		walletAddress,
	} = useWalletKit();

	const getBalance = async () => {
		setLoading(true);
		const res = await readContract({
			address: import.meta.env.VITE_APP_WXOC_ADDRESS,
			abi: ERC20Abi,
			functionName: "balanceOf",
			method: token === 'wxoc' ? 'eth_call' : 'eth_getBalance',
			args: [walletAddress],
			rpcUrl: import.meta.env.VITE_APP_TEST_RPC_URL,
		});
		setBalance(res);
		setLoading(false);
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
		balance,
		getBalanceLoading: loading,
		getBalance
	}

}