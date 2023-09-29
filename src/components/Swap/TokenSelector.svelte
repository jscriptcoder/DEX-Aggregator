<script lang="ts" context="module">
  export type OnTokenSelect = (token: Token) => void;
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import debounce from 'debounce';
  import FaSearch from 'svelte-icons/fa/FaSearch.svelte';
  import FaExclamationTriangle from 'svelte-icons/fa/FaExclamationTriangle.svelte';
  import fetchTokens from '../../libs/token/fetch';
  import type { Token } from '../../libs/token/types';
  import Loading from '../Loading';

  export let onSelect: OnTokenSelect;

  let modalOpen = false;
  let fetching = false;
  let errorFetching = false;
  let inputElem: HTMLInputElement;

  let tokens: Token[] = [];
  let indexTokenMap: Record<string, Token> = {};
  let displayTokens: Token[] = [];

  $: noTokens = displayTokens.length === 0;

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

    displayTokens = Object.entries(indexTokenMap)
      .reduce((acc, [index, token]) => {
        if (index.includes(loweredCaseText)) {
          acc.push(token);
        }
        return acc;
      }, [] as Token[])
      .slice(0, 12);
  }

  const debouncedOnInput = debounce(onInput, 300);

  onMount(async () => {
    try {
      fetching = true;
      const responseData = await fetchTokens();
      tokens = responseData.tokens;

      indexTokenMap = tokens.reduce((acc, token) => {
        const name = token.name.toLowerCase();
        const symbol = token.symbol.toLowerCase();
        const address = token.address.toLowerCase();
        const index = `${name}|${symbol}|${address}`;

        acc[index] = token;
        return acc;
      }, {} as Record<string, Token>);

      displayTokens = tokens.slice(0, 12);
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
          <ul class="menu w-full">
            {#each displayTokens as token}
              <li>
                <button>
                  <div class="avatar">
                    <img src={token.logoURI} alt={token.name} />
                  </div>
                  <div class="flex flex-col">
                    <span class="font-medium">{token.name}</span>
                    <span class="text-xs uppercase">{token.symbol}</span>
                  </div>
                </button>
              </li>
            {/each}
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
</style>
