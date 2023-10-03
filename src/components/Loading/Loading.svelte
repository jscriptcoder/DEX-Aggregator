<script lang="ts">
  export let text: string = ''
  export let size: 'sm' | 'md' = 'md'
  export let layout: 'row' | 'col' = 'col'

  const loaderSize = size === 'sm' ? 'w-8 h-8' : 'w-12 h-12'
  const textPosition = layout === 'row' ? 'flex-row-reverse' : 'flex-col'
</script>

<div class="Loading cover f-center gap-2 {textPosition}">
  <span>{text}</span>
  <span class="loader {loaderSize}" />
</div>

<style lang="postcss">
  .loader {
    border: 5px solid white;
    border-bottom-color: hsl(var(--pf));
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
