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

<label class="swap swap-rotate">
  <input type="checkbox" checked={isDarkTheme} on:click={toggleTheme} />

  <div class="swap-on h-5 w-5">
    <FaSun />
  </div>

  <div class="swap-off h-5 w-5">
    <FaMoon />
  </div>
</label>
