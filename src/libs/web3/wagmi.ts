import { w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { configureChains, createConfig } from '@wagmi/core'
import { PUBLIC_WALLET_CONNECT_PROJECT_ID } from '$env/static/public'
import { chains } from './chains'
import { NotSupportedChainError } from '../error'

const projectId = PUBLIC_WALLET_CONNECT_PROJECT_ID

export const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
})

export function isChainSupported(chainId: number | string) {
  return Boolean(chains.find((supportedChain) => supportedChain.id === Number(chainId)))
}

export function checkSupportedChain(chainId: number) {
  if (!isChainSupported(chainId)) {
    throw new NotSupportedChainError()
  }
}
