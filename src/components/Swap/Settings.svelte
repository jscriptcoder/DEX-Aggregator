<script lang="ts" context="module">
  export type SettingItems = {
    slippage: number
    // TODO: Add more settings...
  }
</script>

<script lang="ts">
  import FaCog from 'svelte-icons/fa/FaCog.svelte'

  export let items: SettingItems = {
    slippage: 0.3,
  }

  let settingsOpen = false

  function openSettings() {
    settingsOpen = true
  }

  function closeSettings() {
    settingsOpen = false
  }
</script>

<div class="Settings">
  <button class="btn-handy" on:click={openSettings} title="Settings">
    <div class="w-5">
      <FaCog />
    </div>
  </button>

  <dialog class="modal modal-bottom md:modal-middle" class:modal-open={settingsOpen}>
    <div class="modal-box space-y-4">
      <div class="header">
        <h1 class="font-bold text-lg">Settings</h1>
        <button class="btn-handy" on:click={closeSettings}>✕</button>
      </div>
      <div class="item">
        <h3 class="font-medium text-base">Slippage tolerance: <span class="font-bold">{items.slippage}%</span></h3>
        <input type="range" min="0" max="3" bind:value={items.slippage} class="range range-primary" step="0.1" />
      </div>
      <div class="item">
        <h3 class="font-medium text-base">TODO: Add more settings...</h3>
      </div>
    </div>
  </dialog>
</div>

<style lang="postcss">
  .header {
    @apply flex justify-between items-center;
  }

  .item {
    @apply space-y-2;
  }
</style>
