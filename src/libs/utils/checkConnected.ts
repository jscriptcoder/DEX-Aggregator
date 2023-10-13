import { get } from 'svelte/store'
import { account } from '../../stores/account'

export default function checkConnected() {
  const $account = get(account)

  if (!$account?.isConnected) {
    throw new Error('No wallet connected')
  }

  return $account
}
