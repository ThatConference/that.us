<script>
  import { Link } from 'yrv';
  import { getContext } from 'svelte';
  import { fade } from 'svelte/transition';
  import _ from 'lodash';

  import Icon from 'svelte-awesome';
  import { user as userIcon } from 'svelte-awesome/icons';
  import { ScaleOut } from 'svelte-loading-spinners';

  import {
    isAuthenticated,
    user,
    thatProfile,
  } from '../../../utilities/security.js';

  // toggle for the drop down
  let visible;
</script>

<div class="flex items-center">

  <div class="flex-shrink-0">
    <Link href="/">
      <img
        class="h-10 w-10"
        src="/images/Logo-Square-White.svg"
        alt="THAT Logo"
      />
    </Link>
  </div>

  <div class="hidden md:block">
    <div class="ml-10 flex items-baseline">

      <Link
        href="/sessions"
        class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300
        hover:text-white hover:bg-that-blue focus:outline-none focus:text-white
        focus:bg-that-blue"
      >
        THAT Board
      </Link>

      <Link
        href="/members"
        class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300
        hover:text-white hover:bg-that-blue focus:outline-none focus:text-white
        focus:bg-that-blue"
      >
        Members
      </Link>

      <Link
        href="/partners"
        class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300
        hover:text-white hover:bg-that-blue focus:outline-none focus:text-white
        focus:bg-that-blue"
      >
        Partners
      </Link>

      <Link
        href="/faq"
        class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300
        hover:text-white hover:bg-that-blue focus:outline-none focus:text-white
        focus:bg-that-blue"
      >
        FAQs
      </Link>
      <!-- <Link
        href="/help"
        class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300
        hover:text-white hover:bg-that-blue focus:outline-none focus:text-white
        focus:bg-that-blue"
      >
        Help
      </Link> -->
    </div>
  </div>
</div>

<div class="hidden md:block">
  <div class="ml-4 flex items-center md:ml-6">

    <!-- Profile dropdown -->
    <div class="ml-3 relative">
      <div>
        <button
          id="user-menu"
          class="max-w-xs h-8 w-8 flex items-center text-sm rounded-full
          text-white focus:outline-none"
          class:shadow-solid="{visible}"
          aria-label="User menu"
          aria-haspopup="true"
          on:click|preventDefault="{() => (visible = !visible)}"
        >
          {#if $isAuthenticated}
            {#if _.isEmpty($thatProfile)}
              <span class="inline-block relative">
                <Icon data="{userIcon}" class="h-8 w-8 rounded-full" />
                <span
                  class="absolute bottom-0 right-0 block h-3.5 w-3.5
                  rounded-full bg-red-400"
                ></span>

              </span>
            {:else if $thatProfile.profileImage}
              <img
                class="h-8 w-8 rounded-full"
                src="{$thatProfile.profileImage}?w=256&h=256&fit=crop"
                alt=""
              />
            {:else}
              <Icon data="{userIcon}" class="h-8 w-8 rounded-full" />
            {/if}
          {:else}
            <Icon data="{userIcon}" class="h-8 w-8 rounded-full" />
          {/if}
        </button>
      </div>

      {#if visible}
        {#if $isAuthenticated}
          {#if _.isEmpty($thatProfile)}
            <div
              class="origin-top-right absolute right-0 mt-2 w-48 rounded-md
              shadow-lg z-50"
              transition:fade
            >
              <div class="py-1 rounded-md bg-white shadow-xs">
                <Link
                  href="/my/profile"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Create Profile
                </Link>

                <a
                  href="/logout"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </a>
              </div>
            </div>
          {:else}
            <div
              class="origin-top-right absolute right-0 mt-2 min-w-48 rounded-md
              shadow-lg z-50"
              transition:fade
            >
              <div class="py-1 rounded-md bg-white shadow-xs">

                <div class="block px-4 py-2 text-sm text-gray-700 border-b">
                  <p>{$thatProfile.firstName} {$thatProfile.lastName}</p>
                  <p class="truncate pt-2">{$thatProfile.email}</p>
                </div>

                <Link
                  href="/my/favorites"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Favorites
                </Link>

                <Link
                  href="/my/submissions"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Submissions
                </Link>
                <Link
                  href="/my/badges"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Badges
                </Link>
                <Link
                  href="/my/profile"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Profile
                </Link>

                <a
                  href="/logout"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </a>
              </div>
            </div>
          {/if}
        {:else}
          <div
            class="origin-top-right absolute right-0 mt-2 w-48 rounded-md
            shadow-lg"
            transition:fade
          >
            <div class="py-1 rounded-md bg-white shadow-xs">
              <a
                href="/login"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Login
              </a>
            </div>
          </div>
        {/if}
      {/if}

    </div>
  </div>
</div>
