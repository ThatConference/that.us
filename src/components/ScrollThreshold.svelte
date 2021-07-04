<script>
  let outerWidth;
  export let scrollThreshold = 1200;
  $: scrollThreshold = outerWidth > 768 ? 1200 : 2500;
</script>

<svelte:window bind:outerWidth />
