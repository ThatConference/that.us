<script>
  export let community;
  export let isFollowing = false;

  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  import Icon from 'svelte-awesome';
  import { share } from 'svelte-awesome/icons';
  import Clipboard from 'clipboard';
  import dayjs from 'dayjs';

  import { Standard as StandardButton } from '../../elements/buttons';
  import { Tag } from '../../elements';
  import Header from '../../elements/layouts/profile/_Header.svelte';
  import { isAuthenticated } from '../../utilities/security.js';

  const dispatch = createEventDispatcher();
  let clipboard;
  let copiedText;

  onMount(() => {
    clipboard = new Clipboard('#shareUrl');

    clipboard.on('success', function (e) {
      copiedText = 'Copied!';
    });
  });

  onDestroy(() => {
    clipboard.destroy();
  });
</script>

<section class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div class="lg:grid lg:grid-cols-12 lg:gap-8">
    <div class="max-w-2xl mx-auto flex justify-center lg:col-span-3">
      <img
        class="w-full max-h-60"
        src="{community.logo}"
        alt="javascript logo"
      />
    </div>
    <div class="mt-12 lg:mt-0 lg:col-start-4 lg:col-span-9">
      <div class="flex flex-col space-y-8">
        <div class="flex items-center justify-between">
          <div>
            <Header subtitle="Community Spotlight">{community.name}</Header>
            <h3 class="font-bold tracking-tight text-gray-500">
              Created on
              {dayjs(community.createdAt).format('MMMM, YYYY')}
            </h3>
          </div>

          <div class="flex justify-end space-x-4">
            <button
              id="shareUrl"
              data-clipboard-text="{`https://that.us/communities/${community.slug}`}"
              class="px-4 py-2 rounded-md shadow text-base leading-6 font-medium border-2
                border-thatBlue-500 text-thatBlue-500 bg-white hover:bg-thatBlue-500
                hover:text-white focus:bg-thatBlue-500 focus:text-white focus:outline-none
                focus:ring-thatBlue-500 focus:border-thatBlue-800 transition
                duration-150 ease-in-out md:text-lg md:px-10"
            >
              {#if copiedText}
                <span>{copiedText}</span>
              {:else}
                <Icon data="{share}" class="" />
              {/if}
            </button>

            {#if $isAuthenticated}
              <StandardButton
                class="h-3/4"
                on:click="{() => dispatch('community-follow')}"
              >
                {#if !isFollowing}Follow{:else}Un-Follow{/if}
              </StandardButton>
            {/if}
          </div>
        </div>

        <div class="leading-8 text-lg font-medium text-gray-900">
          <p class="lineBreaks">{community.description}</p>
        </div>

        <div class="flex flex-wrap justify-center items-center space-x-4">
          {#each community.tags as tag, i (i)}
            <div in:fade="{{ delay: i * 100 }}">
              <Tag>{tag}</Tag>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>
