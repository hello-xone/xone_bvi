export const getBlockNumberByTxHash = async (txHash: string) => {
	try {
		const response = await fetch(import.meta.env.VITE_APP_MAIN_RPC_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				jsonrpc: '2.0',
				method: 'eth_getTransactionByHash',
				params: [txHash],
				id: 1
			})
		});

		const data = await response.json();
		if (data.result && data.result.blockNumber) {
			// 将十六进制转换为十进制
			return parseInt(data.result.blockNumber, 16);
		}
		return null;
	} catch (error) {
		console.error('Error fetching block number:', error);
		return null;
	}
};