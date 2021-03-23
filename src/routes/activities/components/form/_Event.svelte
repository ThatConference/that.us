<script>
  export let setField;
  export let eventId;

  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  import { getClient } from '@urql/svelte';
  import { sortBy } from 'lodash';
  import dayjs from 'dayjs';
  import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
  import { Input } from 'sveltejs-forms'; //https://github.com/mdauner/sveltejs-forms

  import { CheckFull } from '../../../../elements/svgs';
  import eventsApi from '../../../../dataSources/api.that.tech/events/queries';
  import config from '../../../../config';

  dayjs.extend(isSameOrBefore);

  const dispatch = createEventDispatcher();
  let events;
  $: eventSelected = eventId;

  function handleOnChange({ target }) {
    setField('eventId', target.value);
    let eventSelectedDetail = events.find(i => i.id === eventSelected);
    dispatch('event-selected', eventSelectedDetail);
  }

  async function queryEvents() {
    const allEvents = await eventsApi(getClient())
      .queryEvents()
      .then(r => r.filter(i => i.community === 'that'));

    const results = {};

    results.daily = sortBy(
      allEvents.filter(i => i.type === 'DAILY').filter(i => i.isActive),
    )[0];

    results.online = sortBy(
      allEvents
        .filter(i => i.type === 'ONLINE')
        .filter(i => i.isActive)
        // .filter(i => i.isFeatured)
        .filter(i => dayjs().isSameOrBefore(i.endDate, 'day')),
      'endDate',
    );

    results.hybrid = sortBy(
      allEvents
        .filter(i => i.type === 'MULTI_DAY' || i.type === 'HYBRID_MULTI_DAY')
        .filter(i => i.isActive)
        // .filter(i => i.isFeatured)
        .filter(i => dayjs().isSameOrBefore(i.endDate, 'day')),
      'endDate',
    );

    // results.activeEvents = [...results.daily, ...results.online];
    events = allEvents;
    handleOnChange({ target: { value: eventSelected } });
    return results;
  }
</script>

{#await queryEvents()}
  <div in:fade class="px-4 sm:px-6 py-5 ">
    <div class="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2">
      <div class="col-span-1 shadow-sm rounded-md">
        <div in:fade class="shadow-sm rounded-md bg-white p-4 w-full mx-auto">
          <div class="animate-pulse">
            <div class="flex-1 space-y-2">
              <div class="h-3 bg-gray-400 rounded w-1/2"></div>
              <div class="h-3 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-1 shadow-sm rounded-md">
        <div in:fade class="shadow-sm rounded-md bg-white p-4 w-full mx-auto">
          <div class="animate-pulse">
            <div class="flex-1 space-y-2">
              <div class="h-3 bg-gray-400 rounded w-1/2"></div>
              <div class="h-3 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{:then activeEvents}
  <Input hidden name="eventId" value="{eventSelected}" />
  <div in:fade class="px-4 sm:px-6 py-5 ">
    <ul class="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2">
      <li
        in:fade
        class="col-span-1 shadow-sm rounded-md transition duration-500 ease-in-out transform hover:scale-105 ">
        <input
          type="radio"
          id="{activeEvents.daily.name}"
          bind:group="{eventSelected}"
          value="{activeEvents.daily.id}"
          on:change="{handleOnChange}" />

        <label for="{activeEvents.daily.name}" class="h-full flex">
          {#if activeEvents.daily.id !== eventSelected}
            <div
              class="flex-1 flex items-center justify-between border border-gray-200 bg-white hover:bg-gray-50 rounded-md truncate">
              <div class="flex-1 px-4 py-2 text-sm truncate">
                <p class="text-gray-900 font-medium">
                  {activeEvents.daily.name}
                </p>
                {#if activeEvents.daily.id !== config.eventId}
                  <p class="text-gray-500">
                    {dayjs(activeEvents.daily.startDate).format(
                      'dddd MMMM D, YYYY',
                    )}
                  </p>
                {/if}
              </div>
            </div>
          {:else}
            <div
              class="flex-1 flex items-center justify-between border border-green-500 bg-green-100 rounded-md truncate">
              <div class="flex-1 px-4 py-2 text-sm truncate">
                <p class="text-gray-900 font-bold">
                  {activeEvents.daily.name}
                </p>
                {#if activeEvents.daily.id !== config.eventId}
                  <p class="text-gray-500">
                    {dayjs(activeEvents.daily.startDate).format(
                      'dddd MMMM D, YYYY',
                    )}
                  </p>
                {/if}
              </div>

              <div class="flex-shrink-0 pr-4">
                <span
                  class="h-6 w-6 rounded-full bg-green-500 bg-opacity-60 flex items-center justify-center">
                  <CheckFull height="h-4" width="w-4" />
                </span>
              </div>
            </div>
          {/if}
        </label>
      </li>

      <!-- divider -->

      <div class="col-span-1 sm:col-span-2 relative m-4">
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
          <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-center">
          <span
            class="uppercase tracking-wider px-2 bg-gray-100 rounded-md text-sm text-gray-500">
            Upcoming Online Events
          </span>
        </div>
      </div>

      <!-- end divider -->

      {#each activeEvents.online as event, i (i)}
        <li
          in:fade="{{ delay: i * 200 }}"
          class="col-span-1 shadow-sm rounded-md transition duration-500 ease-in-out transform hover:scale-105 ">
          <input
            type="radio"
            id="{event.name}"
            bind:group="{eventSelected}"
            value="{event.id}"
            on:change="{handleOnChange}" />

          <label for="{event.name}" class="h-full flex">
            {#if event.id !== eventSelected}
              <div
                class="flex-1 flex items-center justify-between border border-gray-200 bg-white hover:bg-gray-50 rounded-md truncate">
                <div class="flex-1 px-4 py-2 text-sm truncate">
                  <p class="text-gray-900 font-medium">
                    {event.name}
                  </p>
                  {#if event.id !== config.eventId}
                    <p class="text-gray-500">
                      {dayjs(event.startDate).format('dddd MMMM D, YYYY')}
                    </p>
                  {/if}
                </div>
              </div>
            {:else}
              <div
                class="flex-1 flex items-center justify-between border border-green-500 bg-green-100 rounded-md truncate">
                <div class="flex-1 px-4 py-2 text-sm truncate">
                  <p class="text-gray-900 font-bold">
                    {event.name}
                  </p>
                  {#if event.id !== config.eventId}
                    <p class="text-gray-500">
                      {dayjs(event.startDate).format('dddd MMMM D, YYYY')}
                    </p>
                  {/if}
                </div>

                <div class="flex-shrink-0 pr-4">
                  <span
                    class="h-6 w-6 rounded-full bg-green-500 bg-opacity-60 flex items-center justify-center">
                    <CheckFull height="h-4" width="w-4" />
                  </span>
                </div>
              </div>
            {/if}
          </label>
        </li>
      {/each}
    </ul>
  </div>
{/await}

<style>
  input[type='radio'] {
    display: none;
  }
</style>
