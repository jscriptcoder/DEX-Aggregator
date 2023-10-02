<script lang="ts">
  import { network } from '../../stores/network'
  import { account } from '../../stores/account'
  import { UserRejectedRequestError, type Chain } from 'viem'
  import { switchNetwork } from '@wagmi/core'
  import ChainItem from './ChainItem.svelte'
  import { chains } from '../../libs/web3/chains'
  import { errorToast, warningToast } from '../NotificationToast'

  $: isConnected = Boolean($account?.isConnected)

  async function selectNetwork(newNetwork: Chain) {
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
</script>

<div class="dropdown">
  <button class="btn" disabled={!isConnected}>
    {#if $network?.name}
      <ChainItem value={$network} />
    {/if}
  </button>
  <ul tabindex="-1" class="dropdown-content menu">
    {#each chains as chain (chain.id)}
      <li>
        <button
          class="btn btn-ghost w-full justify-start flex items-center space-x-2"
          on:click={() => selectNetwork(chain)}>
          <ChainItem value={chain} />
        </button>
      </li>
    {/each}
  </ul>
</div>

<style lang="postcss">
  .dropdown-content {
    @apply z-10 p-2 shadow rounded-box dark:bg-gray-900 min-w-[200px];
  }
</style>
