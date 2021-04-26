<script>
  export let event;

  import { Link } from 'yrv';
  import dayjs from 'dayjs';

  import { StandardScroll } from '../../../../elements/links';

  import { Shell } from '../../../../elements/buttons';
</script>

<div class="relative bg-thatBlue-200 bg-opacity-25">
  <div class="mx-auto max-w-7xl w-full pt-10 pb-10 text-center">
    <div class="flex flex-col">
      <div class="z-10 transform translate-y-40">
        <h1
          class="animate__animated animate__pulse shadowText relative font-extrabold uppercase text-thatBlue-500 text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
          {event.slogan}
        </h1>
      </div>

      <img class="relative h-96 " src="{event.logo}" alt="" />

      <div class="p-8 font-extrabold">
        <p class="text-3xl tracking-tight text-gray-500">
          {dayjs(event.startDate).format('MMMM D, YYYY')} - {dayjs(
            event.endDate,
          ).format('MMMM D, YYYY')}
        </p>
      </div>

      <div class="p-8 grid gap-8 lg:gap-2 grid-cols-2 lg:grid-cols-6">
        <div class="lg:col-start-2 rounded-md shadow">
          <StandardScroll href="#tickets">
            <span class="font-extrabold uppercase">Tickets</span>
          </StandardScroll>
        </div>
        <div class="rounded-md shadow">
          <StandardScroll href="#sponsors">
            <span class="font-extrabold uppercase">Sponsorships</span>
          </StandardScroll>
        </div>
        <div class="rounded-md shadow flex">
          <div class="flex-grow">
            <Shell>
              <Link href="/support/travel">
                <div class="px-4 py-2 font-extrabold uppercase">Travel</div>
              </Link>
            </Shell>
          </div>
        </div>
        <div class="rounded-md shadow">
          <StandardScroll href="#upnext">
            <span class="font-extrabold uppercase">Schedule</span>
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
</div>

<style>
  .shadowText {
    text-shadow: white 0.1em 0.1em 0.2em;
  }
</style>
