<script lang="ts">
  import FaSun from 'svelte-icons/fa/FaSun.svelte';
  import FaMoon from 'svelte-icons/fa/FaMoon.svelte';
  import { onMount } from 'svelte';

  type Theme = 'dark' | 'light';

  let theme: Theme = 'dark';

  $: isDarkTheme = theme === 'dark';

  function toggleTheme() {
    theme = isDarkTheme ? 'light' : 'dark';

    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }

  onMount(() => {
    const localTheme = localStorage.getItem('theme');
    if (!localTheme || !['light', 'dark'].includes(localTheme)) {
      theme = 'dark';
    } else {
      theme = localTheme as Theme;
    }
  });
</script>

<button class="w-8" on:click={toggleTheme}>
  {#if isDarkTheme}
    <FaSun />
  {:else}
    <FaMoon />
  {/if}
</button>
