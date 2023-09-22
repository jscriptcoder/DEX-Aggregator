<script>
  import TokenSelector from './TokenSelector.svelte';
</script>

<div class="TokenAmount">
  <TokenSelector />
  <input type="number" placeholder="0.0" min="0" step="0.1" />
</div>

<style lang="postcss">
  .TokenAmount {
    @apply flex 
      items-center 
      justify-between 
      outline-none 
      rounded-lg
      hover:shadow-[0_0_0_2px_#6419e6]
      w-full
      p-10;
  }

  input {
    @apply bg-transparent outline-none p-4 flex-1 text-right;
  }
</style>
