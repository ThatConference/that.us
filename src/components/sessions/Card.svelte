<script>
  export let editMode = false;
  export let id;
  export let title;
  export let shortDescription;
  export let startTime;
  export let speakers;
  export let status;
  export let tags = [];
  export let attendees = []; // todo.. needs to be favorites
  export let __typename; // just here to clean up props
  export let eventId = config.eventId; // just here to clean up props
  export let type = 'OPEN_SPACE'; // just here to clean up props

  // 3rd party
  import { onMount } from 'svelte';
  import { Link } from 'yrv';
  import dayjs from 'dayjs';
  import Icon from 'svelte-awesome';
  import { info, heart, signIn, cog } from 'svelte-awesome/icons';
  import qs from 'query-string';
  import { getClient } from '@urql/svelte';
  import _ from 'lodash';

  // supporting goo
  import config from '../../config';
  import { isAuthenticated } from '../../utilities/security';
  import { truncate } from '../../utilities/truncate';
  import favoritesApi from '../../dataSources/api.that.tech/favorites';

  // UI Elements
  import { Tag } from '../../elements';
  import CardLink from './CardLink.svelte';

  const { toggle, get: getFavorites, favoritesStore: favorites } = favoritesApi(
    getClient(),
  );
  let host = speakers[0];

  // todo.. need to make this based on date range...
  let canJoin = () => {
    let action = false;

    const { join } = qs.parse(location.search);
    if (join) action = true;

    return action;
  };

  let imageCrop = '?mask=ellipse&w=500&h=500&fit=crop';

  let favoriteDisabled = false;

  const handleToggle = async () => {
    favoriteDisabled = true;
    await toggle(id);
    favoriteDisabled = false;
  };

  let isFavorite = false;

  favorites.subscribe(favs => {
    let found = _.find(favs, i => i.id === id);

    found ? (isFavorite = true) : (isFavorite = false);
  });

  onMount(async () => {
    if ($isAuthenticated) await getFavorites();
  });
</script>

<div class="w-full flex items-center justify-between p-3 space-x-6">

  <div class="flex-1">
    <div class="flex items-center space-x-3">

      <Link
        open
        href="https://www.thatconference.com/member/{host.profileSlug}"
      >
        <img
          class="w-15 h-15 bg-gray-300 rounded-full flex-shrink-0"
          src="{`${host.profileImage}${imageCrop}`}"
          alt="{`${host.firstName} ${host.lastName}`}"
        />
      </Link>
      <h3 class="text-gray-900 text-sm leading-5 font-medium break-words">
        {title}
      </h3>
    </div>

  </div>
</div>

<div class="px-3">
  <p class="text-gray-500 text-sm leading-5 break-words">
    {truncate(shortDescription, 25)}
  </p>
</div>

<div class="flex flex-wrap items-center justify-around space-x-2 px-6 py-2">
  {#each tags as t}
    <Tag>{t}</Tag>
  {/each}
</div>

<div class="border-t border-gray-200">
  <div class="-mt-px flex">
    <div class="w-0 flex-1 flex border-r border-gray-200">
      <CardLink href="/sessions/{id}" icon="{info}" text="{'More Details'}" />
    </div>
    {#if $isAuthenticated}
      {#if canJoin()}
        <div class="-ml-px w-0 flex-1 flex">
          <CardLink href="/join/{id}" icon="{signIn}" text="{'Join In'}" />
        </div>
      {:else if editMode}
        <div class="-ml-px w-0 flex-1 flex">
          <Link
            href="/sessions/edit/{id}"
            class="relative w-0 flex-1 inline-flex items-center justify-center
            py-4 text-sm leading-5 text-gray-700 font-medium border
            border-transparent rounded-br-lg hover:text-gray-300
            focus:outline-none focus:shadow-outline-blue focus:border-blue-300
            focus:z-10 transition ease-in-out duration-150"
          >

            <Icon data="{cog}" class="w-5 h-5" />
            <span class="ml-3">Edit</span>
          </Link>
        </div>
      {:else}
        <div class="-ml-px w-0 flex-1 flex">
          <button
            on:click|preventDefault="{!favoriteDisabled && handleToggle}"
            class:text-red-500="{isFavorite}"
            class="relative w-0 flex-1 inline-flex items-center justify-center
            py-4 text-sm leading-5 text-gray-700 font-medium border
            border-transparent rounded-br-lg hover:text-gray-300
            focus:outline-none focus:shadow-outline-blue focus:border-blue-300
            focus:z-10 transition ease-in-out duration-150"
          >

            <Icon data="{heart}" class="w-5 h-5" />
            <span class="ml-3">Favorite</span>
          </button>
        </div>
      {/if}
    {/if}
  </div>
</div>
