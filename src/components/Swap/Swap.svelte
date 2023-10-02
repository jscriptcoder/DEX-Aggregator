<script lang="ts">
  import TokenAmount from './TokenAmount.svelte';
  import type { Token } from '../../libs/token/types';
  import SwitchToken from './SwitchToken.svelte';
  import { getPrice } from '../../libs/token/price';

  let tokenFrom: Token;
  let amountFrom: bigint;
  let tokenTo: Token;
  let amountTo: bigint;
  let estimatedGas: bigint;

  $: console.log('Token from:', tokenFrom);
  $: console.log('Amount from:', amountFrom);
  $: console.log('Token to:', tokenTo);
  $: console.log('Amount to:', amountTo);

  $: getPrice({ tokenFrom, tokenTo, amount: amountFrom, chainId: 1 }).then((data) => console.log(data));
</script>

<div class="Swap card">
  <div class="card-body">
    <h2 class="card-title">Swap</h2>
    <p>Trade tokens in an instant</p>

    <div class="space-y-4 flex flex-col items-center my-4">
      <TokenAmount bind:token={tokenFrom} bind:amount={amountFrom} />
      <SwitchToken bind:tokenFrom bind:tokenTo />
      <TokenAmount bind:token={tokenTo} bind:amount={amountTo} readonly />
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
