import { getWalletClient } from '@wagmi/core'
import { NotConnectedError } from '../error'

export default async function getConnectedWallet(chainId?: number) {
  const walletClient = await getWalletClient({ chainId })

  if (!walletClient) {
    throw new NotConnectedError()
  }

  return walletClient
}
