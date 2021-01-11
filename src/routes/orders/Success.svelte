<script>
  import { Link } from 'yrv';
  import { useMachine } from 'xstate-svelte';

  import { Standard as StandardButton } from '../../elements/buttons';
  import { debug } from '../../config';
  import { cart } from '../../utilities/cart';

  const { state, send } = useMachine($cart, {
    devTools: debug.xstate,
  });
</script>

<div>
  <p>success</p>

  <div>
    <Link href="/orders/verify">Verify</Link>
  </div>

  <StandardButton
    class="h-3/4"
    on:click="{() => send('ADD_ITEM', { productId: '1234' })}"
  >
    addItem 1
  </StandardButton>

  <StandardButton
    class="h-3/4"
    on:click="{() => send('ADD_ITEM', { productId: '4321', quantity: 2 })}"
  >
    addItem 2
  </StandardButton>

  <StandardButton
    class="h-3/4"
    on:click="{() => send('REMOVE_ITEM', { productId: '4321' })}"
  >
    remove item
  </StandardButton>

  <StandardButton class="h-3/4" on:click="{() => send('CLEAR_CART')}">
    clear storage
  </StandardButton>
</div>
