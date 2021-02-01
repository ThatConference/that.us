<script>
  export let searchterm = '';
  export let tags;
  export let communities;
  export let selectedFilterTerms = [];

  import Icon from 'svelte-awesome';
  import { filter as filterIcon } from 'svelte-awesome/icons';

  import SlideOver from '../../elements/overlays/BasicSlideOver.svelte';
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
          placeholder="type to search..."
        />
      </div>
    </div>

    <div class="py-12 flex justify-between">
      <div class="mr-3">
        <h2 class="text-lg leading-7 font-medium text-gray-900">Tags</h2>

        <button
          type="button"
          class="inline-block my-2 px-4 py-2 rounded-md shadow text-base font-medium border-2
          border-thatBlue-500 text-thatBlue-500 bg-white hover:bg-thatBlue-500
          hover:text-white focus:bg-thatBlue-500 focus:text-white focus:outline-none
          focus:ring-thatBlue-500 focus:border-thatBlue-800 transition
          duration-150 ease-in-out"
          on:click="{() => {
            selectedFilterTerms = [];
          }}"
        >
          Clear selected tags
        </button>
      </div>

      <div class="my-2">
        <fieldset class="flex flex-col">
          {#each tags as tag}
            {#if tag.charAt(0) !== '@'}
              <label
                class="capitalize text-base text-gray-500 sm:text-lg sm:mx-auto md:mt-2 md:text-md lg:mx-0 whitespace-nowrap"
              >
                <input
                  type="checkbox"
                  bind:group="{selectedFilterTerms}"
                  value="{tag}"
                />
                <span class="px-2">{tag}</span>
              </label>
            {/if}
          {/each}
        </fieldset>
      </div>
      <div class="ml-3">
        <h2 class="mt-4 text-lg leading-7 font-medium text-gray-900">
          Communities
        </h2>
        <div class="mb-2">
          <fieldset class="flex flex-col">
            {#each communities as community}
              <label
                class="capitalize text-base text-gray-500 sm:text-lg sm:mx-auto md:mt-2 md:text-md lg:mx-0 whitespace-nowrap"
              >
                <input
                  type="checkbox"
                  bind:group="{selectedFilterTerms}"
                  value="@{community}"
                />
                <span class="px-2">@{community}</span>
              </label>
            {/each}
          </fieldset>
        </div>
      </div>
    </div>
  </div>
</SlideOver>
