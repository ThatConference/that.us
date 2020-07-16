<script>
  import { getContext } from 'svelte';
  import { isAuthenticated, thatProfile } from '../../../utilities/security.js';
  import { fade } from 'svelte/transition';
  import { Link } from 'yrv';

  import Icon from 'svelte-awesome';
  import { user } from 'svelte-awesome/icons';

  const mobileVisible = getContext('IS_Mobile_VIEW');
</script>

<!--
    Mobile menu, toggle classes based on menu state.

    Open: "block", closed: "hidden"
    -->
<div
  class="border-b border-gray-700 md:hidden"
  class:hidden="{!$mobileVisible}"
  class:block="{$mobileVisible}"
>
  <div class="px-2 py-3 sm:px-3">
    <Link
      href="/sessions"
      class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300
      hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white
      focus:bg-gray-700"
    >
      Schedule
    </Link>
    <Link
      href="/members"
      class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300
      hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white
      focus:bg-gray-700"
    >
      Members
    </Link>
    <Link
      href="/partners"
      class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300
      hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white
      focus:bg-gray-700"
    >
      Partners
    </Link>
    <Link
      href="/faq"
      class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300
      hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white
      focus:bg-gray-700"
    >
      FAQ
    </Link>
  </div>

  <div class="pt-4 pb-3 border-t border-gray-700">
    <div class="flex items-center px-5">
      <div class="flex-shrink-0">
        {#if $isAuthenticated}
          <img
            class="h-8 w-8 rounded-full"
            src="{$thatProfile.profileImage}?w=256&h=256&fit=crop"
            alt=""
          />
        {:else}
          <Icon data="{user}" class="h-8 w-8 rounded-full text-white" />
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
        <Link
          href="/my/favorites"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-400
          hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white
          focus:bg-gray-700"
          role="menuitem"
        >
          My Favorites
        </Link>
        <Link
          href="/my/submissions"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-400
          hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white
          focus:bg-gray-700"
          role="menuitem"
        >
          My Submissions
        </Link>
        <a
          href="https://www.thatconference.com/member/{$thatProfile.profileSlug}"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-400
          hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white
          focus:bg-gray-700"
          role="menuitem"
        >
          Your Profile
        </a>
        <a
          href="/logout"
          class="mt-1 block px-3 py-2 rounded-md text-base font-medium
          text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none
          focus:text-white focus:bg-gray-700"
          role="menuitem"
        >
          Logout
        </a>
      {:else}
        <a
          href="/login"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-400
          hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white
          focus:bg-gray-700"
        >
          Login
        </a>
      {/if}
    </div>

  </div>
</div>
