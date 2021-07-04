<script>
  import { getContext } from 'svelte';
  import {
    login,
    isAuthenticated,
    thatProfile,
  } from '../../../utilities/security.js';
  import { Link } from 'yrv';
  import { isEmpty } from 'lodash';

  import Icon from 'svelte-awesome';
  import { user as userIcon } from 'svelte-awesome/icons';

  const mobileVisible = getContext('IS_Mobile_VIEW');
</script>

<div
  class="border-b border-gray-700 lg:hidden"
  class:hidden="{!$mobileVisible}"
  class:block="{$mobileVisible}">
  <div class="px-2 py-3 sm:px-3">
    <Link
      href="/events"
      class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300
        hover:text-white hover:bg-that-blue focus:outline-none focus:text-white
        focus:bg-that-blue">
      Events
    </Link>
    <Link
      href="/activities"
      class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300
        hover:text-white hover:bg-that-blue focus:outline-none focus:text-white
        focus:bg-that-blue">
      Activities
    </Link>
    <Link
      href="/members"
      class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300
        hover:text-white hover:bg-that-blue focus:outline-none focus:text-white
        focus:bg-that-blue">
      Members
    </Link>
    <Link
      href="/partners"
      class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300
        hover:text-white hover:bg-that-blue focus:outline-none focus:text-white
        focus:bg-that-blue">
      Partners
    </Link>
    <Link
      href="/communities"
      class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300
        hover:text-white hover:bg-that-blue focus:outline-none focus:text-white
        focus:bg-that-blue">
      Communities
    </Link>
    <Link
      href="/support/welcome"
      class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300
        hover:text-white hover:bg-that-blue focus:outline-none focus:text-white
        focus:bg-that-blue">
      Help
    </Link>
  </div>

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
              <p class="text-base font-medium text-white">
                {$thatProfile.firstName}
                {$thatProfile.lastName}
              </p>
              <p class="text-sm text-gray-300">{$thatProfile.email}</p>
            {/if}
          </div>
        </div>
      </div>
    {/if}

    <div
      class="px-2"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu">
      {#if $isAuthenticated}
        {#if isEmpty($thatProfile)}
          <Link
            href="/my/settings/profile"
            class="block px-3 pb-2 rounded-md text-base font-medium
              text-gray-300 hover:text-white hover:bg-that-blue
              focus:outline-none focus:text-white focus:bg-that-blue"
            role="menuitem">
            Create Profile
          </Link>
          <a
            href="/logout"
            class="mt-1 block px-3 py-2 rounded-md text-base font-medium
              text-gray-300 hover:text-white hover:bg-that-blue
              focus:outline-none focus:text-white focus:bg-that-blue"
            role="menuitem">
            Logout
          </a>
        {:else}
          <Link
            href="/my/settings"
            class="block px-3 pb-2 rounded-md text-base font-medium
              text-gray-300 hover:text-white hover:bg-that-blue
              focus:outline-none focus:text-white focus:bg-that-blue"
            role="menuitem">
            My Settings
          </Link>
          <Link
            href="/my/favorites"
            class="block px-3 py-2 rounded-md text-base font-medium
              text-gray-300 hover:text-white hover:bg-that-blue
              focus:outline-none focus:text-white focus:bg-that-blue"
            role="menuitem">
            My Favorites
          </Link>
          <Link
            href="/my/submissions"
            class="block px-3 py-2 rounded-md text-base font-medium
              text-gray-300 hover:text-white hover:bg-that-blue
              focus:outline-none focus:text-white focus:bg-that-blue"
            role="menuitem">
            My Submissions
          </Link>

          <a
            href="/logout"
            class="mt-1 block px-3 py-2 rounded-md text-base font-medium
              text-gray-300 hover:text-white hover:bg-that-blue
              focus:outline-none focus:text-white focus:bg-that-blue"
            role="menuitem">
            Logout
          </a>
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
</div>
