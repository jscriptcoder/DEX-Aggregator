<script lang="ts">
  import '../app.css';
  import SvelteQuery from '../components/SvelteQuery';
  import Header from '../components/Header';
  import Swap from '../components/Swap';
</script>

<div class="container">
  <Header />
  <main>
    <SvelteQuery>
      <Swap />
    </SvelteQuery>
  </main>
</div>

<style lang="postcss">
  .container {
    @apply mx-auto h-full;
  }

  main {
    @apply flex justify-center;
  }
</style>
