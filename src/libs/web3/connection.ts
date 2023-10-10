import { watchAccount, watchNetwork } from '@wagmi/core'
import { network } from '../../stores/network'
import { account } from '../../stores/account'

let isWatching = false
let unwatchNetwork: () => void
let unwatchAccount: () => void

export function startWatching() {
  if (isWatching) return

  unwatchNetwork = watchNetwork(async (networkResult) => {
    const { chain } = networkResult
    console.log('Network change:', chain)
    network.set(chain)
  })

  unwatchAccount = watchAccount(async (data) => {
    console.log('Account change:', data)
    account.set(data)
  })
}

export function stopWatching() {
  unwatchNetwork?.()
  unwatchAccount?.()
  isWatching = false
}
