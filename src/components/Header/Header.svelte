<script lang="ts">
  import ConnectButton from '../ConnectButton';
  import ThemeButton from './ThemeButton.svelte';
</script>

<header>
  <h1>DEX Aggregator</h1>
  <div class="flex items-center space-x-4">
    <ConnectButton />
    <ThemeButton />
  </div>
</header>

<style lang="postcss">
  header {
    @apply flex justify-between items-center py-4;
  }
</style>
