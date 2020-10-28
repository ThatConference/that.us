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
  class="border-b border-gray-700 md:hidden"
  class:hidden="{!$mobileVisible}"
  class:block="{$mobileVisible}"
>
  <div class="px-2 py-3 sm:px-3">
    <Link
      href="/activities"
      class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300
        hover:text-white hover:bg-that-blue focus:outline-none focus:text-white
        focus:bg-that-blue"
    >
      Activities
    </Link>
    <Link
      href="/members"
      class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300
        hover:text-white hover:bg-that-blue focus:outline-none focus:text-white
        focus:bg-that-blue"
    >
      Members
    </Link>
    <Link
      href="/partners"
      class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300
        hover:text-white hover:bg-that-blue focus:outline-none focus:text-white
        focus:bg-that-blue"
    >
      Partners
    </Link>
    <Link
      href="/communities"
      class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300
        hover:text-white hover:bg-that-blue focus:outline-none focus:text-white
        focus:bg-that-blue"
    >
      Communities
    </Link>
    <Link
      href="/support/welcome"
      class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300
        hover:text-white hover:bg-that-blue focus:outline-none focus:text-white
        focus:bg-that-blue"
    >
      Help
    </Link>
  </div>

  <div class="pt-4 pb-3 border-t border-gray-700">
    <div class="flex items-center px-5">
      <div class="flex-shrink-0">
        {#if $isAuthenticated}
          {#if isEmpty($thatProfile)}
            <span class="inline-block relative">
              <Icon data="{userIcon}" class="h-8 w-8 rounded-full text-white" />
              <span
                class="absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full
                  bg-red-400"
              ></span>
            </span>
          {:else if $thatProfile.profileImage}
            <img
              class="h-8 w-8 rounded-full"
              src="{$thatProfile.profileImage}?w=256&h=256&fit=crop"
              alt=""
            />
          {:else}
            <Icon data="{userIcon}" class="h-8 w-8 rounded-full text-white" />
          {/if}
        {:else}
          <Icon data="{userIcon}" class="h-8 w-8 rounded-full text-white" />
        {/if}
      </div>
    </div>

    <div
      class="mt-3 px-2"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu"
    >
      {#if $isAuthenticated}
        {#if isEmpty($thatProfile)}
          <Link
            href="/my/profile"
            class="block px-3 py-2 rounded-md text-base font-medium
              text-gray-300 hover:text-white hover:bg-that-blue
              focus:outline-none focus:text-white focus:bg-that-blue"
            role="menuitem"
          >
            Create Profile
          </Link>
          <a
            href="/logout"
            class="mt-1 block px-3 py-2 rounded-md text-base font-medium
              text-gray-300 hover:text-white hover:bg-that-blue
              focus:outline-none focus:text-white focus:bg-that-blue"
            role="menuitem"
          >
            Logout
          </a>
        {:else}
          <div
            class="block px-3 py-2 text-base font-medium text-gray-400 border-b"
          >
            <p>{$thatProfile.firstName} {$thatProfile.lastName}</p>
            <p class="truncate pt-2">{$thatProfile.email}</p>
          </div>

          <Link
            href="/my/favorites"
            class="block px-3 py-2 rounded-md text-base font-medium
              text-gray-300 hover:text-white hover:bg-that-blue
              focus:outline-none focus:text-white focus:bg-that-blue"
            role="menuitem"
          >
            My Favorites
          </Link>
          <Link
            href="/my/submissions"
            class="block px-3 py-2 rounded-md text-base font-medium
              text-gray-300 hover:text-white hover:bg-that-blue
              focus:outline-none focus:text-white focus:bg-that-blue"
            role="menuitem"
          >
            My Submissions
          </Link>
          <Link
            href="/my/badges"
            class="block px-3 py-2 rounded-md text-base font-medium
              text-gray-300 hover:text-white hover:bg-that-blue
              focus:outline-none focus:text-white focus:bg-that-blue"
            role="menuitem"
          >
            My Badges
          </Link>
          <Link
            href="/my/profile"
            class="block px-3 py-2 rounded-md text-base font-medium
              text-gray-300 hover:text-white hover:bg-that-blue
              focus:outline-none focus:text-white focus:bg-that-blue"
            role="menuitem"
          >
            My Profile
          </Link>
          <a
            href="/logout"
            class="mt-1 block px-3 py-2 rounded-md text-base font-medium
              text-gray-300 hover:text-white hover:bg-that-blue
              focus:outline-none focus:text-white focus:bg-that-blue"
            role="menuitem"
          >
            Logout
          </a>
        {/if}
      {:else}
        <div
          on:click|stopPropagation="{() => login(document.location.pathname, false)}"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-400
            hover:text-white hover:bg-that-blue focus:outline-none
            focus:text-white focus:bg-that-blue cursor-pointer"
        >
          Login
        </div>
        <div
          on:click|stopPropagation="{() => login(document.location.pathname, true)}"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-400
            hover:text-white hover:bg-that-blue focus:outline-none
            focus:text-white focus:bg-that-blue cursor-pointer"
        >
          Sign Up
        </div>
      {/if}
    </div>
  </div>
</div>
