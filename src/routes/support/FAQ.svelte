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
  <main class="overflow-hidden">
    <div class="relative pb-16 md:pb-20 lg:pb-24 xl:pb-32">
      <div class="mt-32 mx-auto max-w-screen-xl px-4 sm:px-6 xl:mt-40">
        <div class="sm:text-center lg:text-left">
          <h2
            class="text-4xl tracking-tight leading-10 font-extrabold
              text-thatBlue-800 sm:text-5xl sm:leading-none md:text-6xl"
          >
            Frequently Asked Questions
          </h2>
          <p
            class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl
              sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
          >
            A common list of frequently asked questioned, answered.
          </p>
        </div>

        <div>
          <FaqItems />
        </div>
      </div>
    </div>
  </main>
</Layout>
