<script>
  import { fade, fly } from 'svelte/transition';
  import { flip } from 'svelte/animate'; // todo we will need this when we really start to clear and add stuff to the list better.
  import Icon from 'svelte-awesome';
  import { externalLink } from 'svelte-awesome/icons';
  import {Link} from 'yrv';

  import { StandardLink } from '../../elements';
  import { Activity } from '../../elements/svgs';
  import SlideOver from '../../elements/overlays/BasicSlideOver.svelte';

  import { messages } from '../../store/notificationCenter';

  function handleClear() {
    messages.set([]);
  }

  export let searchterm = '';
  export let tags;
  export let selectedTags = [];
</script>

<SlideOver title="Search and Filter" on:click on:clicked-outside>
  <div class="space-y-6">
    <div class="space-y-2">
      <span class="text-lg leading-7 font-medium text-gray-900">
        Search and filter
      </span>

      <hr />

      <div class="my-2 border-gray-200">
        <input
          class="form-input w-full"
          bind:value="{searchterm}"
          placeholder="type to search..."
        />
      </div>
    </div>

    <div class="space-y-2">
      <span class="text-lg leading-7 font-medium text-gray-900">
        Tags
      </span>

      <hr />

      <div class="my-2">
        <fieldset class="flex flex-col">
          {#each tags as tag}
            <label class="capitalize">
              <input type="checkbox" bind:group={selectedTags} value={tag} />
              {tag}
            </label>
          {/each}
        </fieldset>
      </div>
    </div>
  </div>
</SlideOver>
