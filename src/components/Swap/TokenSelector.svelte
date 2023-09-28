<script lang="ts" context="module">
  export type OnTokenSelect = (token: Token) => void;
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import FaSearch from 'svelte-icons/fa/FaSearch.svelte';
  import fetchTokens from '../../libs/token/fetch';
  import type { Token } from '../../libs/token/types';
  import Loading from '../Loading';

  export let onSelect: OnTokenSelect;

  let modalOpen = false;
  let fetching = false;
  let errorFetching = false;
  let tokens: Token[] = [];
  let inputElem: HTMLInputElement;

  function openModal() {
    modalOpen = true;
    inputElem.focus();
  }

  function closeModal() {
    modalOpen = false;
  }

  onMount(async () => {
    try {
      fetching = true;
      const responseData = await fetchTokens();
      tokens = responseData.tokens;
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
        <input bind:this={inputElem} placeholder="Search token by name, symbol or address" />
        <button on:click={closeModal}>✕</button>
      </div>

      <div class="token-list">
        <Loading text="Loading tokens…" />
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
    @apply flex justify-center;
  }
</style>
