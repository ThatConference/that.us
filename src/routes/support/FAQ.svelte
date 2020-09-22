<script>
  import Layout from '../../elements/layouts/ContentLayout.svelte';
  import Nav from '../../components/nav/mainNav/MainNav.svelte';
  import FaqItems from '../../components/faq/FaqItem.svelte';
  import { Footer } from '../../components';

  import metaTagsStore from '../../store/metaTags';
  metaTagsStore.set({
    title: 'FAQ - THAT',
    description: 'A common list of frequently asked questioned, answered.',
    openGraph: {
      type: 'website',
      url: `https://that.us/support/faq`,
    },
  });
</script>

<Layout>
  <div class="py-16 overflow-hidden">
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-base max-w-prose mx-auto lg:max-w-none">
        <p
          class="text-base leading-6 text-thatOrange-400 font-semibold
            tracking-wide uppercase"
        >
          Help && Support
        </p>
        <h1
          class="mt-2 mb-8 text-3xl leading-8 font-extrabold tracking-tight
            text-gray-900 sm:text-4xl sm:leading-10"
        >
          Frequently Asked Questions
        </h1>
      </div>

      <div>
        <FaqItems />
      </div>
    </div>
  </div>
</Layout>
