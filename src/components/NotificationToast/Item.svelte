<script lang="ts">
  import type { TypeToast } from './types'
  import FaCheckCircle from 'svelte-icons/fa/FaCheckCircle.svelte'
  import FaInfoCircle from 'svelte-icons/fa/FaInfoCircle.svelte'
  import FaTimesCircle from 'svelte-icons/fa/FaTimesCircle.svelte'
  import FaExclamationCircle from 'svelte-icons/fa/FaExclamationCircle.svelte'
  import type { SvelteComponent } from 'svelte'
  import classNames from '../../libs/utils/classNames'

  export let type: TypeToast = 'unknown'
  export let message = ''
  export let close = () => {}

  const iconTypeMap: Record<TypeToast, typeof SvelteComponent | null> = {
    success: FaCheckCircle,
    error: FaTimesCircle,
    warning: FaExclamationCircle,
    info: FaInfoCircle,
    unknown: null,
  }

  // Remember: we cannot do string interpolation with tw classes
  // as tailwind compiler won't be able find those classes.
  const alertClassMap: Record<TypeToast, string> = {
    success: 'alert-success',
    error: 'alert-error',
    warning: 'alert-warning',
    info: 'alert-info',
    unknown: 'alert-uknown',
  }

  const icon = iconTypeMap[type]
  const alertClasses = classNames('alert flex justify-between', alertClassMap[type])
</script>

<div role="alert" class={alertClasses}>
  <div class="flex items-center space-x-2">
    {#if icon}
      <div class="w-5">
        <svelte:component this={icon} />
      </div>
    {/if}
    <span class="flex-1">{@html message}</span>
  </div>
  <button on:click={close}>✕</button>
</div>
