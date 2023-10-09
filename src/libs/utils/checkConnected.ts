import { get } from 'svelte/store'
import { account } from '../../stores/account'
import { NotConnectedError } from '../error'

export default function checkConnected() {
  const $account = get(account)

  if (!$account?.isConnected) {
    throw new NotConnectedError()
  }

  return $account
}
