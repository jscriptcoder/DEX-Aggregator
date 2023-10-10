import { zeroAddress } from "viem"

export const apiConfig = {
  tokensUrl: 'https://tokens.coingecko.com/uniswap/all.json',
  // tokensUrl: 'https://erc20.cmc.eth.link/',
}

export const inputConfig = {
  debounceWait: 300,
}

export const tokenSelectorConfig = {
  maxDisplay: 12,
}

export const notificarionConfig = {
  duration: 5000,
}

export const ethTokenConfig = {
  address: zeroAddress,
  name: 'Ether',
  symbol: 'ETH',
  decimals: 18,
  logoURI: 'https://etherscan.io/images/ethereum-icon.png',
}
