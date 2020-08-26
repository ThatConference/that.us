<script>
  export let title;
  export let shortDescription;
  export let speakers;
  export let id;
  export let tags;
  export let startTime;
  export let status;
  export let durationInMinutes;
  export let favoritedBy = [];

  // 3rd Party
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import dayjs from 'dayjs';
  import isBetween from 'dayjs/plugin/isBetween';
  import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import Icon from 'svelte-awesome';
  import { Link, navigateTo } from 'yrv';
  import {
    heartO,
    heart,
    signIn,
    facebook,
    twitter,
    instagram,
    github,
    cog,
    calendarCheckO,
  } from 'svelte-awesome/icons';
  import qs from 'query-string';
  import { getClient } from '@urql/svelte';
  import _ from 'lodash';

  // UI Support
  import { SocialLink } from '../../components/social';
  import Success from '../../components/notifications/Success.svelte';
  import { Avatars, LinkButton, Tag } from '../../elements';

  // Utility
  import config from '../../config';
  import { isAuthenticated, thatProfile } from '../../utilities/security';
  import { truncate, isLongerThan } from '../../utilities/truncate';
  import ical from '../../utilities/ical.js';
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
  $: if (!_.isEmpty($thatProfile)) {
    incompleteProfile = false;
  }

  const handleToggle = async () => {
    favoriteDisabled = true;
    await toggle(id, $currentEvent.eventId);
    favoriteDisabled = false;
  };

  let isFavorite = false;

  favorites.subscribe(favs => {
    let found = _.find(favs, i => i.id === id);

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
    window.history.replaceState({}, null, `/sessions/${id}`);

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

  let disqus_config = function() {
    this.page.url = window.location.pathname; // Replace PAGE_URL with your page's canonical URL variabl
  };

  let userProfileImage = host.profileImage
    ? `${host.profileImage}${imageCrop}`
    : config.defaultProfileImage;

  const createICal = () => {
    return ical(title).create({
      title,
      shortDescription,
      id,
      startTime,
      durationInMinutes,
    });
  };

  metaTagsStore.set({
    title,
    description: isLongerThan(shortDescription, 60)
      ? `${truncate(shortDescription, 60)} ...`
      : shortDescription,
    openGraph: {
      type: 'website',
      url: `https://that.us/sessions/${id}`,
    },
  });
</script>

{#if isNew}
  <Success
    title="Created {title}!"
    text="Thank you for submitting a session."
  />
{:else if isUpdated}
  <Success title="Success 🎊" text="Successfully updated {title}." />
{/if}

<div>
  <!--header-->
  <div class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
    <div
      class="-ml-4 -mt-4 flex justify-between items-center flex-wrap
      md:flex-no-wrap sm:flex-col lg:flex-row"
    >
      <div class="ml-4 mt-4">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <Link
              href="https://www.thatconference.com/member/{host.profileSlug}"
              open
            >
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

      {#if $isAuthenticated}
        {#if !incompleteProfile}
          <div class="ml-4 mt-4 flex-shrink-1 sm:flex-wrap">
            {#if !hasExpired}
              <span class="inline-flex rounded-md shadow-sm">
                <button
                  type="button"
                  on:click|preventDefault="{!favoriteDisabled && handleToggle}"
                  class:text-thatRed-500="{isFavorite}"
                  class="relative inline-flex items-center px-4 py-2 border-2
                  border-thatBlue-500 text-sm leading-5 font-medium rounded-md
                  text-gray-700 bg-white hover:text-gray-500 focus:outline-none
                  focus:shadow-outline-blue focus:border-blue-300
                  active:bg-gray-50 active:text-gray-800 transition duration-150
                  ease-in-out"
                >
                  <Icon data="{heart}" class="-ml-1 mr-2 h-5 w-5" />
                  {#if isFavorite}
                    <span>Unfavorite</span>
                  {:else}
                    <span>Favorite</span>
                  {/if}
                </button>
              </span>

              {#if canJoin}
                <span class="mt-1 inline-flex rounded-md shadow-sm">
                  <Link
                    type="button"
                    href="/join/{id}"
                    class="inline-flex justify-center py-2 px-4 border-2
                    border-thatBlue-500 text-sm leading-5 font-medium rounded-md
                    text-thatBlue-500 bg-white hover:bg-thatBlue-500
                    hover:text-white focus:outline-none
                    focus:shadow-outline-thatBlue-500 focus:bg-thatBlue-500
                    focus:text-white focus:border-thatBlue-800
                    active:bg-thatBlue-800 transition duration-150 ease-in-out"
                  >

                    <Icon
                      data="{signIn}"
                      class="-ml-1 mr-2 h-5 w-5 text-gray-400"
                    />
                    <span>Join In</span>
                  </Link>
                </span>
              {:else}
                <span class="mt-1 inline-flex rounded-md shadow-sm">
                  <a
                    href="{createICal()}"
                    download="{`THAT-${id}.ics`}"
                    class="inline-flex justify-center py-2 px-4 border-2
                    border-thatBlue-500 text-sm leading-5 font-medium rounded-md
                    text-thatBlue-500 bg-white hover:bg-thatBlue-500
                    hover:text-white focus:outline-none
                    focus:shadow-outline-thatBlue-500 focus:bg-thatBlue-500
                    focus:text-white focus:border-thatBlue-800
                    active:bg-thatBlue-800 transition duration-150 ease-in-out"
                  >
                    <Icon data="{calendarCheckO}" class="-ml-1 mr-2 h-5 w-5" />
                    <span>Add To Calendar</span>
                  </a>
                </span>

                <span class="mt-1 inline-flex rounded-md shadow-sm">
                  <div
                    class="relative inline-flex items-center px-4 py-2 border-2
                    border-gray-300 text-sm leading-5 font-medium rounded-md
                    text-gray-400 bg-white"
                  >
                    <Icon data="{signIn}" class="-ml-1 mr-2 h-5 w-5" />
                    <span>Join {timeLeftToJoin}</span>
                  </div>
                </span>
              {/if}
            {/if}

            {#if canEdit()}
              <span class="mt-1 inline-flex rounded-md shadow-sm">
                <Link
                  href="{`/sessions/edit/${id}`}"
                  type="button"
                  class="inline-flex justify-center py-2 px-4 border-2
                  border-thatBlue-500 text-sm leading-5 font-medium rounded-md
                  text-thatBlue-500 bg-white hover:bg-thatBlue-500
                  hover:text-white focus:outline-none
                  focus:shadow-outline-thatBlue-500 focus:bg-thatBlue-500
                  focus:text-white focus:border-thatBlue-800
                  active:bg-thatBlue-800 transition duration-150 ease-in-out"
                >
                  <Icon data="{cog}" class="-ml-1 mr-2 h-5 w-5" />
                  <span>Edit</span>
                </Link>
              </span>
            {/if}
          </div>
        {/if}
      {/if}
    </div>
  </div>

  <!-- body -->

  <div class="px-4 py-5 sm:px-6 sm:text-center lg:text-left">

    <!-- Title -->
    <h2
      class="text-2xl sm:text-3xl md:text-4xl tracking-tight leading-10
      font-extrabold text-gray-900 sm:leading-none "
    >
      {title}
    </h2>

    <!-- Start Time -->
    <p
      class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:mx-auto md:mt-5
      md:text-xl lg:mx-0"
    >

      {#if durationInMinutes <= 60}
        {dayjs(startTime).format('dddd MMMM D, YYYY - h:mm A')}, for {dayjs
          .duration(durationInMinutes, 'minutes')
          .as('hours')} hour.
      {:else}
        {dayjs(startTime).format('dddd MMMM D, YYYY - h:mm A')}, for {dayjs
          .duration(durationInMinutes, 'minutes')
          .as('hours')} hours.
      {/if}
    </p>

    <!-- Description -->
    <p
      class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:mx-auto md:mt-5
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
    <div class="flex flex-wrap items-center text-red-400 space-x-1 ">
      <Icon data="{heartO}" class="h-8 w-8" />
      <span>favorited by:</span>
      <div class="md:pl-2">
        <Avatars attendees="{favoritedBy}" />
      </div>
    </div>

    <!-- Disqus -->
    <div class="px-4 py-12 sm:px-6" class:hidden="{!$isAuthenticated}">
      <div id="disqus_thread"></div>
    </div>

  </div>
</div>
