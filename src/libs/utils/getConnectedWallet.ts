import { getWalletClient } from '@wagmi/core'

export default async function getConnectedWallet(chainId?: number) {
  const walletClient = await getWalletClient({ chainId })

  if (!walletClient) {
    throw new Error('No wallet connected')
  }

  return walletClient
}
