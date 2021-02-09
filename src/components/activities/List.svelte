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
      'communities',
      'speakers.firstName',
      'speakers.lastName',
    ],
  };
  let activitiesFiltered = [];
  let searchterm = '';
  let fuse;
  let filterVisible;
  let tags = [];
  let communities = [];
  let selectedFilterTerms = getSessionSelectedTags();
  let activitiesTaggedFiltered = [];
  $: {
    const tagsSet = new Set();
    const communitiesSet = new Set();
    for (const activity of activities) {
      for (const tag of activity.tags) {
        tagsSet.add(tag.toLowerCase());
      }
      for (const community of activity.communities) {
        communitiesSet.add(community.toLowerCase());
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
    communities = Array.from(communitiesSet.values());
  }
  $: window.sessionStorage.setItem(
    'selectedTags',
    JSON.stringify(selectedFilterTerms),
  );
  $: activitiesTaggedFiltered =
    selectedFilterTerms.length > 0
      ? activitiesFiltered.filter(activity =>
          selectedFilterTerms.some(tag =>
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
    const sessionFilters = window.sessionStorage.getItem('selectedFilters');
    if (sessionFilters) {
      const parsedTags = JSON.parse(sessionFilters);
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
  <div class="sticky z-30 top-0 ">
    <div class="absolute top-0 right-0 border-gray-200 pt-4">
      <button
        type="button"
        class="max-w-xs h-10 w-10 rounded-full text-gray-300 focus:outline-none
          duration-150 ease-in-out bg-thatBlue-500 sm:bg-white lg:hover:bg-thatBlue-400"
        class:bg-thatRed-500="{selectedFilterTerms.length > 0}"
        aria-label="{`Show filter and tags options${selectedFilterTerms.length > 0 ? ` (Selected tags: ${selectedFilterTerms.join(', ')})` : ''}`}"
        on:click="{() => {
          filterVisible = true;
        }}"
      >
        <Icon data="{filterIcon}" label="Filter" />
      </button>
      <input
        class="form-input border rounded-md hidden sm:inline"
        bind:value="{searchterm}"
        placeholder="type to search..."
      />
    </div>
  </div>

  {#if filterVisible}
    <FilterSlideOver
      tags="{tags}"
      communities="{communities}"
      bind:selectedFilterTerms
      bind:searchterm
      on:click="{handleCloseFilter}"
      on:clicked-outside="{handleCloseFilter}"
    />
  {/if}

  {#if sorted.length}
    {#each sorted as day, d}
      <div in:fade="{{ delay: d * 200 }}">
        <h2
          class="sticky top-0 z-20 bg-white text-xl md:text-4xl leading-9 font-extrabold tracking-tight text-thatBlue-800 sm:leading-10 pt-4 mb-7 sm:mb-9 whitespace-nowrap"
        >
          {dayjs(day.dayOfYear).format("dddd MMMM D, 'YY")}
        </h2>

        {#each day.timeSlots as ts, t}
          <div class="relative">
            <h2
              class="sticky top-11 sm:top-13 z-10 bg-white text-xl md:text-4xl leading-9 font-extrabold tracking-tight text-thatOrange-400 sm:leading-10 whitespace-nowrap"
            >
              {#if !dayjs(ts.timeSlot).isValid()}
                Unscheduled
              {:else}{dayjs(ts.timeSlot).format('hh:mm a')}{/if}
            </h2>

            <div in:fade="{{ delay: t * 500 }}" class="mb-12">
              <ul
                class="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
              >
                {#each ts.activities as activity (activity.id)}
                  {#if isKeynote(activity)}
                    <li
                      in:fade
                      class="col-span-1 sm:col-span-2 lg:col-span-3 bg-white rounded-lg shadow-lg mt-10 mb-10"
                    >
                      <KeynoteCard {...activity} />
                    </li>
                  {:else}
                    <li
                      in:fade
                      class="col-span-1 bg-white rounded-lg shadow-lg"
                    >
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
  {:else}
    <div class="flex flex-col justify-center items-center">
      <img
        class="h-52 sm:h-64 lg:h-72 m-0 mt-24 lg:m-10"
        src="/images/characters/sasquatch.png"
        alt="Empty-handed Sasquatch"
      />
      <h1
        class="pt-10 pb-4 sm:pb-10 px-2 tracking-tight leading-10 font-bold text-thatBlue-600 text-3xl sm:text-4xl lg:text-5xl text-center"
      >
        {`Honestly, I tried, but there's nothing for "${searchterm}".`}
      </h1>
    </div>
  {/if}
</div>
