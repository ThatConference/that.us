<script>
  import { getContext } from 'svelte';
  import { getClient } from '@urql/svelte';
  import { fade } from 'svelte/transition';
  import { navigateTo, router } from 'yrv';

  // shared components
  import Layout from '../../elements/layouts/LandingLayout.svelte';
  import Nav from '../../components/nav/interiorNav/Top.svelte';

  // page components
  import Hero from './components/tickets/_Hero.svelte';
  import Professional from './components/tickets/_Professional.svelte';

  // shared elements
  import { Highlight as HighlightLink } from '../../elements/links';

  // utilities
  import metaTagsStore from '../../store/metaTags';
  import eventsApi from '../../dataSources/api.that.tech/events/queries';

  const { send } = getContext('cart');

  const { id, name } = $router.params;
  const eventSlug = `${id}/${name}`;

  metaTagsStore.set({
    title: 'Tickets - THAT',
    description: 'Ticket Breakdown',
    openGraph: {
      type: 'website',
      url: `https://that.us/events/${eventSlug}/tickets`,
    },
  });

  function queryEvent() {
    return eventsApi(getClient()).queryEventBySlug(eventSlug);
  }

  function handleAddMembershipClick(eventId, eventProducts, quantity = 1) {
    const eventTicket = eventProducts
      .filter(f => f.isEnabled)
      .find(e => e.productType === 'MEMBERSHIP');
    const isBulkPurchase = quantity > 1 ? true : false;

    send('ADD_ITEM', {
      eventId,
      ...eventTicket,
      isBulkPurchase,
      quantity,
    });
    navigateTo('/orders/summary');
  }
</script>

<Layout>
  <section in:fade slot="nav">
    <Nav />
  </section>
  {#await queryEvent()}
    <div>loading awesome shit</div>
  {:then event}
    <section>
      <Hero event="{event}" />
    </section>

    <section>
      <Professional event="{event}" />
    </section>
  {/await}
</Layout>
