import getError from '../utils/getError'
import type { GetPriceArgs, GetQuoteArgs, OxApiArgs, PriceResponseData, QuoteResponseData } from './types'

async function OxApi({ apiCall, sellToken, buyToken, sellAmount, chain }: OxApiArgs) {
  if (!apiCall || !buyToken || !sellAmount || !chain) throw new Error('Missing arguments')

  const queryParams = new URLSearchParams({
    apiCall,

    // If no sellAddress is passed, we asume it's the native token
    sellToken: sellToken ?? chain.nativeCurrency.symbol,

    buyToken,
    sellAmount,
    chainId: chain.id.toString(),
  })

  const response = await fetch(`api/0x?${queryParams}`)

  // TODO: handle errors (e.g. Insifficient asset liquidity, etc...)
  // if (!response.ok) throw new Error(`Failed to request: ${response.statusText}`)
  if (!response.ok) {
    const error = await getError(response)
    throw error
  }

  return response.json()
}

export function getPrice({ sellToken, buyToken, sellAmount, chain }: GetPriceArgs): Promise<PriceResponseData> {
  return OxApi({
    apiCall: 'price',
    sellToken,
    buyToken,
    sellAmount,
    chain,
  })
}

export async function getQuote({
  chain,
  sellToken,
  buyToken,
  sellAmount,
  slippagePercentage,
}: GetQuoteArgs): Promise<QuoteResponseData> {
  return OxApi({
    apiCall: 'quote',
    buyToken,
    sellToken,
    sellAmount,
    slippagePercentage,
    chain,
  })
}
