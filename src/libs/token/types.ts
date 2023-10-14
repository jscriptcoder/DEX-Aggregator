import type { Address } from 'viem'

export type Token = {
  chainId: number
  name: string
  symbol: string
  decimals: number
  logoURI: string
  address?: Address
}

export type ERC20Token = Required<Token>
