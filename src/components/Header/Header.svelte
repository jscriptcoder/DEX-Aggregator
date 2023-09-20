<script lang="ts">
  import ConnectButton from '../ConnectButton';
  import ThemeButton from './ThemeButton.svelte';
</script>

<header>
  <div class="flex items-center space-x-2">
    <div class="mask mask-squircle">
      <img src="/dex-logo.png" alt="logo" />
    </div>
    <h1>DEX Aggregator</h1>
  </div>

  <div class="flex items-center space-x-4">
    <ConnectButton />
    <ThemeButton />
  </div>
</header>

<style lang="postcss">
  header {
    @apply flex justify-between items-center py-4;
  }

  h1 {
    @apply text-lg font-medium;
  }
</style>
