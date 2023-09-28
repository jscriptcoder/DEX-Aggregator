<script lang="ts">
  import FaExchangeAlt from 'svelte-icons/fa/FaExchangeAlt.svelte';
  import type { Token } from '../../libs/token/types';

  export let tokenFrom: Token;
  export let tokenTo: Token;
</script>

<button class="btn btn-neutral btn-circle">
  <div class="rotate-90 w-6">
    <FaExchangeAlt />
  </div>
</button>
