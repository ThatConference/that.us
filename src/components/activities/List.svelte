<script>
  export let activities;
  export let editMode = false;
  export let reverse = false;

  // 3rd party
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import dayjs from 'dayjs';
  import _ from 'lodash';
  import Fuse from 'fuse.js';
  import Icon from 'svelte-awesome';
  import { filter as filterIcon } from 'svelte-awesome/icons';

  // ui support
  import Card from './Card.svelte';
  import KeynoteCard from './KeynoteCard.svelte';
  import FilterSlideOver from './FilterSlideOver.svelte';

  // https://fusejs.io/api/options.html
  const options = {
    // isCaseSensitive: false,
    includeScore: true,
    shouldSort: false,
    // includeMatches: false,
    findAllMatches: true,
    // minMatchCharLength: 1,
    // location: 0,
    threshold: 0.2,
    // distance: 100,
    // useExtendedSearch: false,
    ignoreLocation: true,
    // ignoreFieldNorm: false,
    keys: [
      'title',
      'shortDescription',
      'tags',
      'speakers.firstName',
      'speakers.lastName',
    ],
  };

  let activitiesFiltered = [];
  let searchterm = '';
  let fuse;
  let filterVisible;
  let tags = [];
  let selectedTags = getSessionSelectedTags();
  let activitiesTaggedFiltered = [];

  $: {
    const tagsSet = new Set();

    for (const activity of activities) {
      for (const tag of activity.tags) {
        tagsSet.add(tag.toLowerCase());
      }
    }

    tags = Array.from(tagsSet.values()).sort((a, b) => {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });
  }

  $: window.sessionStorage.setItem(
    'selectedTags',
    JSON.stringify(selectedTags),
  );

  $: activitiesTaggedFiltered =
    selectedTags.length > 0
      ? activitiesFiltered.filter(activity =>
          selectedTags.some(tag =>
            activity.tags.some(t => t.toLowerCase() === tag),
          ),
        )
      : activitiesFiltered;

  $: sorted = _(activitiesTaggedFiltered)
    .groupBy(({ startTime }) => dayjs(startTime).format('MM/DD/YYYY'))
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

  $: if (reverse) {
    sorted.reverse();
  }

  const isKeynote = activity => {
    let results = false;
    if (activity.type === 'KEYNOTE' || activity.type === 'PANEL')
      results = true;

    return results;
  };

  $: {
    if (searchterm === '') {
      activitiesFiltered = activities;
    } else {
      activitiesFiltered = fuse.search(searchterm).map(r => r.item);
    }
  }

  function handleCloseFilter() {
    filterVisible = false;
  }

  function getSessionSelectedTags() {
    const sessionTags = window.sessionStorage.getItem('selectedTags');
    if (sessionTags) {
      const parsedTags = JSON.parse(sessionTags);
      if (parsedTags && Array.isArray(parsedTags)) {
        return parsedTags;
      }
    }

    return [];
  }

  onMount(() => {
    fuse = new Fuse(activities, options);
  });
</script>

<div class="relative">
  <div class="sticky z-20 top-0">
    <div class="absolute top-0 right-0 z-20 border-gray-200 pt-4">
      <button
        type="button"
        class="max-w-xs h-10 w-10 rounded-full text-gray-300 focus:outline-none
          duration-150 ease-in-out hover:bg-thatBlue-500"
        class:bg-thatBlue-500="{filterVisible}"
        class:bg-thatRed-500="{selectedTags.length > 0}"
        aria-label="{`Show filter and tags options${selectedTags.length > 0 ? ` (Selected tags: ${selectedTags.join(', ')})` : ''}`}"
        on:click="{() => {
          filterVisible = true;
        }}"
      >
        <Icon data="{filterIcon}" label="Filter" />
      </button>
      <input
        class="form-input border rounded-md"
        bind:value="{searchterm}"
        placeholder="type to search..."
      />
    </div>
  </div>

  {#if filterVisible}
    <FilterSlideOver
      tags="{tags}"
      bind:selectedTags
      bind:searchterm
      on:click="{handleCloseFilter}"
      on:clicked-outside="{handleCloseFilter}"
    />
  {/if}

  {#each sorted as day, d}
    <div in:fade="{{ delay: d * 200 }}">
      <span
        class="sticky top-0 z-20 bg-white text-3xl leading-9 font-extrabold
        tracking-tight text-thatBlue-800 sm:text-4xl sm:leading-10 pt-4 mb-10"
      >
        {dayjs(day.dayOfYear).format("dddd MMMM D, 'YY")}
      </span>

      {#each day.timeSlots as ts, t}
        <div class="relative">
          <span
            class="sticky top-14 z-10 bg-white text-3xl leading-9 font-extrabold
            tracking-tight text-thatOrange-400 sm:text-4xl sm:leading-10"
          >
            {#if !dayjs(ts.timeSlot).isValid()}
              Unscheduled
            {:else}{dayjs(ts.timeSlot).format('hh:mm a')}{/if}
          </span>

          <div in:fade="{{ delay: t * 500 }}" class="mb-12">
            <ul
              class="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {#each ts.activities as activity (activity.id)}
                {#if isKeynote(activity)}
                  <li
                    in:fade
                    class="col-span-1 sm:col-span-2 lg:col-span-3 bg-white
                  rounded-lg shadow-lg mt-10 mb-10"
                  >
                    <KeynoteCard {...activity} />
                  </li>
                {:else}
                  <li in:fade class="col-span-1 bg-white rounded-lg shadow-lg">
                    <Card {...activity} editMode="{editMode}" />
                  </li>
                {/if}
              {/each}
            </ul>
          </div>
        </div>
      {/each}
    </div>
  {/each}
</div>
