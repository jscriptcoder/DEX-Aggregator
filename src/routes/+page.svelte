<script lang="ts">
  import '../app.css';
  import Header from '../components/Header';
  import Swap from '../components/Swap';
</script>

<div class="container">
  <Header />
  <main>
    <Swap />
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
