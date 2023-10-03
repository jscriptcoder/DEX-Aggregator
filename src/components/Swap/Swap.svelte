<script lang="ts">
  import TokenAmount from './TokenAmount.svelte'
  import type { Token } from '../../libs/token/types'
  import SwitchToken from './SwitchToken.svelte'
  import { getPrice } from '../../libs/token/price'
  import { network } from '../../stores/network'
  import { errorToast, infoToast } from '../NotificationToast'
  import { parseUnits, type Chain, formatUnits } from 'viem'
  import Settings, { type SettingItems } from './Settings.svelte'

  let tokenFrom: Token
  let amountFrom: bigint
  let tokenTo: Token
  let amountTo: bigint
  let estimatedGas: bigint
  let settingItems: SettingItems

  let displayEstimatedGas: string = ''
  let canTrade: boolean = false
  let gettingPrice: boolean = false
  let trading: boolean = false

  $: console.log('Token from:', tokenFrom)
  $: console.log('Amount from:', amountFrom)
  $: console.log('Token to:', tokenTo)
  $: console.log('Amount to:', amountTo)

  async function requestPrice(from?: Token, to?: Token, amount?: bigint, chain?: Chain) {
    // We only want to query the price if all the required data is present
    if (!from || !to || !amount || !chain) return

    canTrade = false
    gettingPrice = true
    displayEstimatedGas = ''
    amountTo = BigInt(0)

    try {
      const priceData = await getPrice({
        sellToken: from.address,
        buyToken: to.address,
        sellAmount: amount.toString(),
        chainId: chain.id.toString(),
      })

      console.log('Price data:', priceData)

      amountTo = parseUnits(priceData.price, tokenTo.decimals)

      // Work out the estimated gas in the chain's native currency
      const { nativeCurrency } = chain
      estimatedGas = BigInt(priceData.estimatedGas)
      displayEstimatedGas = `${formatUnits(estimatedGas, nativeCurrency.decimals)} ${nativeCurrency.symbol}`

      canTrade = true
    } catch (err) {
      console.error(err)
      errorToast('There was an error fetching the price.')
    } finally {
      gettingPrice = false
    }
  }

  async function trade() {
    if (!canTrade) return

    // trading = true
    infoToast('TODO: implement')
  }

  // This function is called everytime one of the dependencies changes
  $: requestPrice(tokenFrom, tokenTo, amountFrom, $network)
</script>

<div class="Swap card">
  <div class="card-body p-4 md:p-8">
    <div class="flex justify-between">
      <h2 class="card-title">Swap</h2>
      <Settings bind:items={settingItems} />
    </div>

    <p>Trade tokens in an instant</p>

    <div class="space-y-4 flex flex-col items-center my-4">
      <TokenAmount bind:token={tokenFrom} bind:amount={amountFrom} disableToken={tokenTo} />

      <SwitchToken bind:tokenFrom bind:tokenTo />

      <TokenAmount
        bind:token={tokenTo}
        bind:amount={amountTo}
        disableToken={tokenFrom}
        loading={gettingPrice}
        readonly />
    </div>

    <div class="text-sm md:text-base">
      Estimated Gas: {displayEstimatedGas ?? '?'}
    </div>

    <div class="card-actions">
      <button disabled={!canTrade} class="btn btn-primary btn-md md:btn-lg w-full" on:click={trade}>Trade</button>
    </div>
  </div>
</div>

<style lang="postcss">
  .Swap {
    @apply w-full md:shadow-xl md:w-[600px] dark:bg-black;
  }
</style>
