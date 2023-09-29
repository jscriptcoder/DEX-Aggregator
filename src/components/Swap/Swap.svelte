<script lang="ts">
  import TokenAmount from './TokenAmount.svelte';
  import type { Token } from '../../libs/token/types';
  import SwitchToken from './SwitchToken.svelte';

  let tokenFrom: Token;
  let tokenTo: Token;
  let estimatedGas: bigint;
</script>

<div class="Swap card">
  <div class="card-body">
    <h2 class="card-title">Swap</h2>
    <p>Trade tokens in an instant</p>

    <div class="space-y-4 flex flex-col items-center my-4">
      <TokenAmount bind:token={tokenFrom} />
      <SwitchToken bind:tokenFrom bind:tokenTo />
      <TokenAmount bind:token={tokenTo} />
    </div>

    <div>
      Estimated Gas: {estimatedGas ?? '?'}
    </div>

    <div class="card-actions">
      <button disabled class="btn btn-primary w-full">Trade</button>
    </div>
  </div>
</div>

<style lang="postcss">
  .Swap {
    @apply w-full shadow-xl md:w-[600px] dark:bg-black;
  }
</style>
