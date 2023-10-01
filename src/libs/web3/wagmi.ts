import { w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { configureChains, createConfig, type Chain } from '@wagmi/core'
import { arbitrum, mainnet, polygon, sepolia, optimism, avalanche, bsc } from '@wagmi/core/chains'
import { PUBLIC_WALLET_CONNECT_PROJECT_ID } from '$env/static/public'

const projectId = PUBLIC_WALLET_CONNECT_PROJECT_ID

export const chains: Chain[] = [ 
  mainnet,
  sepolia,
  arbitrum,
  optimism,
  polygon, 
  avalanche,
  bsc
]

const iconChainBaseURL = 'https://icons.llamao.fi/icons/chains'
export const chainIconMap: Record<number, string> = {
  [mainnet.id]: `${iconChainBaseURL}/rsz_ethereum.jpg`,
  [sepolia.id]: `${iconChainBaseURL}/rsz_ethereum.jpg`,
  [optimism.id]: `${iconChainBaseURL}/rsz_optimism.jpg`,
  [arbitrum.id]: `${iconChainBaseURL}/rsz_arbitrum.jpg`,
  [avalanche.id]: `${iconChainBaseURL}/rsz_avalanche.jpg`,
  [polygon.id]: `${iconChainBaseURL}/rsz_polygon.jpg`,
  [bsc.id]: `${iconChainBaseURL}/rsz_bsc.jpg`,
}

export const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})

export function isChainSupported(chainId: number | string) {
  return Boolean(chains.find((supportedChain) => supportedChain.id === Number(chainId)))
}

export function checkSupportedChain (chainId: number) {
  if(!isChainSupported(chainId)) {
    throw new Error('Chain is not supported.')
  }
}
