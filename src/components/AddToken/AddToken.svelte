<script lang="ts">
  import type { ERC20Token, Token } from '../../libs/token/types'
  import getConnectedWallet from '../../libs/utils/getConnectedWallet'

  export let value: Token

  async function addToken() {
    const { address, symbol, decimals, logoURI } = value as ERC20Token

    const wallet = await getConnectedWallet()

    const success = await wallet.watchAsset({
      type: 'ERC20',
      options: {
        address,
        symbol,
        decimals,
        image: logoURI,
      },
    })

    if (!success) {
      // TODO: inform user that the token was not added
    }
  }
</script>

<div class="tooltip" data-tip="Add token to MetaMask wallet">
  <button on:click={addToken}>
    <img src="/metamask.svg" width="16" alt="Metamask" />
  </button>
</div>

<style lang="postcss">
  .tooltip {
    @apply flex items-center;
  }
</style>
