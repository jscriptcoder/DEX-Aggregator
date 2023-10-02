<script lang="ts">
  export let text: string = ''
</script>

<div class="Loading">
  <span>{text}</span>
  <span class="loader" />
</div>

<style lang="postcss">
  .Loading {
    @apply flex flex-col gap-2 items-center;
  }
  .loader {
    width: 48px;
    height: 48px;
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
