<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { web3modal } from '../../libs/web3/walletConnect'

  let web3modalOpen = false
  let unsubscribeWeb3Modal = () => {}

  // Show balance only for desktop or larger screens
  const mediaQuery = window.matchMedia('(min-width: 768px)')
  let balance = mediaQuery.matches ? 'show' : 'hide'

  function onWeb3Modal(state: { open: boolean }) {
    web3modalOpen = state.open
  }

  function mediaQueryHandler(event: MediaQueryListEvent) {
    balance = event.matches ? 'show' : 'hide'
  }

  onMount(() => {
    mediaQuery.addEventListener('change', mediaQueryHandler)
    unsubscribeWeb3Modal = web3modal.subscribeModal(onWeb3Modal)
  })

  onDestroy(() => {
    mediaQuery.removeEventListener('change', mediaQueryHandler)
    unsubscribeWeb3Modal()
  })
</script>

<w3m-core-button {balance} />
