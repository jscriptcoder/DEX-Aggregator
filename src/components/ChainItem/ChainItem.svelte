<script lang="ts">
  import type { Chain } from 'viem'
  import { chainMetaMap } from '../../libs/web3/chains'

  export let value: Chain
  export let layout: 'row' | 'column' = 'row'
  export let iconSize: 'base' | 'large' = 'base'

  const classes = ['Chain', layout === 'column' ? 'flex-col justify-center' : 'flex-row justify-start'].join(' ')
  const iconSizeClass = ['rounded', iconSize === 'base' ? 'w-6' : 'w-8'].join(' ')

  $: chainIconSrc = value?.id ? chainMetaMap[value.id]?.iconUrl : null
</script>

{#if value?.id}
  <div class={classes}>
    {#if chainIconSrc}
      <div class="avatar">
        <div class={iconSizeClass}>
          <img src={chainIconSrc} alt={value.name} />
        </div>
      </div>
    {/if}
    <span class="capitalize">{value.name}</span>
  </div>
{/if}

<style lang="postcss">
  .Chain {
    @apply flex items-center gap-2;
  }
</style>
