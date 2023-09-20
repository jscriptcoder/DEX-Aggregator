<script>
  import TokenSelector from './TokenSelector.svelte';
</script>

<div class="card w-96 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">Swap</h2>
    <p>Trade tokens in an instant</p>

    <div>
      <TokenSelector />

      <TokenSelector />
    </div>

    <div class="card-actions">
      <button class="btn btn-primary">Trade</button>
    </div>
  </div>
</div>
