<script lang="ts">
  import '../app.css'
  import '../i18n'

  import { onMount } from 'svelte'
  import Header from '../components/Header'
  import Swap from '../components/Swap'
  import { startWatching } from '../libs/web3/connection'
  import NotificationToast from '../components/NotificationToast'
  import SupportedChainModal from '../components/SupportedChainModal'

  onMount(startWatching)
</script>

<div class="container">
  <Header />
  <main>
    <Swap />
  </main>
</div>

<NotificationToast />

<SupportedChainModal />

<style lang="postcss">
  .container {
    @apply mx-auto h-full md:h-auto flex flex-col;
  }

  main {
    @apply flex justify-center flex-1 m-0 md:mt-12;
  }
</style>
