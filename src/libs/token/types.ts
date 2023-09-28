import type { Address } from "viem"

export type Token = {
  chainId: number,
  address: Address,
  name: string,
  symbol: string,
  decimals: number,
  logoURI: string
}

export type FetchResponseData = {
  tokens: Token[]
}
