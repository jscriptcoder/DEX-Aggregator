<script lang="ts">
  import { network } from '../../stores/network'
  import { account } from '../../stores/account'
  import ChainItem from '../ChainItem'
  import { chains } from '../../libs/web3/chains'
  import selectNetwork from '../utils/selectNetwork'
  import FaCheck from 'svelte-icons/fa/FaCheck.svelte'

  $: isConnected = Boolean($account?.isConnected)
</script>

<div class="dropdown hidden md:block">
  <button class="btn" disabled={!isConnected}>
    {#if $network?.name}
      <ChainItem value={$network} />
    {/if}
  </button>
  <ul tabindex="-1" class="dropdown-content menu w-[250px]">
    {#each chains as chain (chain.id)}
      <li>
        <!-- TODO: support multiple chains -->
        <button
          class="btn btn-ghost w-full justify-between flex items-center space-x-2"
          on:click={() => selectNetwork(chain)}>
          <ChainItem value={chain} />

          {#if $network?.id === chain.id}
            <div class="w-4 h-4 text-green-600">
              <FaCheck />
            </div>
          {/if}
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
