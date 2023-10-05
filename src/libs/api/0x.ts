import type { GetPriceArgs, GetQuoteArgs, OxApiArgs, PriceResponseData, QuoteResponseData } from './types'


async function OxApi({ apiCall, sellToken, buyToken, sellAmount, chainId }: OxApiArgs) {
  if (!apiCall || !sellToken || !buyToken || !sellAmount || !chainId) throw new Error('Missing arguments')

  const queryParams = new URLSearchParams({
    apiCall,
    sellToken,
    buyToken,
    sellAmount,
    chainId,
  })

  const response = await fetch(`api/0x?${queryParams}`)

  // TODO: handle errors (e.g. Insifficient asset liquidity, etc...)
  if (!response.ok) throw new Error(`Failed to request: ${response.statusText}`)

  return response.json()
}

export function getPrice({ sellToken, buyToken, sellAmount, chainId }: GetPriceArgs): Promise<PriceResponseData> {
  return OxApi({
    apiCall: 'price',
    sellToken,
    buyToken,
    sellAmount,
    chainId,
  })
}

export async function getQuote({ sellToken, buyToken, sellAmount, slippagePercentage, chainId }: GetQuoteArgs): Promise<QuoteResponseData> {
  return OxApi({
    apiCall: 'quote',
    sellToken,
    buyToken,
    sellAmount,
    slippagePercentage,
    chainId,
  })
}
