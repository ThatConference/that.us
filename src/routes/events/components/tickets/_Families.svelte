<script>
  import TicketCard from '../_TicketCard.svelte';

  const familyTickets = [
    {
      title: 'Geekling',
      price: '79',
      description: 'adf asdf adf asdf asdfa sdfadfas dasdfasdfa',
      ticketId: '12345',
      includes: [
        'Family Pre-Conference',
        'THAT Badge',
        'T-Shirt',
        'Waterpark Party Access',
        'Hog Roast',
        'Game Night',
      ],
    },
    {
      title: 'Campmate',
      price: '99',
      description: '',
      ticketId: '12345',
      includes: [
        'Family Pre-Conference',
        'THAT Badge',
        'T-Shirt',
        'Waterpark Party Access',
        'Hog Roast',
        'Game Night',
      ],
    },
    {
      title: 'Hog Roast Only',
      price: '49',
      description: '',
      ticketId: '12345',
      includes: ['Hog Roast'],
    },
  ];
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
    </div>

    <div class="mt-8 pb-16 sm:mt-12 sm:pb-20 lg:pb-28">
      <div class="relative">
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            class="flex flex-col md:flex-row justify-center md:space-x-4 space-y-16 md:space-y-0">
            {#each familyTickets as ticket}
              <TicketCard ticketDetails="{ticket}" />
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
