<script>
  export let eventTicket;
  export let membership;

  import AnnualMembership from './_AnnualMembership.svelte';
  import EventTickets from './_EventTickets.svelte';
  import Discounts from './_Discounts.svelte';
</script>

<section class="bg-thatBlue-700 py-12 lg:py-16">
  <div class="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
    <AnnualMembership membership="{membership}" />
    <EventTickets eventTicket="{eventTicket}" />
    <Discounts />
  </div>
</section>
