<script>
  export let title;
  export let shortDescription;
  export let speakers;
  export let id;
  export let tags;
  export let startTime;
  export let status;
  export let durationInMinutes;
  export let slug;
  export let favoritedBy = [];

  // 3rd Party
  import { onMount } from 'svelte';
  import dayjs from 'dayjs';
  import isBetween from 'dayjs/plugin/isBetween';
  import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import Icon from 'svelte-awesome';
  import { Link } from 'yrv';
  import { heartO, heart, signIn, cog } from 'svelte-awesome/icons';
  import qs from 'query-string';
  import { getClient } from '@urql/svelte';
  import { isEmpty, find } from 'lodash';

  // UI Support
  import CalendarButton from './elements/CalendarButton.svelte';
  import { SocialLink } from '../social';
  import Success from '../notifications/Success.svelte';
  import { Avatars, Tag } from '../../elements';

  // Utility
  import config from '../../config';
  import {
    isAuthenticated,
    login,
    thatProfile,
  } from '../../utilities/security';
  import { truncate, isLongerThan } from '../../utilities/truncate';
  import metaTagsStore from '../../store/metaTags';

  // Data
  import favoritesApi from '../../dataSources/api.that.tech/favorites';
  import currentEvent from '../../store/currentEvent';

  dayjs.extend(isBetween);
  dayjs.extend(isSameOrAfter);
  dayjs.extend(relativeTime);

  const { toggle, get: getFavorites, favoritesStore: favorites } = favoritesApi(
    getClient(),
  );

  let host = speakers[0];
  let imageCrop = '?mask=ellipse&w=500&h=500&fit=crop';

  let { join, edit, isNew, isUpdated } = qs.parse(location.search);

  let favoriteDisabled = false;

  let incompleteProfile = true;
  $: if (!isEmpty($thatProfile)) {
    incompleteProfile = false;
  }

  const handleToggle = async () => {
    favoriteDisabled = true;
    await toggle(id, $currentEvent.eventId);
    favoriteDisabled = false;
  };

  let isFavorite = false;

  favorites.subscribe(favs => {
    let found = find(favs, i => i.id === id);

    found ? (isFavorite = true) : (isFavorite = false);
  });

  let isInWindow = false;
  $: canJoin = isInWindow;

  const canEdit = () => {
    let canEditMe = false;
    if (edit) {
      if (status === 'ACCEPTED') {
        if (dayjs(startTime).isSameOrAfter(dayjs(), 'day')) canEditMe = true;
      }
    }

    return canEditMe;
  };

  let timeLeftToJoin = 'in ...';
  let hasExpired = true;

  onMount(async () => {
    window.history.replaceState({}, null, `/activities/${id}`);

    if ($isAuthenticated) await getFavorites($currentEvent.eventId);

    let endTime = (durationInMinutes ? durationInMinutes : 60) + 10;

    if (status === 'ACCEPTED') {
      let currentStartTime = dayjs(startTime).subtract(5, 'minute');
      let currentEndTime = dayjs(startTime).add(endTime, 'minute');

      hasExpired = dayjs().isAfter(currentEndTime);

      const interval = setInterval(() => {
        timeLeftToJoin = dayjs().to(currentStartTime);
        let inSession = dayjs().isBetween(currentStartTime, currentEndTime);

        hasExpired = dayjs().isAfter(currentEndTime);
        isInWindow = inSession;

        if (!inSession) {
          const { join } = qs.parse(location.search);
          if (join) isInWindow = true;
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  });

  let userProfileImage = host.profileImage
    ? `${host.profileImage}${imageCrop}`
    : config.defaultProfileImage;

  metaTagsStore.set({
    title,
    description: isLongerThan(shortDescription, 60)
      ? `${truncate(shortDescription, 60)} ...`
      : shortDescription,
    openGraph: {
      type: 'website',
      url: `https://that.us/activities/${id}`,
    },
  });
</script>

{#if isNew}
  <Success
    title="Created {title}!"
    text="Thank you for submitting an activity."
  />
{:else if isUpdated}
  <Success title="Success 🎊" text="Successfully updated {title}." />
{/if}

<div>
  <!--header-->
  <div class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
    <div
      class="-ml-4 -mt-4 flex justify-between items-center flex-wrap
        sm:flex-nowrap flex-col md:flex-row"
    >
      <div class="ml-4 mt-4">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <Link href="/members/{host.profileSlug}" open>
              <span class="inline-block relative">
                <img
                  class="h-12 w-12 rounded-full"
                  src="{userProfileImage}"
                  alt=""
                />

                {#if host.earnedMeritBadges.length > 0}
                  <span class="absolute bottom-0 left-0 block h-5 w-5">
                    <img
                      src="{host.earnedMeritBadges[0].image}"
                      alt="{host.earnedMeritBadges[0].name}"
                    />
                  </span>
                {/if}
              </span>
            </Link>
          </div>
          <div class="ml-4">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              {`${host.firstName} ${host.lastName}`}
            </h3>

            <div>
              {#each host.profileLinks as link}
                <SocialLink href="{link.url}" network="{link.linkType}" />
              {/each}
            </div>
          </div>
        </div>
      </div>

      <div class="pt-4 -m-2 flex flex-wrap justify-center items-center">
        {#if !hasExpired}
          {#if $isAuthenticated && !incompleteProfile}
            <div class="mt-2 mx-2 rounded-md shadow-sm">
              <button
                type="button"
                on:click|preventDefault="{!favoriteDisabled && handleToggle}"
                class:text-thatRed-500="{isFavorite}"
                class="relative inline-flex items-center px-4 py-2 border-2
                  border-thatBlue-500 text-sm leading-5 font-medium rounded-md
                  text-gray-700 bg-white hover:text-gray-500 focus:outline-none
                  focus:ring-blue focus:border-blue-300
                  active:bg-gray-50 active:text-gray-800 transition duration-150
                  ease-in-out"
              >
                <Icon data="{heart}" class="-ml-1 mr-2 h-4 w-4" />
                {#if isFavorite}
                  <span>Unfavorite</span>
                {:else}<span>Favorite</span>{/if}
              </button>
            </div>
          {:else}
            <div class="mt-2 mx-2 rounded-md shadow-sm">
              <button
                type="button"
                on:click|preventDefault="{() => login(document.location.pathname, false)}"
                class="relative inline-flex items-center px-4 py-2 border-2
                  border-thatBlue-500 text-sm leading-5 font-medium rounded-md
                  text-gray-700 bg-white hover:text-gray-500 focus:outline-none
                  focus:ring-blue focus:border-blue-300
                  active:bg-gray-50 active:text-gray-800 transition duration-150
                  ease-in-out"
              >
                <Icon data="{heart}" class="-ml-1 mr-2 h-4 w-4" />
                <span>Favorite</span>
              </button>
            </div>
          {/if}
        {/if}

        {#if $isAuthenticated && !incompleteProfile}
          {#if canEdit()}
            <div class="mt-2 mx-2 rounded-md shadow-sm">
              <Link
                href="{`/activities/edit/${id}`}"
                type="button"
                class="inline-flex justify-center py-2 px-4 border-2
                  border-thatBlue-500 text-sm leading-5 font-medium rounded-md
                  text-thatBlue-500 bg-white hover:bg-thatBlue-500
                  hover:text-white focus:outline-none
                  focus:ring-thatBlue-500 focus:bg-thatBlue-500
                  focus:text-white focus:border-thatBlue-800
                  active:bg-thatBlue-800 transition duration-150 ease-in-out"
              >
                <Icon data="{cog}" class="-ml-1 mr-2 h-4 w-4" />
                <span>Edit</span>
              </Link>
            </div>
          {/if}
        {/if}

        {#if !hasExpired}
          {#if canJoin}
            <div class="mt-2 mx-2 rounded-md shadow-sm">
              <Link
                type="button"
                href="/join/{id}"
                class="relative inline-flex justify-center py-2 px-4 border-2
                  border-thatBlue-500 text-sm leading-5 font-medium rounded-md
                  text-thatBlue-500 bg-white hover:bg-thatBlue-500
                  hover:text-white focus:outline-none
                  focus:ring-thatBlue-500 focus:bg-thatBlue-500
                  focus:text-white focus:border-thatBlue-800
                  active:bg-thatBlue-800 transition duration-150 ease-in-out"
              >
                <Icon
                  data="{signIn}"
                  class="-ml-1 mr-2 h-4 w-4 text-gray-400"
                />
                <span>Join In</span>
              </Link>
            </div>
          {:else}
            <div class="mt-2 mx-2 rounded-md shadow-sm">
              <div
                class="border-2 border-thatBlue-500 text-sm leading-5
                  font-medium rounded-md text-thatBlue-500 bg-white
                  hover:bg-thatBlue-500 hover:text-white focus:outline-none
                  focus:ring-thatBlue-500 focus:bg-thatBlue-500
                  focus:text-white focus:border-thatBlue-800
                  active:bg-thatBlue-800 transition duration-150 ease-in-out"
              >
                <CalendarButton
                  title="{title}"
                  shortDescription="{shortDescription}"
                  id="{id}"
                  startTime="{startTime}"
                  durationInMinutes="{durationInMinutes}"
                  slug="{slug}"
                />
              </div>
            </div>

            <span class="mt-2 mx-2 rounded-md shadow-sm">
              <div
                class="relative inline-flex items-center px-4 py-2 border-2
                  border-gray-300 text-sm leading-5 font-medium rounded-md
                  text-gray-400 bg-white"
              >
                <Icon data="{signIn}" class="-ml-1 mr-2 h-4 w-4" />
                <span>Join {timeLeftToJoin}</span>
              </div>
            </span>
          {/if}
        {/if}
      </div>
    </div>
  </div>

  <!-- body -->

  <div class="px-4 py-5 sm:px-6 text-center md:text-left">
    <!-- Title -->
    <h2
      class="text-2xl sm:text-3xl md:text-4xl tracking-tight leading-10
        font-extrabold text-gray-900 sm:leading-none"
    >
      {title}
    </h2>

    <!-- Start Time -->
    <p
      class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:mx-auto md:mt-5
        md:text-xl lg:mx-0"
    >
      {#if durationInMinutes <= 60}
        {dayjs(startTime).format('dddd MMMM D, YYYY - h:mm A')}, for
        {dayjs.duration(durationInMinutes, 'minutes').as('hours')}
        hour.
      {:else}
        {dayjs(startTime).format('dddd MMMM D, YYYY - h:mm A')}, for
        {dayjs.duration(durationInMinutes, 'minutes').as('hours')}
        hours.
      {/if}
    </p>

    <!-- Description -->
    <p
      class="lineBreaks mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:mx-auto md:mt-5
        md:text-xl lg:mx-0"
    >
      {shortDescription}
    </p>

    <!-- Tags -->
    <div class="flex flex-wrap content-start space-x-4 py-12">
      {#each tags as t}
        <Tag>{t}</Tag>
      {/each}
    </div>

    <!-- Avatars -->
    <div class="flex flex-wrap items-center text-red-400 space-x-1">
      <Icon data="{heartO}" class="h-8 w-8" />
      <span>favorited by:</span>
      <div class="md:pl-2">
        <Avatars attendees="{favoritedBy}" />
      </div>
    </div>
  </div>
</div>
