<script>
  import { chains } from '../../libs/web3/chains'
  import ChainItem from '../ChainItem'
  import selectNetwork from '../utils/selectNetwork'
  import { network } from '../../stores/network'
  import { isChainSupported } from '../../libs/web3/wagmi'
  import { t } from 'svelte-i18n'

  $: showDiablog = $network ? !isChainSupported($network.id) : false
</script>

<dialog class="modal modal-bottom md:modal-middle" class:modal-open={showDiablog}>
  <div class="modal-box">
    <div class="header">
      <h3 class="font-bold text-lg">{$t('supported-chains.title')}</h3>
      <p>{$t('supported-chains.subtitle')}:</p>
    </div>

    <ul tabindex="-1">
      {#each chains as chain (chain.id)}
        <li>
          <!-- TODO: support multiple chains -->
          <button class="btn btn-ghost" on:click={() => selectNetwork(chain)}>
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
