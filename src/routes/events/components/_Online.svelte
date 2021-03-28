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
        handleAddMembershipClick(event.id, event.products)}" />
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
    <SponsorSimple eventId="{event.eventId}">
      <div slot="header">
        <div
          class="pb-12 text-3xl sm:text-4xl leading-8 sm:leading-10 font-extrabold tracking-tight text-thatBlue-800">
          <h1 class="block text-center sm:text-left">Event Partners</h1>
        </div>
      </div>
    </SponsorSimple>

    <div class="relative pt-16 flex justify-end space-x-4">
      <div
        class="px-8 py-3 border-2 border-transparent leading-6 font-medium rounded-md
      shadow md:py-4 md:text-lg md:px-10 transition duration-150 ease-in-out
      text-base text-white bg-thatOrange-400 hover:bg-thatOrange-500
      focus:outline-none focus:border-thatOrange-700
      focus:ring-that-orange">
        <a href="mailto:hello@that.us?subject=Let's Partner">
          Partner with us!
        </a>
      </div>

      <StandardLink href="/events/{event.slug}/partners">
        View all Partners
      </StandardLink>
    </div>
  </section>

  <section>
    <FAQ />
  </section>
</Layout>
