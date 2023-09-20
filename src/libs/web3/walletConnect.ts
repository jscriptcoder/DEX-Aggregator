import { EthereumClient } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/html'
import { chains, wagmiConfig } from './wagmi'
import { PUBLIC_WALLET_CONNECT_PROJECT_ID } from '$env/static/public'

const projectId = PUBLIC_WALLET_CONNECT_PROJECT_ID
const themeMode = (localStorage.getItem('theme') || 'dark') as Theme

const ethereumClient = new EthereumClient(wagmiConfig, chains)

export const web3modal = new Web3Modal(
  {
    projectId,
    themeMode,
    themeVariables: {}
  },
  ethereumClient
)
