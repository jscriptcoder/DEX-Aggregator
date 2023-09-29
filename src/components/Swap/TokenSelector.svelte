<script lang="ts" context="module">
  export type OnTokenSelect = (token: Token) => void;
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import debounce from 'debounce';
  import FaSearch from 'svelte-icons/fa/FaSearch.svelte';
  import fetchTokens from '../../libs/token/fetch';
  import type { Token } from '../../libs/token/types';
  import Loading from '../Loading';
  import { tokenSelectorConfig } from '../../app.config';

  export let onSelect: OnTokenSelect;

  const { maxDisplay, inputWait } = tokenSelectorConfig;

  let modalOpen = false;
  let fetching = false;
  let errorFetching = false;
  let inputElem: HTMLInputElement;

  let tokens: Token[] = [];
  let filteredTokens: Token[] = [];
  let indexTokenMap: Record<string, Token> = {};
  let displayTokens: Token[] = [];

  $: noTokens = displayTokens.length === 0;
  $: isMore = filteredTokens.length > displayTokens.length;

  function openModal() {
    modalOpen = true;
    inputElem.focus();
  }

  function closeModal() {
    modalOpen = false;
  }

  function onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const loweredCaseText = input.value.toLowerCase();

    if (loweredCaseText !== '') {
      filteredTokens = Object.entries(indexTokenMap).reduce((acc, [index, token]) => {
        if (index.includes(loweredCaseText)) {
          acc.push(token);
        }
        return acc;
      }, [] as Token[]);
    } else {
      filteredTokens = tokens;
    }

    displayTokens = filteredTokens.slice(0, maxDisplay);
  }

  const debouncedOnInput = debounce(onInput, inputWait);

  function seeMoreTokens() {
    const displayedBlocks = displayTokens.length / maxDisplay;
    displayTokens = filteredTokens.slice(0, maxDisplay * (displayedBlocks + 1));
  }

  onMount(async () => {
    try {
      fetching = true;
      const responseData = await fetchTokens();
      tokens = filteredTokens = responseData.tokens;

      // Creates a map to quickly look up tokens based
      // on their name, symbol or address, by combining
      // them all into an unique index
      indexTokenMap = tokens.reduce((acc, token) => {
        const name = token.name.toLowerCase();
        const symbol = token.symbol.toLowerCase();
        const address = token.address.toLowerCase();
        const index = `${name}|${symbol}|${address}`;

        acc[index] = token;
        return acc;
      }, {} as Record<string, Token>);

      displayTokens = tokens.slice(0, tokenSelectorConfig.maxDisplay);
    } catch (err) {
      errorFetching = true;
    } finally {
      fetching = false;
    }
  });
</script>

<div class="TokenSelector">
  <button class="btn btn-neutral" on:click={openModal}>Select token</button>

  <dialog class="modal modal-bottom md:modal-middle" class:modal-open={modalOpen}>
    <div class="modal-box">
      <div class="header">
        <div class="w-4">
          <FaSearch />
        </div>
        <input
          bind:this={inputElem}
          placeholder="Search token by name, symbol or address"
          on:input={debouncedOnInput} />
        <button class="btn btn-sm btn-circle btn-ghost" on:click={closeModal}>✕</button>
      </div>

      <div class="token-list">
        {#if fetching}
          <Loading text="Loading tokens…" />
        {:else if noTokens}
          <div class="flex flex-col justify-center items-center w-full space-y-4">
            <span>No tokens founds</span>
            <span>¯\_(ツ)_/¯</span>
          </div>
        {:else}
          <ul>
            {#each displayTokens as token (token.symbol)}
              <li>
                <button class="btn btn-ghost w-full justify-start">
                  <div class="avatar w-[25px]">
                    <img src={token.logoURI} alt={token.name} />
                  </div>
                  <div class="flex flex-col items-start">
                    <span>{token.name}</span>
                    <span class="text-[10px] uppercase">{token.symbol}</span>
                  </div>
                </button>
              </li>
            {/each}

            {#if isMore}
              <button class="btn btn-link no-underline lowercase" on:click={seeMoreTokens}>See more…</button>
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

  input {
    @apply bg-transparent 
      outline-none 
      font-medium
      w-full;
  }

  .token-list {
    @apply flex h-[320px] p-4;
  }

  ul {
    @apply w-full h-full overflow-auto space-y-2;
  }

  li button {
    @apply flex items-center space-x-2;
  }
</style>
