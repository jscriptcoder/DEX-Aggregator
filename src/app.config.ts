export const apiConfig = {
  tokensUrl: 'https://tokens.coingecko.com/uniswap/all.json',
  // tokensUrl: 'https://raw.githubusercontent.com/compound-finance/token-list/master/compound.tokenlist.json',
  // tokensUrl: 'https://static.optimism.io/optimism.tokenlist.json',
  // tokensUrl: 'api/tokenlist',
}

export const inputConfig = {
  debounceWait: 300,
}

export const tokenSelectorConfig = {
  maxDisplay: 12,
}

export const notificationConfig = {
  duration: {
    default: 5000,
    withLinks: 10000,
  },
}

export const tokenLogo: Record<string, string> = {
  ETH: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg',
  MATIC: 'https://cryptologos.cc/logos/polygon-matic-logo.svg',
}
