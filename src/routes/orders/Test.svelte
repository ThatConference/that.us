<script>
  import { Link } from 'yrv';
  import { useMachine } from 'xstate-svelte';

  import { Standard as StandardButton } from '../../elements/buttons';
  import { debug } from '../../config';
  import { cart } from '../../utilities/cart';

  const { send } = useMachine($cart, {
    devTools: debug.xstate,
  });

  const singleAdd = {
    productId: '1234',
    price: 29.99,
    title: 'Attendee Ticket',
    description: 'Feb 1st - THAT Online',
  };

  const qtyAdd = {
    productId: '4321',
    price: 29.99,
    quantity: 5,
    title: 'Super Awesome Ticket',
    description: 'Feb 10st - THAT Online',
  };
</script>

<div>
  <StandardButton class="h-3/4" on:click="{() => send('ADD_ITEM', singleAdd)}">
    addItem 1
  </StandardButton>

  <StandardButton class="h-3/4" on:click="{() => send('ADD_ITEM', qtyAdd)}">
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

  <div>
    <Link href="/orders/summary">Order Summary</Link>
  </div>
</div>
