<script>
  import { getContext } from 'svelte';
  import { getClient } from '@urql/svelte';
  import { Link } from 'yrv';

  import CartItem from './_CartItem.svelte';
  import { Standard as StandardButton } from '../../../elements/buttons';
  import { LinkButton } from '../../../elements';
  import currentEvent from '../../../store/currentEvent';

  import orderMutations from '../../../dataSources/api.that.tech/orders/mutations';
  import config from '../../../config';

  const stripe = Stripe(config.stripeKey);
  const client = getClient();
  const { state, send } = getContext('cart');

  function handleCheckout() {
    const currentCart = $state.context.cart;
    const lineItems = Object.keys(currentCart).map(i => ({
      productId: i,
      quantity: currentCart[i].qty,
      isBulkPurchase: currentCart[i].isBulkPurchase,
    }));

    //todo.. add some more breadcrumbing and messaging.
    orderMutations(client)
      .createCheckoutSession($state.context.eventId, lineItems)
      .then(session => stripe.redirectToCheckout({ sessionId: session }))
      .then(function (result) {
        // If redirectToCheckout fails due to a browser or network error, you should display the localized error message to your customer using error.message.
        if (result.error) {
          alert(result.error.message);
        }
      })
      .catch(function (error) {
        console.error('Error:', error);
      });
  }

  let orderTotal = 0.0;

  $: if ($state.context.cart) {
    const currentCart = $state.context.cart;
    const lineItems = Object.keys(currentCart);

    orderTotal = lineItems.reduce((acc, curr) => {
      const lineTotal = currentCart[curr].price * currentCart[curr].qty;
      return acc + lineTotal;
    }, 0.0);
  }

  function showBackground(i) {
    const result = i % 2;
    return result != 0;
  }
</script>

<svelte:head>
  <script src="https://js.stripe.com/v3/">
  </script>
</svelte:head>

{#if $state.matches('cart.new')}
  <section class="flex flex-col space-y-8">
    <div class="relative">
      <div class="relative flex justify-start">
        <span class="pr-3 bg-white text-lg font-medium text-gray-900">
          Your cart is currently empty.
        </span>
      </div>
    </div>

    <div class="flex flex-col">
      <div class="relative">
        <LinkButton href="/membership/pricing" text="View Membership Options" />
      </div>
    </div>
  </section>
{:else}
  <section class="flex flex-col space-y-8">
    <div class="relative">
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div class="w-full border-t border-gray-300"></div>
      </div>
      <div class="relative flex justify-start">
        <span class="pr-3 bg-white text-lg font-medium text-gray-900">
          Order Details
        </span>
      </div>
    </div>

    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div
            class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Update</span>
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {#each Object.keys($state.context.cart) as productKey, i (productKey)}
                  <CartItem
                    lineItem="{$state.context.cart[productKey]}"
                    showBackground="{showBackground(i)}"
                    on:cart_remove="{({ detail: { id } }) =>
                      send('REMOVE_ITEM', {
                        id,
                      })}"
                    on:cart_update="{({ detail }) =>
                      send('UPDATE_QUANTITY', {
                        ...detail,
                      })}" />
                {/each}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end">
      <div class="text-md font-medium text-gray-500 uppercase tracking-wider">
        <span class="px-4">Subtotal:</span>
        <span>$<span>{orderTotal.toFixed(2)}</span></span>
      </div>
    </div>

    <div class="flex justify-end">
      {#if $state.matches('verification.verified')}
        <StandardButton on:click="{handleCheckout}">
          Continue to Complete Purchase
        </StandardButton>
      {:else}
        <div
          class="px-8 py-2 rounded-md shadow text-base leading-6 font-medium text-white bg-gray-200 md:text-lg md:px-10">
          Purchase Now
        </div>
      {/if}
    </div>
  </section>
{/if}
