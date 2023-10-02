import type { PriceResponseData, Token } from "./types";

type GetPriceArgs = {
  tokenFrom: Token,
  tokenTo: Token,
  amount: bigint,
  chainId: number,
}

export async function getPrice({tokenFrom, tokenTo, amount, chainId}: GetPriceArgs): Promise<PriceResponseData> {
  if(!tokenFrom || !tokenTo || !amount || !chainId) throw new Error('Missing arguments')

  const queryParams = new URLSearchParams({
    sellToken: tokenFrom.address,
    buyToken: tokenTo.address,
    sellAmount: amount.toString(),
    chainId: chainId.toString(),
  })

  const response = await fetch(`api/0x?${queryParams}`)

  if (!response.ok) throw new Error(`Failed to fetch price: ${response.statusText}`)

  return response.json()
}
