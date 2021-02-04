<script>
  import { getContext, onMount } from 'svelte';

  const { send } = getContext('cart');

  onMount(() => {
    send('CLEAR_CART');
  });
</script>

<div>
  <p>success page</p>
</div>
