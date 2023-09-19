<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { web3modal } from '../../libs/web3/walletConnect';

  let web3modalOpen = false;
  let unsubscribeWeb3Modal = () => {};

  function onWeb3Modal(state: { open: boolean }) {
    web3modalOpen = state.open;
  }

  onMount(() => {
    unsubscribeWeb3Modal = web3modal.subscribeModal(onWeb3Modal);
  });

  onDestroy(unsubscribeWeb3Modal);
</script>

<w3m-core-button balance="show" />
