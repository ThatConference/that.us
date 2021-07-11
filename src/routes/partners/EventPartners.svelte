<script>
  import { Link, router } from 'yrv';
  import { getClient } from '@urql/svelte';
  import { groupBy } from 'lodash';

  import Layout from '../../elements/layouts/ContentLayout.svelte';
  import PartnerLevel from './components/_EventPartnerLevel.svelte';
  import metaTagsStore from '../../store/metaTags';

  import partnerQueryApi from '../../dataSources/api.that.tech/partner/queries';
  import Hero from './components/_EventHero.svelte';

  const { getEventPartners } = partnerQueryApi(getClient());

  let { id, name } = $router.params;
  let eventSlug = `${id}/${name}`;

  metaTagsStore.set({
    title: 'Partners - THAT',
    description:
      'Thank you to those who support our great community every day.',
    openGraph: {
      type: 'website',
      url: `https://that.us/event/${eventSlug}/partners`,
    },
  });

  async function queryEventPartners(slug) {
    const data = await getEventPartners(slug);
    const levels = groupBy(data.partners, 'level');

    return { data, levels };
  }
</script>

<Layout>
  <main>
    <div class="relative pb-16 md:pb-20 lg:pb-24 xl:pb-32">
      {#await queryEventPartners(eventSlug) then event}
        <div class="py-16 bg-opactity-75 bg-gradient-to-t from-gray-200">
          <Hero event="{event.data}" />
        </div>

        <div class="mx-auto max-w-screen-xl px-4 sm:px-6">
          {#if event.levels['PIONEER']}
            <PartnerLevel
              header="Pioneer Sponsors"
              partners="{event.levels['PIONEER']}" />
          {/if}

          {#if event.levels['EXPLORER']}
            <PartnerLevel
              header="Explorer Sponsors"
              partners="{event.levels['EXPLORER']}" />
          {/if}

          {#if event.levels['SCOUT']}
            <PartnerLevel
              header="Scout Sponsors"
              partners="{event.levels['SCOUT']}" />
          {/if}

          {#if event.levels['MEDIA']}
            <PartnerLevel
              header="Media Sponsors"
              partners="{event.levels['MEDIA']}" />
          {/if}
        </div>
      {/await}
    </div>
  </main>
</Layout>
