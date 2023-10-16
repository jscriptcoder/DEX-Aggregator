<script lang="ts" context="module">
  import { toast } from '@zerodevx/svelte-toast'
  import Item from './Item.svelte'
  import { uid } from '../../libs/utils/uid'
  import type { TypeToast } from './types'

  export function notify(message: string, type: TypeToast = 'unknown', options: SvelteToastOptions = {}) {
    const id = Number(uid())
    const close = () => toast.pop(id)

    toast.push({
      ...options,
      id,
      component: {
        src: Item,
        props: { type, message, close },
      },
    })
  }

  export function successToast(message: string, options?: SvelteToastOptions) {
    notify(message, 'success', options)
  }

  export function errorToast(message: string, options?: SvelteToastOptions) {
    notify(message, 'error', options)
  }

  export function warningToast(message: string, options?: SvelteToastOptions) {
    notify(message, 'warning', options)
  }

  export function infoToast(message: string, options?: SvelteToastOptions) {
    notify(message, 'info', options)
  }
</script>

<script lang="ts">
  import { SvelteToast } from '@zerodevx/svelte-toast'
  import type { SvelteToastOptions } from '@zerodevx/svelte-toast/stores'
  import { notificationConfig } from '../../app.config'

  const options: SvelteToastOptions = {
    duration: notificationConfig.duration.default,
    pausable: false,
  }
</script>

<div class="Notification">
  <SvelteToast {options} />
</div>

<style>
  .Notification {
    --toastContainerRight: auto;
    --toastContainerBottom: auto;
    --toastContainerTop: 77px;
    --toastContainerLeft: calc(50vw - 160px);
    --toastBoxShadow: none;
    --toastWidth: 320px;

    /*
      We need to makes the surroundings dissapear in order
      to fully customize the toast with our own component
    */
    --toastBackground: transparent;
    --toastPadding: 0;
    --toastMsgPadding: 0;
    --toastBarWidth: 0;
    --toastBarHeight: 0;
    --toastBtnWidth: 0;
    --toastBtnHeight: 0;
    --toastBtnContent: '';
  }

  /* sm */
  @media (min-width: 640px) {
    .Notification {
      --toastContainerLeft: auto;
      --toastContainerRight: 1rem;
    }
  }

  /* md */
  @media (min-width: 768px) {
    .Notification {
      --toastContainerRight: 2.5rem;
    }
  }
</style>
