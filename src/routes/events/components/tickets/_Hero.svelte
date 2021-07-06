<script>
  export let event;

  import dayjs from 'dayjs';
  import { fade } from 'svelte/transition';

  import { StandardScroll } from '../../../../elements/links';

  const venue = event.venues[0];
</script>

<div class="relative bg-thatBlue-200 bg-opacity-25">
  <div class="max-w-5xl mx-auto w-full pt-10 pb-10 px-6">
    <div class="flex flex-col sm:flex-row sm:justify-around items-center">
      <div class="flex flex-col space-y-4">
        <h1
          class="font-extrabold uppercase text-thatBlue-500 text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
          Event Tickets
        </h1>

        <div class="font-extrabold">
          <p class="text-3xl tracking-tight text-gray-500">
            {dayjs(event.startDate).format('MMMM D, YYYY')} - {dayjs(
              event.endDate,
            ).format('MMMM D, YYYY')}
          </p>
        </div>

        <div class="font-semibold text-gray-500">
          <div>
            {venue.name}
          </div>
          <div>
            {venue.address}
          </div>
          <div>
            {`${venue.city}, ${venue.state}, ${venue.zip}`}
          </div>

          <p class="text-3xl tracking-tight text-gray-500"></p>
        </div>
      </div>

      <div class="mt-12 sm:mt-0">
        <a href="{`/events/${event.slug}`}" class="w-full">
          <img class="h-48 sm:h-96 " src="{event.logo}" alt="" />
        </a>
      </div>
    </div>

    <div class="mt-24 py-12 grid gap-8 lg:gap-2 grid-cols-3 text-center">
      <div class="rounded-md shadow">
        <StandardScroll href="#professionals">
          <span class="font-extrabold uppercase">Professionals</span>
        </StandardScroll>
      </div>
      <div class="rounded-md shadow">
        <StandardScroll href="#workshops">
          <span class="font-extrabold uppercase">Workshops</span>
        </StandardScroll>
      </div>
      <div class="rounded-md shadow">
        <StandardScroll href="#families">
          <span class="font-extrabold uppercase">Families</span>
        </StandardScroll>
      </div>
    </div>

    <div class="p-10 text-gray-500 flex justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="animate-bounce h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
      </svg>
    </div>
  </div>
</div>
