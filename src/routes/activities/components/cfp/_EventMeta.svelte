<script>
  export let event;

  import dayjs from 'dayjs';
  import { Link } from 'yrv';

  const venue = event.venues[0];

  //class="absolute transform -translate-y-48 h-96"
</script>

<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
  <div class="grid grid-cols-1 sm:grid-cols-5 gap-8">
    <div class="col-span-2 sm:-mt-24 flex flex-col justify-center">
      <Link href="/events/{event.slug}">
        <img class="w-full h-72" src="{event.logo}" alt="" />
      </Link>
    </div>

    <div class="col-span-3 text-center">
      <div class="p-8 ">
        <p class="font-extrabold text-3xl tracking-tight text-gray-500">
          {dayjs(event.startDate).format('MMMM D, YYYY')} - {dayjs(
            event.endDate,
          ).format('MMMM D, YYYY')}
        </p>
        <p class="font-semibold text-2xl tracking-tight text-gray-500">
          {venue.name}
        </p>
        <p class="font-semibold text-2xl tracking-tight text-gray-500">
          {`${venue.city}, ${venue.state}, ${venue.zip}`}
        </p>
      </div>
    </div>
  </div>
</div>
