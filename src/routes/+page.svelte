<script lang="ts">
  import { onMount } from 'svelte';
  import '../app.css';
  import Header from '../components/Header';
  import Swap from '../components/Swap';
  import { startWatching } from '../libs/web3/connection';
  import Notification from '../components/Notification/Notification.svelte';

  onMount(startWatching);
</script>

<div class="container">
  <Header />
  <main>
    <Swap />
  </main>
</div>

<Notification />

<style lang="postcss">
  .container {
    @apply mx-auto h-full;
  }

  main {
    @apply flex justify-center;
  }
</style>
