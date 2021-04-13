<script>
  export let event;

  import { getContext } from 'svelte';
  import { fade } from 'svelte/transition';
  import { navigateTo } from 'yrv';

  import Nav from '../../../components/nav/interiorNav/Top.svelte';
  import SponsorSimple from '../../../components/SponsorSimple.svelte';
  import UpNextEvent from '../../../components/activities/UpNextEvent.svelte';
  import {
    Standard as StandardLink,
    Highlight as HighlightLink,
  } from '../../../elements/links';
  import Layout from '../../../elements/layouts/LandingLayout.svelte';

  import config from '../../../config';

  import CTA from './_EventCTA.svelte';
  import OnlineHero from './_OnlineHero.svelte';
  import EventFollowers from './_EventFollowers.svelte';
  import EventTicket from './_EventTicket.svelte';
  import FAQ from './_FAQ.svelte';
  import Membership from './_MembershipCard.svelte';

  const { send } = getContext('cart');

  function handleAddEventTicketClick(eventId, eventProducts, quantity = 1) {
    const eventTicket = eventProducts
      .filter(f => f.isEnabled)
      .find(e => e.productType === 'TICKET');
    const isBulkPurchase = quantity > 1 ? true : false;

    send('ADD_ITEM', {
      eventId,
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

  <section in:fade slot="header">
    <OnlineHero
      event="{event}"
      on:purchase-event-ticket="{() =>
        handleAddEventTicketClick(event.id, event.products)}" />
  </section>

  <section in:fade="{{ delay: 200 }}">
    <EventTicket
      event="{event}"
      on:purchase-event-ticket="{() =>
        handleAddEventTicketClick(event.id, event.products)}" />
  </section>

  <section in:fade="{{ delay: 250 }}">
    <Membership
      event="{event}"
      on:purchase-membership="{() =>
        handleAddMembershipClick(event.id, event.products)}">
      <div slot="header">
        <div class="text-center">
          <h2
            class="text-3xl font-extrabold text-thatBlue-800 sm:text-4xl lg:text-5xl">
            Support Us, Supporting You.
          </h2>
          <p class="mt-4 text-xl text-gray-600">
            We could create a free platform, but then you become the product. To
            that we say no thank you, we're the product. We're taking the
            approach of creating a monetization strategy of help us, help you.
          </p>
        </div>
      </div>
    </Membership>
  </section>

  <section>
    <UpNextEvent event="{event}">
      <div slot="action">
        <HighlightLink href="{`/activities/${event.slug}`}">
          View the entire schedule
        </HighlightLink>
      </div>
    </UpNextEvent>
  </section>

  {#if event.followers.members.length > 0}
    <section class="pb-12">
      <EventFollowers followers="{event.followers.members}" />
    </section>
  {/if}

  <section>
    <CTA
      on:purchase-membership="{() =>
        handleAddMembershipClick(event.id, event.products)}"
      on:purchase-event-ticket="{() =>
        handleAddEventTicketClick(event.id, event.products)}" />
  </section>

  <section class="mx-auto max-w-7xl pb-12">
    <SponsorSimple eventId="{event.eventId}" />
  </section>

  <section>
    <FAQ />
  </section>
</Layout>
