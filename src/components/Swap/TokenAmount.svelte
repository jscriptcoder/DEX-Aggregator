<script lang="ts">
  import { formatUnits, parseUnits } from 'viem'
  import type { Token } from '../../libs/token/types'
  import TokenSelector from './TokenSelector.svelte'
  import { debounce } from 'debounce'
  import { inputConfig } from '../../app.config'
  import { tick } from 'svelte'
  import Loading from '../Loading/Loading.svelte'
  import FaExclamationTriangle from 'svelte-icons/fa/FaExclamationTriangle.svelte'
  import getBalance from '../../libs/token/getBalance'
  import { account } from '../../stores/account'
  import { network } from '../../stores/network'
  import { NoAccountAddressError, NotConnectedError } from '../../libs/error'

  export let token: Token
  export let amount: bigint
  export let readonly = false
  export let disableToken: Token
  export let loading = false

  let inputElem: HTMLInputElement
  let insufficientBalance = false

  $: value = amount ? formatUnits(amount, token.decimals) : ''
  $: isTokenSelected = Boolean(token)

  function onTokenSelect(_token: Token) {
    token = _token

    // We need to wait for the DOM to update before focusing the input
    tick().then(() => inputElem.focus())
  }

  async function onInput(event: Event) {
    const input = event.target as HTMLInputElement
    const value = input.value

    amount = parseUnits(value, token.decimals)
    insufficientBalance = false

    // Do we have enough balance to cover the amount?
    try {
      const balanceResult = await getBalance({
        token: token.address,
        address: $account.address,
        chainId: $network?.id,
      })

      if (amount > balanceResult.value) {
        insufficientBalance = true
      }
    } catch (err) {
      console.error(err)

      switch (true) {
        case err instanceof NotConnectedError:
          // TODO
          break
        case err instanceof NoAccountAddressError:
          // TODO
          break
        default:
        // TODO
      }
    }
  }

  const debouncedOnInput = debounce(onInput, inputConfig.debounceWait)
</script>

<div class="TokenAmount">
  <TokenSelector value={token} onSelect={onTokenSelect} disableValue={disableToken} />
  <div class="flex flex-col relative">
    <input
      type="number"
      placeholder="0.0"
      min="0"
      step="0.1"
      {value}
      {readonly}
      disabled={!isTokenSelected}
      on:input={debouncedOnInput}
      bind:this={inputElem} />

    {#if insufficientBalance}
      <div role="alert">
        <div class="w-4 h-4"><FaExclamationTriangle /></div>
        <span>Insifficient balance</span>
      </div>
    {/if}
  </div>

  {#if loading}
    <Loading text="Getting price…" size="sm" layout="row" />
  {/if}
</div>

<style lang="postcss">
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
      items-center 
      space-x-2 
      text-red-400 
      bottom-[-1rem] 
      right-0;
  }
</style>
