<script>
  export let darkMode = false;

  import { user as userIcon } from 'svelte-awesome/icons';
  import Icon from 'svelte-awesome';
  import { Link } from 'yrv';
  import { isEmpty } from 'lodash';

  import {
    login,
    isAuthenticated,
    thatProfile,
  } from '../../utilities/security.js';

  const loggedInMenuItems = [
    {
      link: '/my/profiles',
      text: 'My Profiles',
    },
    {
      link: '/my/settings',
      text: 'My Settings',
    },
    {
      link: '/my/submissions',
      text: 'My Submissions',
    },
    {
      link: '/my/favorites',
      text: 'My Favorites',
    },

    {
      link: '/logout',
      text: 'Logout',
    },
  ];
</script>

<div class="pb-3 border-t border-thatBlue-400">
  {#if $isAuthenticated}
    <div class="relative grid gap-6 px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
      <div class="-m-3 p-3 flex items-start">
        <div
          class="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-that-orange">
          {#if isEmpty($thatProfile) || !$thatProfile.profileImage}
            <Icon
              data="{userIcon}"
              class="h-8 w-8 rounded-full text-white bg-that-orange" />
          {:else}
            <img
              class="h-12 w-12 rounded-full"
              src="{$thatProfile.profileImage}?w=256&h=256&fit=crop"
              alt="" />
          {/if}
        </div>
        <div class="ml-4">
          {#if !isEmpty($thatProfile)}
            <p
              class="text-base font-medium text-white"
              class:text-gray-800="{darkMode}">
              {$thatProfile.firstName}
              {$thatProfile.lastName}
            </p>
            <p class="text-sm text-gray-300">
              {$thatProfile.email}
            </p>
          {/if}
        </div>
      </div>
    </div>
  {/if}

  <div class="px-2">
    {#if $isAuthenticated}
      {#if isEmpty($thatProfile)}
        <Link
          href="/my/profiles/primary"
          class="block px-3 pb-2 rounded-md text-base font-medium
           hover:bg-that-blue focus:outline-none focus:text-white focus:bg-that-blue">
          <span
            class="text-gray-300 hover:text-white"
            class:text-gray-800="{darkMode}">
            Create Profile
          </span>
        </Link>
        <a
          href="/logout"
          class="mt-1 block px-3 py-2 rounded-md text-base font-medium hover:bg-that-blue
            focus:outline-none focus:text-white focus:bg-that-blue">
          <span
            class="text-gray-300 hover:text-white"
            class:text-gray-800="{darkMode}">
            Logout
          </span>
        </a>
      {:else}
        <div class="flex flex-col space-y-2">
          {#each loggedInMenuItems as l}
            <div
              class="flex px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-that-blue focus:outline-none focus:text-white focus:bg-that-blue"
              class:text-gray-800="{darkMode}">
              <Link href="{l.link}">{l.text}</Link>
            </div>
          {/each}
        </div>
      {/if}
    {:else}
      <div class="flex flex-row">
        <a
          href
          on:click|stopPropagation="{() =>
            login(document.location.pathname, false)}"
          class="mt-4 mb-1 mr-1 block w-full bg-white rounded-md py-2 text-sm font-semibold text-that-blue text-center flex-grow">
          Login
        </a>
        <a
          href
          on:click|stopPropagation="{() =>
            login(document.location.pathname, true)}"
          class="mt-4 mb-1 ml-1 block w-full bg-that-orange rounded-md py-2 text-sm font-semibold text-white text-center flex-grow">
          Sign Up
        </a>
      </div>
    {/if}
  </div>
</div>
