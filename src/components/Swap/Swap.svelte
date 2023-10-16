<script lang="ts">
  import TokenAmount from './TokenAmount.svelte'
  import type { Token } from '../../libs/token/types'
  import SwitchToken from './SwitchToken.svelte'
  import { network } from '../../stores/network'
  import { type Chain, formatUnits } from 'viem'
  import Settings, { type SettingItems } from './Settings.svelte'
  import { getPrice, getQuote } from '../../libs/api/0x'
  import approveAllowance from '../../libs/token/approveAllowance'
  import { account } from '../../stores/account'
  import Loading from '../Loading/Loading.svelte'
  import notifyError from '../utils/notifyError'
  import getConnectedWallet from '../../libs/utils/getConnectedWallet'
  import { errorToast, successToast } from '../NotificationToast'
  import type { GetPriceArgs, GetQuoteArgs } from '../../libs/api/types'
  import { waitForTransaction } from '@wagmi/core'
  import { t } from 'svelte-i18n'
  import { notificationConfig } from '../../app.config'

  let tokenFrom: Token | undefined
  let amountFrom: bigint | undefined
  let tokenTo: Token | undefined
  let amountTo: bigint | undefined
  let estimatedGas: bigint | undefined
  let settingItems: SettingItems

  let displayEstimatedGas: string = ''
  let hasPrice: boolean = false
  let hasError: boolean = false
  let gettingPrice: boolean = false
  let trading: boolean = false

  $: console.log('Token from:', tokenFrom)
  $: console.log('Amount from:', amountFrom)
  $: console.log('Token to:', tokenTo)
  $: console.log('Amount to:', amountTo)

  $: canTrade = hasPrice && !hasError && !gettingPrice && !trading

  async function requestPrice(from?: Token, to?: Token, amount?: bigint, chain?: Chain) {
    // We only want to query the price if all the required data is present
    if (!from || !to || !amount || !chain) return

    hasPrice = false
    gettingPrice = true
    displayEstimatedGas = ''
    amountTo = BigInt(0)

    try {
      const priceArgs: GetPriceArgs = {
        chain,
        sellToken: from.address,
        buyToken: to.address,
        sellAmount: amount.toString(),
        takerAddress: $account?.address,
      }

      console.log('Price arguments:', priceArgs)

      const priceData = await getPrice(priceArgs)

      console.log('Price data:', priceData)

      amountTo = BigInt(priceData.buyAmount)

      // Work out the estimated gas in the chain's native currency
      const { nativeCurrency } = chain
      estimatedGas = BigInt(priceData.estimatedGas)
      displayEstimatedGas = `${formatUnits(estimatedGas, nativeCurrency.decimals)} ${nativeCurrency.symbol}`

      hasPrice = true
    } catch (err) {
      console.error(err)
      notifyError(err, $t('swap.error.price'))
    } finally {
      gettingPrice = false
    }
  }

  function clearSwap() {
    // Reset the state
    tokenFrom = undefined
    amountFrom = undefined
    tokenTo = undefined
    amountTo = undefined
    estimatedGas = undefined
    displayEstimatedGas = ''
    hasPrice = false
    hasError = false
    gettingPrice = false
    trading = false
  }

  async function trade() {
    if (!tokenFrom || !amountFrom || !tokenTo || !amountTo || !$network || !$account || !$account.address || !canTrade)
      return

    trading = true

    try {
      // Step 1: Get a quote from 0x API
      const quoteArgs: GetQuoteArgs = {
        chain: $network,
        sellToken: tokenFrom.address,
        buyToken: tokenTo.address,
        sellAmount: amountTo.toString(),
        takerAddress: $account.address,
        slippagePercentage: settingItems.slippage.toString(),
      }

      console.log('Quote arguments:', quoteArgs)

      const quotaData = await getQuote(quoteArgs)

      console.log('Quote data:', quotaData)

      // Step 2: If token has address then it's an ERC20 token,
      // so we need to approve the 0x contract as the spender
      if (tokenFrom.address) {
        const approveArgs = {
          account: $account.address,
          address: tokenFrom.address,
          spender: quotaData.allowanceTarget, // contains the address of the 0x contract
          amount: amountFrom,
          chainId: $network.id,
        }

        console.log('Approve arguments:', approveArgs)

        // Approve the 0x contract to spend the token
        const approveTxHash = await approveAllowance(approveArgs)

        console.log('Approve tx hash:', approveTxHash)
      }

      const wallet = await getConnectedWallet($network.id)

      // Step 3: Send the trading transaction to the chain
      const txArgs = {
        to: quotaData.to,
        data: quotaData.data,
        gas: BigInt(quotaData.gas),
        gasPrice: BigInt(quotaData.gasPrice),
        value: BigInt(quotaData.value),
      }

      console.log('Tx arguments:', txArgs)

      const swapTxHash = await wallet.sendTransaction(txArgs)

      console.log('Swap tx hash:', swapTxHash)

      // =========================================== //

      const explorer = $network.blockExplorers?.default.url
      const txUrl = `${explorer}/tx/${swapTxHash}`

      const withLinkDuration = { duration: notificationConfig.duration.withLinks }
      const withLinkValues = { values: { txUrl } }

      const from = tokenFrom.symbol
      const to = tokenTo.symbol

      successToast($t('swap.ongoing', withLinkValues), withLinkDuration)

      // Step 4: Let's wait for the transaction to be mined,
      // and find out if it was successful or not. We don't need
      // to block the execution here. The user should still be able
      // to swap other tokens while we wait for the tx receipt
      waitForTransaction({ hash: swapTxHash, chainId: $network.id })
        .then((receipt) => {
          console.log('Swap tx receipt:', receipt)

          switch (true) {
            case receipt.status === 'success':
              successToast($t('swap.success', { values: { from, to } }))
              break
            case receipt.status === 'reverted':
              errorToast($t('swap.reverted', withLinkValues), withLinkDuration)
              break
          }
        })
        .catch((err) => {
          console.error(err)
          // TODO: There seems to be a bug in Viem when the transaction is
          // reverted, throwing an exception internally:
          // <code>
          //   const reason = hexToString3(`0x${code.substring(138)}`) // "code" is an object
          // </code>
          errorToast($t('swap.reverted', withLinkValues), withLinkDuration)
        })

      // Step 5: Clear the form
      clearSwap()
    } catch (err) {
      console.error(err)
      notifyError(err, $t('swap.error.trading'))
    } finally {
      trading = false
    }
  }

  function onTokenError(event: CustomEvent<boolean>) {
    hasError = event.detail
  }

  // This function is called everytime one of the dependencies changes
  $: requestPrice(tokenFrom, tokenTo, amountFrom, $network)
