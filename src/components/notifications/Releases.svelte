<script>
  import { dialog } from 'dialogic-svelte';
  import { navigateTo } from 'yrv';
</script>

<!-- DialogView.svelte -->
<div class="dialog">
  <div
    class="dialog-background"
    on:click="{() => dialog.hide() && navigateTo('/changelog-missed')}"
  ></div>
  <div class="dialog-content">
    <h3>{$$props.title}</h3>
    <div>Dialog content</div>
  </div>
</div>
