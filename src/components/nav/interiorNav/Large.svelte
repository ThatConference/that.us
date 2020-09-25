<script>
  import { Link } from 'yrv';
  import { fade } from 'svelte/transition';
  import _ from 'lodash';
  import { user as userIcon } from 'svelte-awesome/icons';
  import Icon from 'svelte-awesome';

  import { Activity } from '../../../elements/svgs';
  import ActivitySlideOver from '../../activityCenter/ActivitySlideOver.svelte';
  import DesktopLink from './_DesktopLink.svelte';

  import { hasNotifications } from '../../../store/notificationCenter';
  import {
    login,
    isAuthenticated,
    thatProfile,
  } from '../../../utilities/security.js';

  // toggle for the drop down
  let visible;
  let activityVisible;
  let helpVisible;

  function handleCloseActivityCenter(event) {
    activityVisible = !activityVisible;
  }
</script>

<div class="flex items-center">
  <div class="flex-shrink-0">
    <Link href="/">
      <img
        class="h-10"
        src="/images/THAT-Full-Wide-White.svg"
        alt="THAT Logo"
      />
    </Link>
  </div>

  <div class="hidden md:block">
    <div class="ml-8 flex items-baseline">
      <Link
        href="/activities"
        open
        class="px-3 py-2 rounded-md text-sm font-medium text-gray-300
          hover:text-white hover:bg-that-blue focus:outline-none
          focus:text-white focus:bg-that-blue"
      >
        <DesktopLink>Activities</DesktopLink>
      </Link>

      <Link
        href="/members"
        class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300
          hover:text-white hover:bg-that-blue focus:outline-none
          focus:text-white focus:bg-that-blue"
      >
        <DesktopLink>Members</DesktopLink>
      </Link>

      <Link
        href="/partners"
        class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300
          hover:text-white hover:bg-that-blue focus:outline-none
          focus:text-white focus:bg-that-blue"
      >
        <DesktopLink>Partners</DesktopLink>
      </Link>

      <div>
        <button
          href="/help"
          class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300
            hover:text-white hover:bg-that-blue focus:outline-none
            focus:text-white focus:bg-that-blue"
          on:click|preventDefault="{() => (helpVisible = !helpVisible)}"
        >
          <DesktopLink>Help</DesktopLink>
        </button>
        {#if helpVisible}
          <div
            class="absolute mt-2 ml-4 w-64 rounded-md shadow-lg z-50"
            in:fade
          >
            <div class="py-1 rounded-md bg-white shadow-xs">
              <Link
                href="/support/welcome"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Getting Started
              </Link>
              <Link
                href="/support/what-is-an-activity"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                What Is An Activity
              </Link>
              <Link
                href="/support/joining-an-activity"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                How To Join An Activity
              </Link>
              <Link
                href="/support/creating-an-activity"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                How To Create An Activity
              </Link>
              <Link
                href="/support/staying-up-to-date"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Staying Up To Date
              </Link>
              <Link
                href="/support/faq"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                FAQ
              </Link>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

<div class="hidden md:block">
  <div class="ml-4 flex items-center md:ml-6">
    {#if $hasNotifications}
      <button
        class="max-w-xs h-8 w-8 rounded-full text-white focus:outline-none
          duration-150 ease-in-out hover:bg-thatBlue-500"
        class:shadow-solid="{activityVisible}"
        class:bg-thatBlue-500="{activityVisible}"
        aria-label="Notifications"
        on:click|preventDefault="{() => (activityVisible = !activityVisible)}"
      >
        <Activity />
      </button>

      {#if activityVisible}
        <ActivitySlideOver
          on:click="{handleCloseActivityCenter}"
          on:clicked-outside="{handleCloseActivityCenter}"
        />
      {/if}
    {/if}

    <!-- Profile dropdown -->
    <div class="ml-3 relative">
      <div>
        <button
          id="user-menu"
          class="max-w-xs h-8 w-8 flex items-center text-sm rounded-full
            text-white focus:outline-none duration-150 ease-in-out
            hover:bg-thatBlue-500"
          class:shadow-solid="{visible}"
          class:bg-thatBlue-500="{visible}"
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
              <div
                on:click|stopPropagation="{() => login(document.location.pathname, false)}"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100
                  cursor-pointer"
              >
                Login
              </div>
            </div>
          </div>
        {/if}
      {/if}
    </div>
  </div>
</div>
