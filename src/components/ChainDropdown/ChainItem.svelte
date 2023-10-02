<script lang="ts">
  import type { Chain } from 'viem'
  import { chainMetaMap } from '../../libs/web3/chains'

  export let value: Chain

  $: chainIconSrc = value?.id ? chainMetaMap[value.id]?.icon : null
</script>

{#if value?.id}
  <div class="Chain">
    {#if chainIconSrc}
      <div class="avatar">
        <div class="w-6 rounded">
          <img src={chainIconSrc} alt={value.name} />
        </div>
      </div>
    {/if}
    <span class="capitalize">{value.name}</span>
  </div>
{/if}

<style lang="postcss">
  .Chain {
    @apply flex justify-start items-center space-x-2;
  }
</style>
