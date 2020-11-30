<script>
  export let editMode = false;
  export let id;
  export let title;
  export let shortDescription;
  export let startTime;
  export let durationInMinutes;
  export let speakers;
  export let tags = [];

  // 3rd party
  import { onMount } from 'svelte';
  import { Link } from 'yrv';
  import dayjs from 'dayjs';
  import isBetween from 'dayjs/plugin/isBetween';
  import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import Icon from 'svelte-awesome';
  import { info, heart, signIn, cog, caretDown } from 'svelte-awesome/icons';
  import qs from 'query-string';
  import { getClient } from '@urql/svelte';
  import { isEmpty, find } from 'lodash';

  // utilties
  import config from '../../config';
  import {
    login,
    isAuthenticated,
    thatProfile,
  } from '../../utilities/security';
  import { truncate, isLongerThan } from '../../utilities/truncate';

  // data
  import favoritesApi from '../../dataSources/api.that.tech/favorites';
  import { show } from '../../store/profileNotification';
  import currentEvent from '../../store/currentEvent';

  // UI Elements
  import { Tag } from '../../elements';
  import CardLink from './CardLink.svelte';

  dayjs.extend(isBetween);
  dayjs.extend(isSameOrAfter);
  dayjs.extend(relativeTime);

  const { toggle, get: getFavorites, favoritesStore: favorites } = favoritesApi(
    getClient(),
  );
  let host = speakers[0];

  let imageCrop = '?mask=ellipse&w=500&h=500&fit=crop';
  let favoriteDisabled = false;

  const isAllowed = () => {
    let permitted = false;

    if (isEmpty($thatProfile)) {
      show.set(new Boolean(true));
      permitted = false;
    } else {
      permitted = true;
    }

    return permitted;
  };

  const handleToggle = async () => {
    if (isAllowed()) {
      favoriteDisabled = true;
      await toggle(id, $currentEvent.eventId);
      favoriteDisabled = false;
    }
  };

  let expandDescription = false;

  let isFavorite = false;
  favorites.subscribe(favs => {
    let found = find(favs, i => i.id === id);

    found ? (isFavorite = true) : (isFavorite = false);
  });

  let timeLeftToJoin = 'in ...';
  let hasExpired = true;
  let isInWindow = false;
  $: canJoin = isInWindow;

  onMount(async () => {
    if ($isAuthenticated) await getFavorites($currentEvent.eventId);

    let endTime = (durationInMinutes ? durationInMinutes : 60) + 10;
    let currentStartTime = dayjs(startTime).subtract(5, 'minute');
    let currentEndTime = dayjs(startTime).add(endTime, 'minute');

    const interval = setInterval(() => {
      let inSession = dayjs().isBetween(currentStartTime, currentEndTime);

      isInWindow = inSession;
      timeLeftToJoin = dayjs().to(currentStartTime);
      hasExpired = dayjs().isAfter(currentEndTime);

      if (!inSession) {
        const { join } = qs.parse(location.search);
        if (join) isInWindow = true;
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  let userProfileImage = host.profileImage
    ? `${host.profileImage}${imageCrop}`
    : config.defaultProfileImage;

  const canEdit = () => {
    let canEditMe = false;

    if (editMode) {
      if (dayjs(startTime).isSameOrAfter(dayjs(), 'day')) canEditMe = true;
    }

    return canEditMe;
  };
</script>

<div class="w-full h-full flex flex-col">
  <div class="flex items-center p-3 space-x-3">
    <Link open href="/members/{host.profileSlug}" class="flex-shrink-0">
      <span class="inline-block relative">
        <img
          class="w-15 h-15 rounded-full"
          src="{userProfileImage}"
          alt="{`${host.firstName} ${host.lastName}`}"
        />

        {#if host.earnedMeritBadges.length > 0}
          <span class="absolute bottom-0 left-0 block h-6 w-6">
            <img
              src="{host.earnedMeritBadges[0].image}"
              alt="{host.earnedMeritBadges[0].name}"
            />
          </span>
        {/if}
      </span>
    </Link>
    <div class="flex flex-col">
      <h3 class="text-gray-900 text-sm leading-5 font-medium break-words">
        {title}
      </h3>
      <h3 class="text-gray-400 text-sm leading-5 pt-2">
        {`${host.firstName} ${host.lastName}`}
      </h3>
    </div>
  </div>

  <div
    class="flex-grow p-3"
    class:cursor-pointer="{isLongerThan(shortDescription, 25)}"
    on:click|preventDefault="{() => (expandDescription = !expandDescription)}"
  >
    <p class="text-gray-500 text-sm leading-5 break-words">
      {#if expandDescription}
        <span class="lineBreaks">{shortDescription}</span>
      {:else}
        <div class:hover:text-gray-300="{isLongerThan(shortDescription, 25)}">
          <span>{truncate(shortDescription, 25)}</span>
          {#if isLongerThan(shortDescription, 25)}
            <Icon data="{caretDown}" class="ml-2" />
          {/if}
        </div>
      {/if}
    </p>
  </div>

  <div class="flex flex-wrap items-center justify-center space-x-4 px-4 pb-5">
    {#each tags as t}
      <Tag>{t}</Tag>
    {/each}
  </div>

  <div class="flex-none border-t border-gray-200">
    <div class="-mt-px flex">
      <div class="w-0 flex-1 flex">
        <CardLink
          href="/activities/{id}"
          icon="{info}"
          text="{'More Details'}"
        />
      </div>

      {#if !hasExpired}
        {#if $isAuthenticated}
          <div class="-ml-px w-0 flex-1 flex border-l border-gray-200">
            <button
              on:click|preventDefault="{!favoriteDisabled && handleToggle}"
              class:text-red-500="{isFavorite}"
              class="relative w-0 flex-1 inline-flex items-center justify-center
                py-2 text-xs leading-4 text-gray-700 font-medium border
                border-transparent rounded-br-lg hover:text-gray-300
                focus:outline-none focus:ring-blue
                focus:border-blue-300 focus:z-10 transition ease-in-out
                duration-150"
            >
              <Icon data="{heart}" class="w-4 h-4" />
              <span class="ml-3">Favorite</span>
            </button>
          </div>
        {:else}
          <div class="-ml-px w-0 flex-1 flex border-l border-gray-200">
            <button
              on:click|preventDefault="{() => login(document.location.pathname, false)}"
              class="relative w-0 flex-1 inline-flex items-center justify-center
                py-2 text-xs leading-4 text-gray-700 font-medium border
                border-transparent rounded-br-lg hover:text-gray-300
                focus:outline-none focus:ring-blue
                focus:border-blue-300 focus:z-10 transition ease-in-out
                duration-150"
            >
              <Icon data="{heart}" class="w-4 h-4" />
              <span class="ml-3">Favorite</span>
            </button>
          </div>
        {/if}
      {/if}

      {#if $isAuthenticated}
        {#if canEdit()}
          <div class="-ml-px w-0 flex-1 flex border-l border-gray-200">
            <Link
              href="/activities/edit/{id}"
              class="relative w-0 flex-1 inline-flex items-center justify-center
                py-2 text-xs leading-4 text-gray-700 font-medium border
                border-transparent rounded-br-lg hover:text-gray-300
                focus:outline-none focus:ring-blue
                focus:border-blue-300 focus:z-10 transition ease-in-out
                duration-150"
            >
              <Icon data="{cog}" class="w-4 h-4" />
              <span class="ml-3">Edit</span>
            </Link>
          </div>
        {/if}
      {/if}
    </div>
  </div>

  {#if !hasExpired}
    <div class="flex-none border-t border-gray-200">
      <div class="-mt-px flex">
        {#if canJoin}
          <div class="-ml-px w-0 flex-1 flex">
            <CardLink href="/join/{id}" icon="{signIn}" text="{'Join In'}" />
          </div>
        {:else}
          <div class="-ml-px w-0 flex-1 flex">
            <div
              class="relative w-0 flex-1 inline-flex items-center justify-center
                py-2 text-xs leading-4 text-gray-300 font-medium border
                border-transparent rounded-br-lg transition ease-in-out
                duration-150"
            >
              <Icon data="{signIn}" class="-ml-1 mr-2 h-4 w-4" />
              <span>Join {timeLeftToJoin}</span>
            </div>
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>
