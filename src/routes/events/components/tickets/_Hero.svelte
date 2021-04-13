<script>
  export let event;

  import dayjs from 'dayjs';
  import { fade } from 'svelte/transition';

  const venue = event.venues[0];
</script>

<div class="relative bg-thatBlue-200 bg-opacity-25">
  <div class="max-w-5xl mx-auto w-full pt-10 pb-10 px-6">
    <div class="flex items-center">
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
      <div class="">
        <img class="h-96 " src="{event.logo}" alt="" />
      </div>
    </div>
  </div>
</div>
