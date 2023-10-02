<script lang="ts">
  import FaSun from 'svelte-icons/fa/FaSun.svelte'
  import FaMoon from 'svelte-icons/fa/FaMoon.svelte'
  import { onMount } from 'svelte'
  import { web3modal } from '../../libs/web3/walletConnect'

  let theme: Theme = 'dark'

  $: isDarkTheme = theme === 'dark'

  function toggleTheme() {
    theme = isDarkTheme ? 'light' : 'dark'

    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)

    web3modal.setTheme({ themeMode: theme })
  }

  onMount(() => {
    const localTheme = localStorage.getItem('theme')
    if (!localTheme || !['light', 'dark'].includes(localTheme)) {
      theme = 'dark'
    } else {
      theme = localTheme as Theme
    }
  })
</script>

<button class="md:btn md:btn-sm" on:click={toggleTheme} title="Toggle theme">
  <div class="h-4 w-4">
    {#if isDarkTheme}
      <FaSun />
    {:else}
      <FaMoon />
    {/if}
  </div>
</button>
