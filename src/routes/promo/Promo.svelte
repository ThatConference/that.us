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

  import eventsApi from '../../dataSources/api.that.tech/events/queries';

  const { eventId } = qs.parse(location.search);
  const { send } = getContext('cart');

  let event;
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

  {#await queryEvent() then event}
    <section in:fade>
      <Hero
        event="{event}"
        on:purchase-promo-ticket="{({ detail }) =>
          handleOnTicketPurchase(detail)}" />
    </section>
  {/await}

  <section in:fade>
    <FAQ/>
  </section>

</Layout>
