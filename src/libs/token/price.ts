import type { PriceResponseData, Token } from "./types";
import { chainMetaMap } from "../web3/chains";
import { PUBLIC_OX_API_KEY } from "$env/static/public";

type GetPriceArgs = {
  tokenFrom: Token,
  tokenTo: Token,
  amount: bigint,
  chainId: number,
}

export async function getPrice({tokenFrom, tokenTo, amount, chainId}: GetPriceArgs): Promise<PriceResponseData> {
  if(!tokenFrom || !tokenTo || !amount || !chainId) throw new Error('Missing arguments')

  const { api } = chainMetaMap[chainId]

  const queryParams = new URLSearchParams({
    sellToken: tokenFrom.address,
    buyToken: tokenTo.address,
    sellAmount: amount.toString(),
  })

  const response = await fetch(`${api}/swap/v1/quote?${queryParams}`, { headers: { '0x-api-key': PUBLIC_OX_API_KEY } })

  if (!response.ok) throw new Error(`Failed to fetch price: ${response.statusText}`)

  return response.json()
}
