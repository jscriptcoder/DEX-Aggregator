import { EthereumClient } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/html'
import { wagmiConfig } from './wagmi'
import { PUBLIC_WALLET_CONNECT_PROJECT_ID } from '$env/static/public'
import { chains } from './chains'

const projectId = PUBLIC_WALLET_CONNECT_PROJECT_ID
const themeMode = (localStorage.getItem('theme') || 'dark') as Theme

const ethereumClient = new EthereumClient(wagmiConfig, chains)

export const web3modal = new Web3Modal(
  {
    projectId,
    themeMode,
    themeVariables: {
      '--w3m-accent-color': 'hsl(262 80% 50%)',
      '--w3m-background-color': 'hsl(262 80% 50%)',
    },
  },
  ethereumClient,
)
