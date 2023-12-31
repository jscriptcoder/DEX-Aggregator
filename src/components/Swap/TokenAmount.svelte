<script lang="ts">
  import { formatUnits, parseUnits, type Address, zeroAddress } from 'viem'
  import type { Token } from '../../libs/token/types'
  import TokenSelector from './TokenSelector.svelte'
  import { debounce } from 'debounce'
  import { inputConfig, tokenSelectorConfig } from '../../app.config'
  import { createEventDispatcher, tick } from 'svelte'
  import Loading from '../Loading/Loading.svelte'
  import FaExclamationTriangle from 'svelte-icons/fa/FaExclamationTriangle.svelte'
  import getBalance from '../../libs/token/getBalance'
  import { account } from '../../stores/account'
  import { network } from '../../stores/network'
  import type { FetchBalanceResult } from '@wagmi/core'
  import { truncateString } from '../../libs/utils/truncateString'
  import notifyError from '../utils/notifyError'
  import AddToken from '../AddToken'
  import { t } from 'svelte-i18n'

  export let token: Token | undefined
  export let amount: bigint | undefined
  export let readonly = false
  export let disableToken: Token | undefined
  export let loading = false

  const dispatch = createEventDispatcher<{ error: boolean }>()

  let inputElem: HTMLInputElement
  let insufficientBalance = false
  let tokenBalanceResult: FetchBalanceResult | undefined

  // Computes the value displayed in the input
  $: value = amount && token ? formatUnits(amount, token.decimals) : ''

  // Empties the token balance if unselecting the token
  $: if (!token) tokenBalanceResult = undefined

  // Formats the readable version of the balance
  $: balance = tokenBalanceResult
    ? `${truncateString(tokenBalanceResult.formatted, 8)} ${tokenBalanceResult.symbol}`
    : ''

  // We are dealing with ERC20 tokens if there is address and it's not the zero address
  $: isERC20 = token?.address && token.address !== zeroAddress

  function onTokenSelect(_token: Token) {
    token = _token

    // We need to wait for the DOM to update before focusing the input
    tick().then(() => inputElem.focus())
  }

  async function onInput(event: Event) {
    if (!token || !tokenBalanceResult) return

    const input = event.target as HTMLInputElement
    const value = input.value

    amount = parseUnits(value, token.decimals)
    insufficientBalance = false

    // Do we have enough balance to cover the amount?
    if (amount > tokenBalanceResult.value) {
      insufficientBalance = true
      dispatch('error', true)
    } else {
      dispatch('error', false)
    }
  }

  const debouncedOnInput = debounce(onInput, inputConfig.debounceWait)

  async function fetchBalance(token?: Token, chainId?: number, address?: Address) {
    if (!token || !chainId || !address) return

    try {
      tokenBalanceResult = await getBalance({
        address,
        chainId,
        token: token?.address,
      })
    } catch (err) {
      console.error(err)
      notifyError(err, $t('There was an error fetching the balance'))
    }
  }

  $: fetchBalance(token, $network?.id, $account?.address)
</script>

<div class="TokenAmount" class:error={insufficientBalance}>
  <TokenSelector value={token} onSelect={onTokenSelect} disableValue={disableToken} />
  <div class="flex flex-col relative">
    {#if balance}
      <div class="balance">
        <div class="flex items-center space-x-2">
          {#if isERC20}
            <AddToken value={token} />
          {/if}
          <span>
            <span class="hidden md:inline">{$t('token-amount.balance')}:</span>
            <span>{balance}</span>
          </span>
        </div>
      </div>
    {/if}

    <input
      type="number"
      placeholder="0.0"
      min="0"
      step="0.1"
      {value}
      {readonly}
      disabled={!token}
      on:input={debouncedOnInput}
      bind:this={inputElem} />

    {#if insufficientBalance}
      <div role="alert">
        <div class="w-4 h-4"><FaExclamationTriangle /></div>
        <span>{$t('token-amount.insufficient-balance')}</span>
      </div>
    {/if}
  </div>

  {#if loading}
    <Loading text={$t('token-amount.getting-price')} size="sm" layout="row" />
  {/if}
</div>

<style lang="postcss">
  .balance {
    @apply absolute
      right-0
      text-xs
      top-[-0.75rem]
      md:text-sm
      md:top-[-1rem];
  }

  .TokenAmount {
    @apply relative
      flex
      items-center
      justify-between
      outline-none
      rounded-lg
      w-full
      gap-2
      p-4
      bg-gray-50
      dark:bg-gray-900
      md:gap-4
      md:p-6
      md:hover:shadow-[0_0_0_2px_#6419e6];
  }

  .TokenAmount.error {
    @apply !shadow-[0_0_0_2px_#f87171];
  }

  input {
    @apply bg-transparent
      outline-none
      flex-1
      text-right
      w-full
      p-2
      md:p-4
      md:font-medium
      md:text-2xl;
  }

  [role='alert'] {
    @apply absolute
      flex
      text-xs
      items-center
      space-x-2
      text-red-400
      bottom-[-0.75rem]
      right-0
      md:text-sm
      md:bottom-[-1rem];
  }
</style>
