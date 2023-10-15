<script lang="ts" context="module">
  export type OnTokenSelect = (token: Token) => void
</script>

<script lang="ts">
  import debounce from 'debounce'
  import FaSearch from 'svelte-icons/fa/FaSearch.svelte'
  import fetchAllTokens from '../../libs/token/fetchAllTokens'
  import type { Token } from '../../libs/token/types'
  import Loading from '../Loading'
  import { tokenLogo, inputConfig, tokenSelectorConfig } from '../../app.config'
  import { network } from '../../stores/network'
  import TokenItem from './TokenItem.svelte'
  import type { Chain } from 'viem'
  import { t } from 'svelte-i18n'

  export let value: Token
  export let onSelect: OnTokenSelect
  export let disableValue: Token // TODO: prop drilling. Store?

  const { maxDisplay } = tokenSelectorConfig

  let modalOpen = false
  let fetching = false
  let errorFetching = false
  let inputElem: HTMLInputElement

  let tokens: Token[] = [] // contains all the tokens
  let filteredTokens: Token[] = [] // keeps track of the filtered tokens
  let displayTokens: Token[] = [] // contains only the tokens to be rendered
  let indexTokenMap: Record<string, Token> = {} // used for quick tokens look up

  $: noTokens = displayTokens.length === 0
  $: isMore = filteredTokens.length > displayTokens.length

  function openModal() {
    modalOpen = true
    inputElem.focus()
  }

  function closeModal() {
    modalOpen = false
  }

  function onInput(event: Event) {
    const input = event.target as HTMLInputElement
    const loweredCaseText = input.value.toLowerCase()

    if (loweredCaseText !== '') {
      filteredTokens = Object.entries(indexTokenMap).reduce((acc, [index, token]) => {
        if (index.includes(loweredCaseText)) {
          acc.push(token)
        }
        return acc
      }, [] as Token[])
    } else {
      filteredTokens = tokens
    }

    displayTokens = filteredTokens.slice(0, maxDisplay)
  }

  const debouncedOnInput = debounce(onInput, inputConfig.debounceWait)

  function seeMoreTokens() {
    const displayedBlocks = displayTokens.length / maxDisplay

    // We want to display a new block: current blocks + 1
    displayTokens = filteredTokens.slice(0, maxDisplay * (displayedBlocks + 1))
  }

  function selectToken(token: Token) {
    onSelect(token)
    closeModal()
  }

  async function fetchTokens(chain?: Chain) {
    try {
      fetching = true
      const responseData = await fetchAllTokens()

      // If we are connected to a chan, we only want to display the tokens
      // that are available on that chain
      tokens = filteredTokens = chain
        ? responseData.tokens.filter((token) => token.chainId === chain.id)
        : responseData.tokens

      if (chain) {
        // We want to add the native currency to the list as the first token
        const { nativeCurrency } = chain
        tokens.unshift({
          ...nativeCurrency,
          chainId: chain.id,
          logoURI: tokenLogo[nativeCurrency.symbol],
        })
      }

      // Creates a map to quickly look up tokens based
      // on their name, symbol or address, by combining
      // them all into an unique index
      indexTokenMap = tokens.reduce((acc, token) => {
        const name = token.name.toLowerCase()
        const symbol = token.symbol.toLowerCase()
        const address = token?.address?.toLowerCase()
        const index = `${name}|${symbol}|${address}`

        acc[index] = token
        return acc
      }, {} as Record<string, Token>)

      displayTokens = tokens.slice(0, tokenSelectorConfig.maxDisplay)
    } catch (err) {
      errorFetching = true
    } finally {
      fetching = false
    }
  }

  // We want to fetch the tokens supported by the current network. Currently
  // we only have one source, but we might add more in the future that depends
  // on the network, otherwise we can run this logic when the component is mounted
  $: fetchTokens($network)
</script>

<div class="TokenSelector">
  <button class="btn dark:btn-neutral btn-sm md:btn-md md:min-w-[140px]" on:click={openModal}>
    {#if value}
      <div class="flex items-center space-x-2">
        <div class="avatar w-6">
          <img src={value.logoURI} alt={value.name} />
        </div>
        <span class="token-label">{value.symbol}</span>
      </div>
    {:else}
      <span class="token-label capitalize">
        <span class="hidden md:inline">{$t('token-selector.select')}</span>
        <span>{$t('token-selector.token')}</span>
      </span>
    {/if}
  </button>

  <dialog class="modal modal-bottom md:modal-middle" class:modal-open={modalOpen}>
    <div class="modal-box">
      <div class="header">
        <div class="w-5">
          <FaSearch />
        </div>
        <input bind:this={inputElem} placeholder={$t('token-selector.search')} on:input={debouncedOnInput} />
        <button class="btn-handy" on:click={closeModal}>✕</button>
      </div>

      <div class="token-list">
        {#if fetching}
          <Loading text={$t('token-selector.loading')} />
        {:else if noTokens}
          <div class="f-center flex-col w-full space-y-4">
            <span>
              {$t('token-selector.no-tokens', { values: { chain: $network?.name } })}
            </span>
            <span>¯\_(ツ)_/¯</span>
          </div>
        {:else}
          <ul class="w-full h-full overflow-auto space-y-2">
            {#each displayTokens as token (token.address)}
              <TokenItem value={token} onSelect={selectToken} disabled={token.symbol === disableValue?.symbol} />
            {/each}

            {#if isMore}
              <button class="btn btn-link no-underline capitalize" on:click={seeMoreTokens}>
                {$t('token-selector.see-more')}
              </button>
            {/if}
          </ul>
        {/if}
      </div>
    </div>
  </dialog>
</div>

<style lang="postcss">
  .header {
    @apply flex 
      items-center 
      justify-between 
      gap-2;
  }

  .token-label {
    @apply text-xs md:text-base;
  }

  input {
    @apply bg-transparent 
      outline-none 
      font-medium
      w-full;
  }

  .token-list {
    @apply relative flex h-[320px] p-4;
  }
</style>
