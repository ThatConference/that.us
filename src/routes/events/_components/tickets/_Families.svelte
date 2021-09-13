<script>
  export let event;

  import { createEventDispatcher } from 'svelte';

  import TicketCard from '../_TicketCard.svelte';

  const dispatch = createEventDispatcher();
  const { products } = event;

  const campSwagTicket = products.find(p => p.uiReference === 'SWAG');
  const hogRoastTicket = products.find(p => p.uiReference === 'HOG_ROAST');

  const familyTickets = [
    // {
    //   uiReference: 'GEEKLING',
    //   name: 'Geekling',
    //   price: '79',
    //   shortDescription: '',
    //   longDescription: '',
    //   includes: [
    //     'Family Pre-Conference',
    //     'THAT Badge',
    //     'T-Shirt',
    //     'Waterpark Party Access',
    //     'Hog Roast',
    //     'Game Night',
    //   ],
    // },
    // {
    //   uiReference: 'CAMPMATE',
    //   name: 'Campmate',
    //   price: '99',
    //   shortDescription: '',
    //   longDescription: '',
    //   includes: [
    //     'Family Pre-Conference',
    //     'THAT Badge',
    //     'T-Shirt',
    //     'Waterpark Party Access',
    //     'Hog Roast',
    //     'Game Night',
    //   ],
    // },
    {
      ...campSwagTicket,
      includes: [
        'THAT Badge',
        'Access to family activities.',
        'THAT t-shirt',
        'Waterpark Party Access',
      ],
    },
    {
      ...hogRoastTicket,
      includes: ['Pig Roast', 'Waterpark Party Access'],
    },
  ];

  function handlePurchase(ref) {
    dispatch('purchase-hybrid-ticket', {
      eventId: event.id,
      ref,
    });
  }
</script>

<div class="relative">
  <div class="max-w-7xl mx-auto">
    <div class="grid grid-cols-3">
      <img
        class="col-start-2 object-center"
        src="/images/characters/what_to_expect_families_welcome.png"
        alt />
    </div>
  </div>

  <div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:pr-12">
        <h2
          class="text-3xl font-extrabold text-thatBlue-800 sm:text-4xl lg:text-5xl">
          Families Welcome!
        </h2>

        <p class="mt-12 prose-xl text-gray-500">
          At our core, THAT Conference is about family, community and the next
          generation of technologists. We strive to provide opportunities for
          children to speak, learn and experience many areas of the STEM field
          while interacting with industry professionals. At THAT Conference,
          families are not only welcomed, but encouraged to join us for family
          sessions.
        </p>
      </div>

      <div class="py-12 max-w-prose mx-auto">
        <h2 class="text-center text-2xl italic font-extrabold text-red-500 ">
          Please note for 2021
        </h2>

        <p class="mt-6 prose-xl text-red-500">
          This year we made the difficult decision not to have a dedicated
          family track. This means THAT Conference will not formally organize
          family sessions, activities, or events. Rather, this year we will
          dedicate space for family activities and ask the families who come to
          self-organize in the spirit of our open spaces.
        </p>
      </div>
    </div>

    <div class="mt-8 pb-16 sm:mt-12 sm:pb-20 lg:pb-28">
      <div class="relative">
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- <div
            class="flex flex-col md:flex-row justify-center md:space-x-4 space-y-16 md:space-y-0"> -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {#each familyTickets as ticket}
              <TicketCard
                ticketDetails="{ticket}"
                on:click="{() => handlePurchase(ticket.uiReference)}" />
            {/each}
          </div>

          <div class="py-4 flex justify-center lg:justify-end">
            <p class="italic text-red-500">
              *** please note these tickets are only for in-person campers.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
