<script lang="ts">
  import FaCog from 'svelte-icons/fa/FaCog.svelte'

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
    <div class="modal-box">
      <div class="header">
        <h2>Settings</h2>
        <button class="btn-handy" on:click={closeSettings}>✕</button>
      </div>
      <div />
    </div>
  </dialog>
</div>

<style lang="postcss">
  .header {
    @apply flex justify-between items-center;
  }
</style>
