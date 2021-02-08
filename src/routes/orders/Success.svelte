<script>
  import { getContext, onMount } from 'svelte';

  import { Link } from 'yrv';

  const { send } = getContext('cart');

  onMount(() => {
    send('CLEAR_CART');
  });
</script>

<div>
  <p>success page</p>

  <Link href="/my/settings/order-history">Order History</Link>
</div>
