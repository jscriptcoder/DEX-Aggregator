import type { Address } from "viem"
import type { Token } from "../token/types"

export interface BaseArgs {
  sellToken: Address
  buyToken: string
  sellAmount: string
  chainId: string
  slippagePercentage?: string
}

export interface OxApiArgs extends BaseArgs {
  apiCall: string
}

export interface GetPriceArgs extends BaseArgs {}

export interface GetQuoteArgs extends BaseArgs {}

export type FetchResponseData = {
  tokens: Token[]
}

export type PriceResponseData = {
  price: string
  estimatedGas: string
}

export type QuoteResponseData = {
  allowanceTarget: Address
}
