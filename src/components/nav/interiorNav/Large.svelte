<script>
  import { getContext } from 'svelte';
  import { Link } from 'yrv';
  import { fade } from 'svelte/transition';
  import Icon from 'svelte-awesome';
  import { plus } from 'svelte-awesome/icons';

  import { Activity, Cart } from '../../../elements/svgs';
  import ActivitySlideOver from '../../activityCenter/ActivitySlideOver.svelte';
  import DesktopLink from './_DesktopLink.svelte';
  import UserProfile from '../_UserProfile.svelte';

  import { hasNotifications } from '../../../store/notificationCenter';

  let activityVisible;
  let helpVisible;

  function handleCloseActivityCenter(event) {
    activityVisible = !activityVisible;
  }

  const { state } = getContext('cart');

  $: cartItems = Object.keys($state.context.cart).length;
</script>

<div class="flex items-center">
  <div class="flex-shrink-0">
    <Link href="/">
      <img
        class="h-10"
        src="/images/THAT-Full-Wide-White.svg"
        alt="THAT Logo" />
    </Link>
  </div>

  <div class="hidden lg:block">
    <div class="ml-8 flex items-baseline">
      <Link
        href="/events"
        open
        class="ml-1 px-3 py-2 rounded-md text-sm font-medium text-gray-300
          hover:text-white hover:bg-that-blue focus:outline-none
          focus:text-white focus:bg-that-blue">
        <DesktopLink>Events</DesktopLink>
      </Link>

      <Link
        href="/activities"
        open
        class="ml-1 px-3 py-2 rounded-md text-sm font-medium text-gray-300
          hover:text-white hover:bg-that-blue focus:outline-none
          focus:text-white focus:bg-that-blue">
        <DesktopLink>Activities</DesktopLink>
      </Link>

      <Link
        href="/members"
        class="ml-1 px-3 py-2 rounded-md text-sm font-medium text-gray-300
          hover:text-white hover:bg-that-blue focus:outline-none
          focus:text-white focus:bg-that-blue">
        <DesktopLink>Members</DesktopLink>
      </Link>

      <Link
        href="/communities"
        class="ml-1 px-3 py-2 rounded-md text-sm font-medium text-gray-300
          hover:text-white hover:bg-that-blue focus:outline-none
          focus:text-white focus:bg-that-blue">
        <DesktopLink>Communities</DesktopLink>
      </Link>

      <Link
        href="/partners"
        class="ml-1 px-3 py-2 rounded-md text-sm font-medium text-gray-300
          hover:text-white hover:bg-that-blue focus:outline-none
          focus:text-white focus:bg-that-blue">
        <DesktopLink>Partners</DesktopLink>
      </Link>

      <div>
        <button
          href="/help"
          class="ml-1 px-3 py-2 rounded-md text-sm font-medium text-gray-300
            hover:text-white hover:bg-that-blue focus:outline-none
            focus:text-white focus:bg-that-blue"
          on:click|preventDefault="{() => (helpVisible = !helpVisible)}">
          <DesktopLink>Help</DesktopLink>
        </button>
        {#if helpVisible}
          <div
            class="absolute mt-2 ml-4 w-64 rounded-md shadow-lg z-50"
            in:fade>
            <div
              class="py-1 rounded-md bg-white ring-1 ring-black ring-opacity-5">
              <Link
                href="/support/welcome"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Getting Started
              </Link>
              <Link
                href="/support/what-is-an-activity"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                What Is An Activity
              </Link>
              <Link
                href="/support/joining-an-activity"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                How To Join An Activity
              </Link>
              <Link
                href="/support/creating-an-activity"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                How To Create An Activity
              </Link>
              <Link
                href="/support/staying-up-to-date"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Staying Up To Date
              </Link>
              <Link
                href="/support/faq"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                FAQ
              </Link>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

<div class="hidden lg:block">
  <div class="ml-4 flex items-center justify-center md:ml-6">
    {#if $hasNotifications}
      <button
        class="max-w-xs h-10 w-10 rounded-full text-white focus:outline-none duration-150 ease-in-out hover:bg-thatBlue-500"
        class:shadow-solid="{activityVisible}"
        class:bg-thatBlue-500="{activityVisible}"
        aria-label="Notifications"
        on:click|preventDefault="{() => (activityVisible = !activityVisible)}">
        <div
          class="transition duration-500 ease-in-out transform hover:scale-105 flex justify-center">
          <Activity />
        </div>
      </button>

      {#if activityVisible}
        <ActivitySlideOver
          on:click="{handleCloseActivityCenter}"
          on:clicked-outside="{handleCloseActivityCenter}" />
      {/if}
    {/if}

    {#if true}
      <div class="relative inline-block">
        <div class="ml-4 p-1 rounded-full text-white hover:bg-thatBlue-500">
          <Link href="/orders/summary">
            <Cart />

            {#if cartItems > 0}
              <span class="animate-pulse absolute bottom-0 right-0 block">
                <span
                  class="inline-flex items-center justify-center h-4 w-4 rounded-full bg-gray-500">
                  <span class="text-xs font-medium leading-none text-white"
                    >{cartItems}</span>
                </span>
              </span>
            {/if}
          </Link>
        </div>
      </div>
    {/if}

    <div class="ml-4 p-1 rounded-full text-white hover:bg-thatBlue-500">
      <Link href="/activities/create">
        <Icon data="{plus}" class="h-8 w-8" />
      </Link>
    </div>

    <div class="ml-4 rounded-full text-white hover:bg-thatBlue-500">
      <UserProfile />
    </div>
  </div>
</div>
