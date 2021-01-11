<script>
  import { getClient } from '@urql/svelte';
  import { Link } from 'yrv';

  import orderMutations from '../../dataSources/api.that.tech/orders/mutations';
  import config from '../../config';

  import { cart } from '../../utilities/cart';

  const stripe = Stripe(config.stripeKey);
  const client = getClient();

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

<section>
  <div class="product">
    <div class="description">
      <h3>Fake Product</h3>
      <h5>$20.00</h5>
    </div>
  </div>

  <div>
    <Link href="/orders/success">Success</Link>
  </div>

  <button on:click|preventDefault="{handleCheckout}">Checkout</button>
</section>
