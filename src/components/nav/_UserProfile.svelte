<script>
  import { fade } from 'svelte/transition';
  import { user as userIcon } from 'svelte-awesome/icons';
  import Icon from 'svelte-awesome';
  import { Link } from 'yrv';
  import { isEmpty } from 'lodash';

  import {
    login,
    isAuthenticated,
    thatProfile,
  } from '../../utilities/security.js';

  let visible;
</script>

<div class="relative">
  <div>
    <button
      id="user-menu"
      class="max-w-xs h-10 w-10 flex items-center justify-center text-sm rounded-full focus:outline-none duration-150 ease-in-out"
      class:shadow-solid="{visible}"
      aria-label="User menu"
      aria-haspopup="true"
      on:click|preventDefault="{() => (visible = !visible)}">
      {#if $isAuthenticated}
        {#if isEmpty($thatProfile)}
          <div>
            <Icon data="{userIcon}" class="h-8 w-8 rounded-full" />
            <span
              class="absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full bg-red-400"
            ></span>
          </div>
        {:else if $thatProfile.profileImage}
          <img
            class="h-10 w-10 rounded-full"
            src="{$thatProfile.profileImage}?w=256&h=256&fit=crop"
            alt="" />
        {:else}
          <Icon data="{userIcon}" class="h-8 w-8 rounded-full" />
        {/if}
      {:else}
        <div
          class="transition duration-500 ease-in-out transform hover:scale-105">
          <Icon data="{userIcon}" class="h-8 w-8 rounded-full" />
        </div>
      {/if}
    </button>
  </div>

  {#if visible}
    {#if $isAuthenticated}
      {#if isEmpty($thatProfile)}
        <div
          class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg z-50"
          transition:fade>
          <div
            class="py-1 rounded-md bg-white ring-1 ring-black ring-opacity-5">
            <Link
              href="/my/settings/profile"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Create Profile
            </Link>

            <a
              href="/logout"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Logout
            </a>
          </div>
        </div>
      {:else}
        <div
          class="origin-top-right absolute right-0 mt-2 min-w-48 rounded-md shadow-lg z-50"
          transition:fade>
          <div
            class="py-1 rounded-md bg-white ring-1 ring-black ring-opacity-5">
            <div
              class="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-700 border-b">
              <Link
                href="/my/settings/profile"
                on:click="{() => (visible = false)}">
                <p>{$thatProfile.firstName} {$thatProfile.lastName}</p>
                <p class="truncate pt-2">{$thatProfile.email}</p>
              </Link>
            </div>

            <Link
              href="/my/settings/profile"
              on:click="{() => (visible = false)}"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              My Settings
            </Link>
            <Link
              href="/my/favorites"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              My Favorites
            </Link>

            <Link
              href="/my/submissions"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              My Submissions
            </Link>

            <a
              href="/logout"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Logout
            </a>
          </div>
        </div>
      {/if}
    {:else}
      <div
        transition:fade
        class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg z-50">
        <div class="py-1 rounded-md bg-white ring-1 ring-black ring-opacity-5">
          <div
            on:click|stopPropagation="{() =>
              login(document.location.pathname, false)}"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
            Login
          </div>
          <div
            on:click|stopPropagation="{() =>
              login(document.location.pathname, true)}"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
            Sign Up
          </div>
        </div>
      </div>
    {/if}
  {/if}
</div>
