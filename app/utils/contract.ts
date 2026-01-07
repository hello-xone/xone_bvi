import { decodeFunctionResult, encodeFunctionData, formatEther } from 'viem';
import { formatTSNumber, formatUnitsNumber } from './format/number';

export interface IContractOptions {
  abi: any;
  address: string;
  functionName: string;
  rpcUrl: string;
  args?: any[];
  value?: bigint | undefined | any;
  options?: any;
  from?: string;
  method?: string;
}

export const readContract = async (params: IContractOptions): Promise<any> => {
  let { abi, address, functionName, args = [], rpcUrl, from, method = 'eth_call' } = params;

  const isGetBalance = method === 'eth_getBalance'

  const data = encodeFunctionData({
    abi,
    functionName,
    args,
  });
  // console.log('data---', data);
  const result = await fetch(rpcUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: Math.floor(Math.random() * 100000),
      jsonrpc: '2.0',
      method,
      params: [
        isGetBalance ? args[0] : from ? { from: from, to: address, data } : { to: address, data },
        'latest',
      ],
    }),
  });
  const resultJSON = await result.json();
  // console.log('resultJson', resultJSON);
  if (!resultJSON.result || resultJSON.result === '0x') return result;
  let decodeRes: any = '0.00'
  if (isGetBalance) {
    decodeRes = formatEther(parseInt(resultJSON.result, 16) as any)
  } else {
    decodeRes = decodeFunctionResult({
      abi: isGetBalance ? undefined : abi,
      functionName: isGetBalance ? undefined : functionName,
      data: resultJSON.result,
    });
  }

  // console.log('EVM-readContract', functionName, decodeRes);
  return decodeRes;
};
