import { fetchBalance, type Address, type Unit } from '@wagmi/core'
import checkConnected from '../utils/checkConnected'
import { get } from 'svelte/store'
import { account } from '../../stores/account'
import { NoAccountAddressError } from '../error'

type GetBalanceArgs = {
  // Address of balance to check
  address?: Address
  // Chain id to use for Public Client
  chainId?: number
  // Units for formatting output
  formatUnits?: Unit
  // ERC-20 address
  token?: Address
}

export default async function getBalance({ address, chainId, formatUnits, token }: GetBalanceArgs) {
  checkConnected()

  let userAddress = address

  if (!userAddress) {
    const $account = get(account)

    // If no address is passed, we use the current wallet address
    if ($account.address) {
      userAddress = $account.address
    } else {
      throw new NoAccountAddressError()
    }
  }

  return fetchBalance({
    address: userAddress,
    chainId,
    formatUnits,
    token,
  })
}