</script>

<div class="Swap card">
  <div class="card-body p-4 md:p-8">
    <div class="header">
      <div class="flex justify-between">
        <h2 class="card-title">{$t('swap.title')}</h2>
        <Settings bind:items={settingItems} />
      </div>
      <p>{$t('swap.subtitle')}</p>
    </div>

    <div class="body flex flex-col flex-1 md:flex-none justify-between">
      <div class="space-y-2 md:space-y-4 flex flex-col items-center my-4">
        <TokenAmount bind:token={tokenFrom} bind:amount={amountFrom} on:error={onTokenError} disableToken={tokenTo} />

        <SwitchToken bind:tokenFrom bind:tokenTo />

        <TokenAmount
          bind:token={tokenTo}
          bind:amount={amountTo}
          on:error={onTokenError}
          disableToken={tokenFrom}
          loading={gettingPrice}
          readonly />
      </div>

      <div class="space-y-2 md:space-y-4">
        <div class="text-sm md:text-base">
          {$t('swap.estimate-gas')}: <span class="font-bold">{displayEstimatedGas ?? '?'}</span>
        </div>
        <button disabled={!canTrade} class="btn btn-primary btn-md w-full relative md:btn-lg" on:click={trade}>
          {#if trading}
            <Loading text={$t('swap.trading')} size="sm" layout="row" />
          {:else}
            {$t('swap.trade')}
          {/if}
        </button>
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  .Swap {
    @apply w-full rounded-none md:rounded-2xl md:shadow-xl md:w-[600px] dark:bg-black;
  }
</style>
