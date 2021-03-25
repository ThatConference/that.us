<script>
  import Layout from './components/_Layout.svelte';
  import { LinkButton } from '../../elements';
  import metaTagsStore from '../../store/metaTags';

  metaTagsStore.set({
    title: 'Payment Canceled - THAT',
    description: 'Your payment was cancelled.',
    nofollow: true,
    noindex: true,
    openGraph: {
      type: 'website',
      url: `https://that.us/orders/cancelled`,
    },
  });
</script>

<Layout>
  <div class="space-y-12">
    <div class="text-base max-w-prose mx-auto lg:max-w-none">
      <h2
        class="text-base text-thatOrange-400 font-semibold tracking-wide uppercase">
        Payment Canceled
      </h2>
      <p
        class="mt-6 text-4xl sm:text-5xl sm:tracking-tight lg:text-6xl leading-8 font-extrabold tracking-tight text-gray-900">
        Oh No!
      </p>
    </div>

    <div class="relative">
      <div class="prose text-lg text-gray-500 mx-auto lg:max-w-none">
        <p>
          Your payment has been canceled. We've left the items in your cart in
          case this was in error.
        </p>

        <p>
          If you have any questions or need some help please just contact us in
          the chat window on the bottom right of your window.
        </p>
      </div>
      <div class="mt-12 flex justify-end space-x-5">
        <LinkButton href="/orders/summary" text="Return to Cart" />
      </div>
    </div>
  </div>
</Layout>
