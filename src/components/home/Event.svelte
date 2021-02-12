<script>
  export let name;
  export let startDate;
  export let endDate;
  export let description;
  export let slug;

  import { Link } from 'yrv';
  import dayjs from 'dayjs';
</script>

<Link href="/events/{slug}">
  <div
    class="relative rounded-lg shadow-xl transform hover:scale-110 hover:bg-gray-50">
    <div
      class="pointer-events-none absolute inset-0 rounded-lg border-2 border-thatBlue-400"
      aria-hidden="true">
    </div>
    <div class="absolute inset-x-0 top-0 transform translate-y-px">
      <div class="flex justify-center transform -translate-y-1/2">
        <span
          class="inline-flex rounded-full bg-thatBlue-400 px-4 py-1 text-sm font-semibold tracking-wider uppercase text-white">
          {dayjs(startDate).format('MMMM')}
        </span>
      </div>
    </div>

    <div class="px-4 py-8">
      <div class="w-full flex items-center justify-between space-x-6">
        <div class="flex-1">
          <div class="flex items-center space-x-3">
            <h3 class="text-gray-900 text-md font-medium truncate">
              {name}
            </h3>
          </div>

          <p class="mt-1 text-gray-500 text-sm truncate">
            {dayjs(startDate).format('dddd MMMM D, YYYY - h:mm A')}
            {dayjs(endDate).format('dddd MMMM D, YYYY - h:mm A')}
          </p>

          <p class="mt-4 text-gray-500 text-sm">
            {description}
          </p>
        </div>
      </div>
    </div>
  </div>
</Link>
