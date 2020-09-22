<script>
  import { getClient } from '@urql/svelte';
  import _ from 'lodash';

  import Layout from '../elements/layouts/ContentLayout.svelte';
  import Hero from '../components/partners/Hero.svelte';
  import PartnerCard from '../components/partners/PartnerCard.svelte';
  import CardLoader from '../components/CardLoader.svelte';

  import metaTagsStore from '../store/metaTags';
  import partnersApi from '../dataSources/api.that.tech/partners';

  const { get } = partnersApi(getClient());
  let partners = get();

  metaTagsStore.set({
    title: 'Partners - THAT',
    description: 'Thank you to those who support our great community every day.',
    openGraph: {
      type: 'website',
      url: `https://that.us/partners`,
    },
  });
</script>

<Layout>
  <main class="overflow-hidden">
    <div class="relative pb-16 md:pb-20 lg:pb-24 xl:pb-32">
      <div class="mt-32 mx-auto max-w-screen-xl px-4 sm:px-6 xl:mt-40">
        <Hero />
        <div class="mt-12 py-12">
          {#await partners}
            <CardLoader />
          {:then partners}
            <ul
              class="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-4
                lg:grid-cols-5"
            >
              {#each partners as p (p.id)}
                <li
                  class="col-span-1 flex flex-col text-center bg-white
                    rounded-lg shadow"
                >
                  <PartnerCard {...p} />
                </li>
              {/each}
            </ul>
          {/await}
        </div>
      </div>
    </div>
  </main>
</Layout>
