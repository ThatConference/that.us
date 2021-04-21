<script>
  export let event;

  console.log({ event });

  import { getContext } from 'svelte';
  import { fade } from 'svelte/transition';
  import { navigateTo } from 'yrv';

  import { Highlight as HighlightLink } from '../../../elements/links';

  import Layout from '../../../elements/layouts/LandingLayout.svelte';
  import Nav from '../../../components/nav/interiorNav/Top.svelte';

  import What from './hybrid/_What.svelte';
  import Hero from './hybrid/_Hero.svelte';
  import Partners from './hybrid/_Partners.svelte';
  import FAQ from './hybrid/_FAQ.svelte';

  import CamperTickets from './hybrid/_CamperTickets.svelte';
  import UpNextEvent from '../../../components/activities/UpNextEvent.svelte';
  import Membership from './_MembershipCard.svelte';

  const { send } = getContext('cart');

  function handleHybridTicketPurchase(e, quantity = 1) {
    const eventTicket = event.products
      .filter(p => p.isEnabled)
      .find(p => p.uiReference === e.ref);

    const isBulkPurchase = quantity > 1 ? true : false;

    send('ADD_ITEM', {
      eventId: e.eventId,
      ...eventTicket,
      isBulkPurchase,
      quantity,
    });

    navigateTo('/orders/summary');
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

  <section in:fade>
    <Hero event="{event}" />
  </section>

  <section in:fade="{{ delay: 200 }}">
    <What event="{event}" />
  </section>

  <section id="tickets">
    <CamperTickets
      event="{event}"
      on:purchase-hybrid-ticket="{({ detail }) =>
        handleHybridTicketPurchase(detail)}" />
  </section>

  <section>
    <Membership
      event="{event}"
      on:purchase-membership="{() =>
        handleAddMembershipClick(event.id, event.products)}">
      <div slot="header">
        <div class="text-center">
          <h2
            class="text-3xl font-extrabold text-thatBlue-800 sm:text-4xl lg:text-5xl">
            Go beyond camp.
          </h2>
          <p class="mt-4 text-xl text-gray-600">
            TODO:// We created THAT so we could connect every day of the year.
          </p>
        </div>
      </div>
    </Membership>
  </section>

  <section id="upnext">
    <UpNextEvent event="{event}">
      <div slot="action">
        <HighlightLink href="{`/activities/${event.slug}`}">
          View the entire schedule
        </HighlightLink>
      </div>
    </UpNextEvent>
  </section>

  <section id="sponsors">
    <Partners event="{event}" />
  </section>

  <section>
    <div class="h-96 bg-fixed thatBackground"></div>
  </section>

  <section id="faq">
    <FAQ />
  </section>
</Layout>

<style>
  .thatBackground {
    background-image: url(/images/memories/hallway.jpg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
</style>
