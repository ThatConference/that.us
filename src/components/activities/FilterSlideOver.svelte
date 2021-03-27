<script>
  export let searchterm = '';
  export let tags;
  export let communities;
  export let events = [];
  export let selectedFilterTerms = [];

  import Icon from 'svelte-awesome';
  import { filter as filterIcon, externalLink } from 'svelte-awesome/icons';

  import { StandardLink } from '../../elements';
  import SlideOver from '../../elements/overlays/BasicSlideOver.svelte';

  import config from '../../config';

  $: eventsModified = events.filter(e => e.id !== config.eventId);
</script>

<SlideOver title="Search and Filter" on:click on:clicked-outside>
  <div class="flex items-center justify-center space-x-2" slot="header">
    <span class="text-thatOrange-400">
      <Icon data="{filterIcon}" label="Filter" class="h-8 w-8" />
    </span>
    <h2 class="text-lg leading-7 font-medium text-gray-900">
      Activity Filters
    </h2>
  </div>

  <div class="flex flex-col divide-y divide-gray-400">
    <div class="py-12">
      <h2 class="text-lg leading-7 font-medium text-gray-900">Text Search</h2>

      <div class="my-2 border-gray-200">
        <input
          class="form-input w-full border rounded-md"
          bind:value="{searchterm}"
          placeholder="type to search..." />
      </div>
    </div>

    {#if eventsModified.length > 0}
      <div class="py-12">
        <h2 class="text-lg leading-7 font-medium text-gray-900">Events</h2>

        <div class="my-2 border-gray-200">
          <ul>
            {#each eventsModified as event}
              <li>
                <div
                  class="flex space-x-3 items-center hover:text-that-blue cursor-pointer pb-2">
                  <div>
                    <Icon data="{externalLink}" class="h-4 w-4" />
                  </div>
                  <div>
                    <StandardLink href="{`/activities/${event.slug}`}"
                      >{event.name}</StandardLink>
                  </div>
                </div>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    {/if}

    <div class="px-4 py-12 grid grid-cols-2 gap-6">
      <div>
        <h2 class="text-lg leading-7 font-medium text-gray-900">Tags</h2>
        <fieldset class="flex flex-col">
          {#each tags as tag}
            {#if tag.charAt(0) !== '@'}
              <label
                class="capitalize text-base text-gray-500 sm:text-lg md:mt-2 md:text-md lg:mx-0 whitespace-nowrap">
                <input
                  type="checkbox"
                  bind:group="{selectedFilterTerms}"
                  value="{tag}" />
                <span class="px-2">{tag}</span>
              </label>
            {/if}
          {/each}
        </fieldset>
      </div>
      <div>
        <h2 class="text-lg leading-7 font-medium text-gray-900">Communities</h2>
        <div class="mb-2">
          <fieldset class="flex flex-col">
            {#each communities as community}
              <label
                class="capitalize text-base text-gray-500 sm:text-lg md:mt-2 md:text-md lg:mx-0 whitespace-nowrap">
                <input
                  type="checkbox"
                  bind:group="{selectedFilterTerms}"
                  value="@{community}" />
                <span class="px-2">@{community}</span>
              </label>
            {/each}
          </fieldset>
        </div>
      </div>
    </div>
  </div>
  <div slot="panelActions">
    {#if selectedFilterTerms.length}
      <button
        type="button"
        class="py-2 px-4 border border-gray-300 rounded-md text-sm leading-5
        font-medium text-gray-700 hover:text-gray-500 focus:outline-none
        focus:border-blue-300 focus:ring-blue active:bg-gray-50
        active:text-gray-800 transition duration-150 ease-in-out"
        on:click="{() => {
          selectedFilterTerms = [];
        }}">
        {`Clear ${selectedFilterTerms.length} selected filter${
          selectedFilterTerms.length > 1 ? 's' : ''
        }`}
      </button>
    {/if}
  </div>
</SlideOver>
