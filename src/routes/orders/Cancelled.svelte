<script>
  import Layout from './components/_Layout.svelte';
  import { LinkButton } from '../../elements';
  import metaTagsStore from '../../store/metaTags';

  metaTagsStore.set({
    title: 'Payment Cancelled',
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
        class="text-base text-thatOrange-400 font-semibold tracking-wide uppercase"
      >
        Payment Cancelled
      </h2>
      <p
        class="mt-6 text-4xl sm:text-5xl sm:tracking-tight lg:text-6xl leading-8 font-extrabold tracking-tight text-gray-900"
      >
        Oh No!
      </p>
    </div>

    <div class="relative">
      <div class="prose text-lg text-gray-500 mx-auto lg:max-w-none">
        <p>
          Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum
          urna sed consectetur neque tristique pellentesque. Blandit amet, sed
          aenean erat arcu morbi. Cursus faucibus nunc nisl netus morbi vel
          porttitor vitae ut. Amet vitae fames senectus vitae.
        </p>

        <p>
          Sollicitudin tristique eros erat odio sed vitae, consequat turpis
          elementum. Lorem nibh vel, eget pretium arcu vitae. Eros eu viverra
          donec ut volutpat donec laoreet quam urna.
        </p>
      </div>
      <div class="mt-12 flex justify-end space-x-5">
        <LinkButton href="/orders/summary" text="Return to Cart" />
      </div>
    </div>
  </div>
</Layout>
