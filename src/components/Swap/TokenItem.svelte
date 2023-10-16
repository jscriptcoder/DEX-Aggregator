<script lang="ts">
  import type { Token } from '../../libs/token/types'

  export let value: Token
  export let disabled = false
  export let onSelect: (token: Token) => void
</script>

<li>
  <button {disabled} class="btn btn-ghost" on:click={() => onSelect?.(value)}>
    <div class="avatar h-6 md:h-8">
      {#if value.logoURI}
        <img src={value.logoURI} alt={value.name} />
      {:else}
        <div class="mask mask-hexagon-2">
          <span>{value.name.at(0)}</span>
        </div>
      {/if}
    </div>

    <div class="flex flex-col items-start">
      <span class="capitalize text-xs md:text-sm">{value.name}</span>
      <span class="text-[10px] uppercase">{value.symbol}</span>
    </div>
  </button>
</li>

<style lang="postcss">
  button {
    @apply w-full justify-start flex items-center space-x-2;
  }

  .avatar > div {
    @apply w-full h-full !flex justify-center items-center bg-slate-600;
  }
</style>
