<script>
  import { getClient } from '@urql/svelte';
  import { useMachine } from 'xstate-svelte';
  import { Link } from 'yrv';

  import Layout from '../../elements/layouts/ContentLayout.svelte';
  import Steps from './components/_Steps.svelte';

  import orderMutations from '../../dataSources/api.that.tech/orders/mutations';
  import config, { debug } from '../../config';
  import { cart } from '../../utilities/cart';

  const stripe = Stripe(config.stripeKey);
  const client = getClient();

  const { state, send } = useMachine($cart, {
    devTools: debug.xstate,
  });

  function handleCheckout() {
    console.log('handleCheckoutCalled');

    orderMutations(client)
      .createCheckoutSession()
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
</script>

<svelte:head>
  <script src="https://js.stripe.com/v3/">
  </script>
</svelte:head>

<Layout>
  <section>
    <div class="bg-white">
      <div
        class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex lg:justify-between"
      >
        <div>
          <h2
            class="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl"
          >
            Order Summary
          </h2>

          <div class="mt-6">
            <Steps />
          </div>
          <!-- <p class="mt-5 text-xl text-gray-500">
          Start building for free, then add a site plan to go live. Account
          plans unlock additional features.
        </p> -->
        </div>
      </div>
    </div>
  </section>

  <!-- <div><button on:click|preventDefault="{handleCheckout}">Checkout</button></div> -->
</Layout>
