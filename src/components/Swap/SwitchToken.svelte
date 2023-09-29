<script lang="ts">
  import FaExchangeAlt from 'svelte-icons/fa/FaExchangeAlt.svelte';
  import type { Token } from '../../libs/token/types';

  export let tokenFrom: Token;
  export let tokenTo: Token;

  function switchTokens() {
    if (!tokenFrom || !tokenTo) return;
    [tokenFrom, tokenTo] = [tokenTo, tokenFrom];
  }
</script>

<button class="btn dark:btn-neutral btn-circle" on:click={switchTokens}>
  <div class="rotate-90 w-6">
    <FaExchangeAlt />
  </div>
</button>
