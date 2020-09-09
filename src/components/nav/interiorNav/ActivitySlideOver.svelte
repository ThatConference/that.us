<script>
  import { fade, fly } from 'svelte/transition';
  import { flip } from 'svelte/animate'; // todo we will need this when we really start to clear and add stuff to the list better.
  import Icon from 'svelte-awesome';
  import { externalLink } from 'svelte-awesome/icons';

  import { StandardLink } from '../../../elements';
  import { Activity } from '../../../elements/svgs';
  import SlideOver from '../../../elements/overlays/BasicSlideOver.svelte';

  import { messages } from '../../../store/notificationCenter';

  function handleClear() {
    messages.set([]);
  }
</script>

<SlideOver title="Recent Activities" on:click on:clicked-outside>
  <div class="flex items-center justify-center space-x-2" slot="header">
    <span class="text-thatOrange-400">
      <Activity delay="{750}" />
    </span>
    <h2 class="text-lg leading-7 font-medium text-gray-900">Activity Center</h2>
  </div>

  <div>
    <ul>
      {#each $messages as m, i (i)}
        <li animate:flip in:fade="{{ delay: i * 500, duration: 250 }}">
          <div
            class="flex space-x-3 items-center hover:text-that-blue
            cursor-pointer pb-2"
          >
            <Icon data="{externalLink}" class="h-4 w-4" />
            <StandardLink href="{m.url}">{m.message}</StandardLink>
          </div>
        </li>
      {/each}
    </ul>
  </div>

  <div slot="panelActions">

    <button
      type="button"
      class="py-2 px-4 border border-gray-300 rounded-md text-sm leading-5
      font-medium text-gray-700 hover:text-gray-500 focus:outline-none
      focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50
      active:text-gray-800 transition duration-150 ease-in-out"
      on:click="{handleClear}"
    >
      Clear
    </button>

  </div>
</SlideOver>
