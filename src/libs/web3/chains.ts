import type { Chain } from '@wagmi/core'
import { arbitrum, mainnet, polygon, goerli, optimism, avalanche, base, bsc, sepolia } from '@wagmi/core/chains'

export const chains: Chain[] = [mainnet, sepolia, goerli, arbitrum, optimism, polygon, avalanche, base, bsc]

const iconChainBaseURL = 'https://icons.llamao.fi/icons/chains'
const apiBaseDomain = 'api.0x.org'

type ChainMeta = {
  iconUrl: string
  apiBase: string
}

export const chainMetaMap: Record<number, ChainMeta> = {
  [mainnet.id]: {
    iconUrl: `${iconChainBaseURL}/rsz_ethereum.jpg`,
    apiBase: `https://${apiBaseDomain}`,
  },
  [sepolia.id]: {
    iconUrl: `${iconChainBaseURL}/rsz_ethereum.jpg`,
    apiBase: `https://sepolia.${apiBaseDomain}`,
  },
  [goerli.id]: {
    iconUrl: `${iconChainBaseURL}/rsz_ethereum.jpg`,
    apiBase: `https://goerli.${apiBaseDomain}`,
  },
  [optimism.id]: {
    iconUrl: `${iconChainBaseURL}/rsz_optimism.jpg`,
    apiBase: `https://optimism.${apiBaseDomain}`,
  },
  [arbitrum.id]: {
    iconUrl: `${iconChainBaseURL}/rsz_arbitrum.jpg`,
    apiBase: `https://arbitrum.${apiBaseDomain}`,
  },
  [avalanche.id]: {
    iconUrl: `${iconChainBaseURL}/rsz_avalanche.jpg`,
    apiBase: `https://avalanche.${apiBaseDomain}`,
  },
  [polygon.id]: {
    iconUrl: `${iconChainBaseURL}/rsz_polygon.jpg`,
    apiBase: `https://polygon.${apiBaseDomain}`,
  },
  [base.id]: {
    iconUrl: `${iconChainBaseURL}/rsz_base.jpg`,
    apiBase: `https://base.${apiBaseDomain}`,
  },
  [bsc.id]: {
    iconUrl: `${iconChainBaseURL}/rsz_bsc.jpg`,
    apiBase: `https://bsc.${apiBaseDomain}`,
  },
}
