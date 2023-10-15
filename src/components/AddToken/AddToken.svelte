<script lang="ts">
  import type { ERC20Token, Token } from '../../libs/token/types'
  import getConnectedWallet from '../../libs/utils/getConnectedWallet'
  import { errorToast, successToast } from '../NotificationToast'
  import notifyError from '../utils/notifyError'
  import { t } from 'svelte-i18n'

  export let value: Token

  async function addToken() {
    const { address, symbol, decimals, logoURI } = value as ERC20Token

    try {
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

      if (success) {
        successToast($t('Token added to your wallet'))
      } else {
        errorToast($t('Failed to add token to your wallet'))
      }
    } catch (err) {
      console.error(err)
      notifyError(err, $t('Failed to add token to your wallet'))
    }
  }
</script>

<div class="tooltip" data-tip={$t('Add token to MetaMask wallet')}>
  <button on:click={addToken}>
    <img src="/metamask.svg" width="16" alt="Metamask" />
  </button>
</div>

<style lang="postcss">
  .tooltip {
    @apply flex items-center;
  }
</style>
