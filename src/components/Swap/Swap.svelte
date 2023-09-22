<script>
  import FaExchangeAlt from 'svelte-icons/fa/FaExchangeAlt.svelte';
  import TokenAmount from './TokenAmount.svelte';
</script>

<div class="card">
  <div class="card-body">
    <h2 class="card-title">Swap</h2>
    <p>Trade tokens in an instant</p>

    <div class="space-y-4 flex flex-col items-center my-4">
      <TokenAmount />

      <button class="btn btn-circle">
        <div class="rotate-90 w-6">
          <FaExchangeAlt />
        </div>
      </button>

      <TokenAmount />
    </div>

    <div class="card-actions">
      <button class="btn btn-primary w-full">Trade</button>
    </div>
  </div>
</div>

<style lang="postcss">
  .card {
    @apply w-full shadow-xl md:w-[600px] dark:bg-black;
  }
</style>
