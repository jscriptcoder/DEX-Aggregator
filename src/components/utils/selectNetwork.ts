import { switchNetwork } from '@wagmi/core'
import { UserRejectedRequestError, type Chain } from 'viem'
import { errorToast, warningToast } from '../NotificationToast'

export default async function selectNetwork(newNetwork: Chain) {
  try {
    await switchNetwork({ chainId: newNetwork.id })
  } catch (err) {
    console.error(err)
    if (err instanceof UserRejectedRequestError) {
      warningToast('User cancelled switching network.')
    } else {
      errorToast('Failed to switch network.')
    }
  }
}
