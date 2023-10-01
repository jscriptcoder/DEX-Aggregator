<script lang="ts">
  import { network } from '../../stores/network';
  import { account } from '../../stores/account';
  import type { Chain } from 'viem';
  import { switchNetwork } from '@wagmi/core';
  import { chains } from '../../libs/web3/wagmi';
  import ChainItem from './ChainItem.svelte';

  $: isConnected = Boolean($account?.isConnected);

  async function selectNetwork(newNetwork: Chain) {
    await switchNetwork({ chainId: newNetwork.id });
  }
</script>

<div class="dropdown">
  <button class="btn" disabled={!isConnected}>
    {#if $network?.name}
      <ChainItem value={$network} />
    {/if}
  </button>
  <ul tabindex="-1" class="dropdown-content z-10 menu p-2 shadow rounded-box">
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
