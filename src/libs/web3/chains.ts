import type { Chain } from '@wagmi/core'
import { arbitrum, mainnet, polygon, goerli, optimism, avalanche, base, bsc } from '@wagmi/core/chains'

export const chains: Chain[] = [mainnet, goerli, arbitrum, optimism, polygon, avalanche, base, bsc]

const iconChainBaseURL = 'https://icons.llamao.fi/icons/chains'
const apiBaseDomain = 'api.0x.org'

type ChainMeta = {
  icon: string
  api: string
}

export const chainMetaMap: Record<number, ChainMeta> = {
  [mainnet.id]: {
    icon: `${iconChainBaseURL}/rsz_ethereum.jpg`,
    api: `https://${apiBaseDomain}`,
  },
  [goerli.id]: {
    icon: `${iconChainBaseURL}/rsz_ethereum.jpg`,
    api: `https://goerli.${apiBaseDomain}`,
  },
  [optimism.id]: {
    icon: `${iconChainBaseURL}/rsz_optimism.jpg`,
    api: `https://optimism.${apiBaseDomain}`,
  },
  [arbitrum.id]: {
    icon: `${iconChainBaseURL}/rsz_arbitrum.jpg`,
    api: `https://arbitrum.${apiBaseDomain}`,
  },
  [avalanche.id]: {
    icon: `${iconChainBaseURL}/rsz_avalanche.jpg`,
    api: `https://avalanche.${apiBaseDomain}`,
  },
  [polygon.id]: {
    icon: `${iconChainBaseURL}/rsz_polygon.jpg`,
    api: `https://polygon.${apiBaseDomain}`,
  },
  [base.id]: {
    icon: `${iconChainBaseURL}/rsz_base.jpg`,
    api: `https://base.${apiBaseDomain}`,
  },
  [bsc.id]: {
    icon: `${iconChainBaseURL}/rsz_bsc.jpg`,
    api: `https://bsc.${apiBaseDomain}`,
  },
}
