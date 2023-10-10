<script>
  import { mainnet } from 'viem/chains'
  import { chains } from '../../libs/web3/chains'
  import ChainItem from '../ChainItem'
  import selectNetwork from '../utils/selectNetwork'
  import { network } from '../../stores/network'

  $: showDiablog = $network && $network.id !== mainnet.id
</script>

<dialog class="modal modal-bottom md:modal-middle" class:modal-open={showDiablog}>
  <div class="modal-box">
    <div class="header">
      <h3 class="font-bold text-lg">List of Supported Chains</h3>
      <p>Please, select one of our supported chain:</p>
    </div>

    <ul tabindex="-1">
      {#each chains as chain (chain.id)}
        <li>
          <!-- TODO: support multiple chains -->
          <button disabled={chain.id !== mainnet.id} class="btn btn-ghost" on:click={() => selectNetwork(chain)}>
            <ChainItem value={chain} layout="column" iconSize="large" />
          </button>
        </li>
      {/each}
    </ul>
  </div>
</dialog>

<style lang="postcss">
  .modal-box {
    @apply flex flex-col space-y-4;
  }

  ul {
    @apply grid grid-cols-3 gap-4 w-full flex-1 overflow-auto;
  }

  li {
    @apply w-full;
  }

  button {
    @apply w-full h-auto flex justify-center items-center p-4;
  }
</style>
