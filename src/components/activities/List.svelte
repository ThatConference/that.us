<script>
  export let activities;
  export let editMode = false;

  // 3rd party
  import { onMount } from 'svelte';
  import dayjs from 'dayjs';
  import dayOfYear from 'dayjs/plugin/dayOfYear';
  import _ from 'lodash';
  import Fuse from 'fuse.js';

  // ui support
  import Card from './Card.svelte';
  import KeynoteCard from './KeynoteCard.svelte';

  dayjs.extend(dayOfYear);

  // https://fusejs.io/api/options.html
  const options = {
    // isCaseSensitive: false,
    includeScore: true,
    //shouldSort: false,
    // includeMatches: false,
    findAllMatches: true,
    // minMatchCharLength: 1,
    // location: 0,
    threshold: 0.2,
    // distance: 100,
    // useExtendedSearch: false,
    ignoreLocation: true,
    // ignoreFieldNorm: false,
    keys: ['title', 'shortDescription', 'tags'], // todo.. how do we search a level deeper
  };

  let activitiesFiltered = [];
  let searchterm = '';
  let fuse;

  $: sorted = _(activitiesFiltered)
    .groupBy(({ startTime }) => dayjs(startTime).dayOfYear())
    .map((value, key) => ({
      timeSlots: _(value)
        .groupBy(({ startTime }) => new Date(startTime))
        .map((value, key) => ({
          timeSlot: key,
          activities: value,
        }))
        .value(),
      dayOfYear: key,
    }))
    .value();

  const isKeynote = activity => {
    let results = false;
    if (activity.type === 'KEYNOTE' || activity.type === 'PANEL')
      results = true;

    return results;
  };

  function filter(term) {
    if (term === '') {
      activitiesFiltered = activities;
      return;
    }

    activitiesFiltered = fuse.search(term).map(r => r.item);
  }

  onMount(() => {
    fuse = new Fuse(activities, options);
    filter(searchterm);
  });
</script>

<div class="relative">
  <div class="sticky z-20 top-4">
    <div class="absolute top-0 right-0 z-20 border-gray-200">
      <input
        class="form-input"
        bind:value="{searchterm}"
        on:input="{filter(searchterm)}"
        placeholder="type to search..."
      />
    </div>
  </div>

  {#each sorted as day}
    <div>
      <h2
        class="sticky top-2 bg-white text-3xl leading-9 font-extrabold
          tracking-tight text-thatBlue-800 sm:text-4xl sm:leading-10 pb-2 z-10"
      >
        <span>
          {dayjs().dayOfYear(day.dayOfYear).format("dddd MMMM D, 'YY")}
        </span>
      </h2>

      {#each day.timeSlots as ts}
        <div class="pb-12">
          <h2
            class="sticky top-12 bg-white text-3xl leading-9 font-extrabold
              tracking-tight text-thatOrange-400 sm:text-4xl sm:leading-10 z-10"
          >
            {#if !dayjs(ts.timeSlot).isValid()}
              <span>Unscheduled</span>
            {:else}<span>{dayjs(ts.timeSlot).format('hh:mm a')}</span>{/if}
          </h2>

          <ul class="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {#each ts.activities as activity (activity.id)}
              {#if isKeynote(activity)}
                <li
                  class="col-span-1 sm:col-span-2 lg:col-span-3 bg-white
                    rounded-lg shadow-lg mt-10 mb-10"
                >
                  <KeynoteCard {...activity} />
                </li>
              {:else}
                <li class="col-span-1 bg-white rounded-lg shadow-lg">
                  <Card {...activity} editMode="{editMode}" />
                </li>
              {/if}
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  {/each}
</div>
