<script>
  import { getContext } from 'svelte';
  import { fade } from 'svelte/transition';
  import qs from 'query-string';
  import { getClient } from '@urql/svelte';
  import { navigateTo } from 'yrv';

  import Nav from '../../components/nav/interiorNav/Top.svelte';
  import Layout from './components/_Layout.svelte';
  import Hero from './components/_Hero.svelte';
  import FAQ from './components/_FAQ.svelte';

  import { Waiting } from '../../elements';
  import eventsApi from '../../dataSources/api.that.tech/events/queries';
  import metaTagsStore from '../../store/metaTags';

  const { eventId } = qs.parse(location.search);
  const { send } = getContext('cart');

  let event;

  metaTagsStore.set({
    title: 'Promotions - THAT',
    description: 'Let us help.',
    openGraph: {
      type: 'website',
      url: `https://that.us/promo`,
    },
  });

  async function queryEvent() {
    event = await eventsApi(getClient()).queryEventById(eventId);
    console.log({ event });
    return event;
  }

  function handleOnTicketPurchase(e) {
    const eventTicket = event.products
      .filter(p => p.isEnabled)
      .find(p => p.uiReference === e.ref);

    send('ADD_ITEM', {
      eventId: event.id,
      ...eventTicket,
    });

    navigateTo('/orders/summary');
  }
</script>

<Layout>
  <section slot="nav">
    <Nav />
  </section>

  {#await queryEvent()}
    <div class="flex flex-grow justify-center py-12">
      <Waiting />
    </div>
  {:then event}
    <section in:fade>
      <Hero
        event="{event}"
        on:purchase-promo-ticket="{({ detail }) =>
          handleOnTicketPurchase(detail)}" />
    </section>

    <section in:fade>
      <FAQ />
    </section>
  {/await}
</Layout>
