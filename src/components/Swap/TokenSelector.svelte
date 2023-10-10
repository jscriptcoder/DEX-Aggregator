<script lang="ts" context="module">
  export type OnTokenSelect = (token: Token) => void
</script>

<script lang="ts">
  import { onMount } from 'svelte'
  import debounce from 'debounce'
  import FaSearch from 'svelte-icons/fa/FaSearch.svelte'
  import fetchAllTokens from '../../libs/token/fetchAllTokens'
  import type { Token } from '../../libs/token/types'
  import Loading from '../Loading'
  import { etherToken, inputConfig, tokenSelectorConfig } from '../../app.config'
  import { mainnet } from 'viem/chains'

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

  onMount(async () => {
    try {
      fetching = true
      const responseData = await fetchAllTokens()

      tokens = filteredTokens = responseData.tokens

      // We want to add ETH in our list of tokens as the first token
      tokens.unshift({
        ...etherToken,
        chainId: mainnet.id, // TODO: other chains?
      })

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
  })
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
      <span class="token-label capitalize">Select token</span>
    {/if}
  </button>

  <dialog class="modal modal-bottom md:modal-middle" class:modal-open={modalOpen}>
    <div class="modal-box">
      <div class="header">
        <div class="w-5">
          <FaSearch />
        </div>
        <input
          bind:this={inputElem}
          placeholder="Search token by name, symbol or address"
          on:input={debouncedOnInput} />
        <button class="btn-handy" on:click={closeModal}>✕</button>
      </div>

      <div class="token-list">
        {#if fetching}
          <Loading text="Loading tokens…" />
        {:else if noTokens}
          <div class="f-center flex-col w-full space-y-4">
            <span>No tokens founds</span>
            <span>¯\_(ツ)_/¯</span>
          </div>
        {:else}
          <ul class="w-full h-full overflow-auto space-y-2">
            {#each displayTokens as token (token.address)}
              <li>
                <button
                  disabled={token.address === disableValue?.address}
                  class="btn btn-ghost w-full justify-start flex items-center space-x-2"
                  on:click={() => selectToken(token)}>
                  <div class="avatar w-6">
                    <img src={token.logoURI} alt={token.name} />
                  </div>
                  <div class="flex flex-col items-start">
                    <span class="capitalize">{token.name}</span>
                    <span class="text-[10px] uppercase">{token.symbol}</span>
                  </div>
                </button>
              </li>
            {/each}

            {#if isMore}
              <button class="btn btn-link no-underline capitalize" on:click={seeMoreTokens}>See more…</button>
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
