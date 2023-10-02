<script lang="ts">
  import { formatUnits, parseUnits } from 'viem'
  import type { Token } from '../../libs/token/types'
  import TokenSelector from './TokenSelector.svelte'
  import { debounce } from 'debounce'
  import { inputConfig } from '../../app.config'
  import { tick } from 'svelte'

  export let token: Token
  export let amount: bigint
  export let readonly = false
  export let disableToken: Token

  let inputElem: HTMLInputElement

  $: value = amount ? formatUnits(amount, token.decimals) : ''
  $: isTokenSelected = Boolean(token)

  function onTokenSelect(_token: Token) {
    token = _token

    // We need to wait for the DOM to update before focusing the input
    tick().then(() => inputElem.focus())
  }

  function onInput(event: Event) {
    const input = event.target as HTMLInputElement
    const value = input.value

    amount = parseUnits(value, token.decimals)
  }

  const debouncedOnInput = debounce(onInput, inputConfig.debounceWait)
</script>

<div class="TokenAmount">
  <TokenSelector value={token} onSelect={onTokenSelect} disableValue={disableToken} />
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
</div>

<style lang="postcss">
  .TokenAmount {
    @apply flex 
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
</style>
