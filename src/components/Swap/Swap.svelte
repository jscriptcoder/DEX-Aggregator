<script lang="ts">
  import TokenAmount from './TokenAmount.svelte'
  import type { Token } from '../../libs/token/types'
  import SwitchToken from './SwitchToken.svelte'
  import { getPrice } from '../../libs/token/price'
  import { network } from '../../stores/network'
  import { errorToast } from '../NotificationToast'
  import { parseUnits } from 'viem'

  let tokenFrom: Token
  let amountFrom: bigint
  let tokenTo: Token
  let amountTo: bigint
  let estimatedGas: string
  let canTrade: boolean = false

  // TODO: loading state for getting price

  $: console.log('Token from:', tokenFrom)
  $: console.log('Amount from:', amountFrom)
  $: console.log('Token to:', tokenTo)
  $: console.log('Amount to:', amountTo)

  // Only query when we have all the parameters for our endpoint
  $: if (tokenFrom && tokenTo && amountFrom && $network) {
    canTrade = false

    getPrice({
      tokenFrom,
      tokenTo,
      amount: amountFrom,
      chainId: $network.id,
    })
      .then((priceData) => {
        console.log('Price data:', priceData)

        // TODO
        amountTo = parseUnits(priceData.price, tokenTo.decimals)
        estimatedGas = priceData.estimatedGas

        canTrade = true
      })
      .catch((err) => {
        console.error(err)
        errorToast('There was an error fetching the price.')
      })
      .finally(() => {
        // TODO
      })
  }
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
      <button disabled={!estimatedGas} class="btn btn-primary w-full">Trade</button>
    </div>
  </div>
</div>

<style lang="postcss">
  .Swap {
    @apply w-full shadow-xl md:w-[600px] dark:bg-black;
  }
</style>
