<script lang="ts">
  import ConnectButton from '../ConnectButton'
  import ChainDropdown from '../ChainDropdown'
  import ThemeButton from './ThemeButton.svelte'
</script>

<header>
  <div class="flex items-center space-x-2">
    <div class="mask mask-squircle">
      <img src="/dex-logo.png" alt="logo" title="DEX Aggregator" />
    </div>
    <h1>
      <span>DEX</span>
      <span class="hidden md:inline">Aggregator</span>
    </h1>
  </div>

  <div class="flex items-center space-x-2">
    <ChainDropdown />
    <ConnectButton />
    <ThemeButton />
  </div>
</header>

<style lang="postcss">
  header {
    @apply flex justify-between items-center p-2 md:px-0 md:py-4;
  }

  h1 {
    @apply text-lg font-medium;
  }
</style>
