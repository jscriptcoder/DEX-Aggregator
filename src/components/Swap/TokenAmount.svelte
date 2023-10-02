<script lang="ts">
  import { formatUnits, parseUnits } from 'viem'
  import type { Token } from '../../libs/token/types'
  import TokenSelector from './TokenSelector.svelte'
  import { debounce } from 'debounce'
  import { inputConfig } from '../../app.config'

  export let token: Token
  export let amount: bigint
  export let readonly = false

  $: value = amount ? formatUnits(amount, token.decimals) : ''
  $: isTokenSelected = Boolean(token)

  function onTokenSelect(_token: Token) {
    token = _token
  }

  function onInput(event: Event) {
    const input = event.target as HTMLInputElement
    const value = input.value
    amount = parseUnits(value, token.decimals)
  }

  const debouncedOnInput = debounce(onInput, inputConfig.debounceWait)
</script>

<div class="TokenAmount">
  <TokenSelector value={token} onSelect={onTokenSelect} />
  <input
    type="number"
    placeholder="0.0"
    min="0"
    step="0.1"
    {value}
    {readonly}
    disabled={!isTokenSelected}
    on:input={debouncedOnInput} />
</div>

<style lang="postcss">
  .TokenAmount {
    @apply flex 
      items-center 
      justify-between 
      outline-none 
      rounded-lg
      bg-gray-50
      dark:bg-gray-900
      hover:shadow-[0_0_0_2px_#6419e6]
      w-full
      gap-4
      p-8;
  }

  input {
    @apply bg-transparent 
      outline-none 
      p-4 
      flex-1 
      text-right
      font-medium
      text-2xl;
  }
</style>
