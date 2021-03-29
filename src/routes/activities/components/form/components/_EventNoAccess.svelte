<script>
  export let event;

  import { Link } from 'yrv';
  import dayjs from 'dayjs';

  import { Ban } from '../../../../../elements/svgs';

  let hasAccessHover = false;
</script>

<div
  on:mouseenter="{() => (hasAccessHover = true)}"
  on:mouseleave="{() => (hasAccessHover = false)}">
  {#if !hasAccessHover}
    <div
      class="flex-1 flex items-center justify-between border border-gray-200 bg-gray-50 rounded-md truncate">
      <div class="flex-1 px-4 py-2 text-gray-500 text-sm truncate">
        <p class="font-medium">
          {event.name}
        </p>

        <p>
          {dayjs(event.startDate).format('dddd MMMM D, YYYY')}
        </p>
      </div>
      <div class="flex-shrink-0 pr-4">
        <span class="h-6 w-6 rounded-full flex items-center justify-center">
          <Ban height="h-4" width="w-4" />
        </span>
      </div>
    </div>
  {:else}
    <Link href="{`/events/${event.slug}`}">
      <div
        class="flex-1 flex items-center justify-between border border-gray-200 bg-gray-50 rounded-md truncate">
        <div class="flex-1 px-4 py-2 text-sm truncate text-gray-500">
          <p class="font-medium">A Ticket or Membership is Required</p>
          <p class="">View Event Details</p>
        </div>
        <div class="flex-shrink-0 pr-4">
          <span class="h-6 w-6 rounded-full flex items-center justify-center">
            <Ban height="h-4" width="w-4" />
          </span>
        </div>
      </div>
    </Link>
  {/if}
</div>
