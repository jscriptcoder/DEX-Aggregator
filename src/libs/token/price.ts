import type { Address } from 'viem'
import type { PriceResponseData } from './types'

type GetPriceArgs = {
  sellToken: Address
  buyToken: Address
  sellAmount: string
  chainId: string
}

export async function getPrice({ sellToken, buyToken, sellAmount, chainId }: GetPriceArgs): Promise<PriceResponseData> {
  if (!sellToken || !buyToken || !sellAmount || !chainId) throw new Error('Missing arguments')

  const queryParams = new URLSearchParams({
    sellToken,
    buyToken,
    sellAmount,
    chainId,
  })

  const response = await fetch(`api/0x?${queryParams}`)

  // TODO: handle errors (e.g. Insifficient asset liquidity, etc...)
  if (!response.ok) throw new Error(`Failed to fetch price: ${response.statusText}`)

  return response.json()
}
