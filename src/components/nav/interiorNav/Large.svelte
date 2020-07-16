<script>
  import { Link } from 'yrv';
  import { getContext } from 'svelte';
  import { fade } from 'svelte/transition';

  import Icon from 'svelte-awesome';
  import { user } from 'svelte-awesome/icons';

  import { isAuthenticated, thatProfile } from '../../../utilities/security.js';

  // toggle for the drop down
  let visible;
</script>

<div class="flex items-center">

  <div class="flex-shrink-0">
    <Link href="/">
      <img
        class="h-10 w-10"
        src="/images/Logo-Square-White.svg"
        alt="Workflow logo"
      />
    </Link>
  </div>

  <div class="hidden md:block">
    <div class="ml-10 flex items-baseline">

      <Link
        href="/sessions"
        class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300
        hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white
        focus:bg-gray-700"
      >
        Schedule
      </Link>

      <Link
        href="/members"
        class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300
        hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white
        focus:bg-gray-700"
      >
        Members
      </Link>

      <Link
        href="/partners"
        class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300
        hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white
        focus:bg-gray-700"
      >
        Partners
      </Link>

      <Link
        href="/faq"
        class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300
        hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white
        focus:bg-gray-700"
      >
        FAQs
      </Link>
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
          class="max-w-xs flex items-center text-sm rounded-full text-white
          focus:outline-none"
          class:shadow-solid="{visible}"
          aria-label="User menu"
          aria-haspopup="true"
          on:click|preventDefault="{() => (visible = !visible)}"
        >
          {#if $isAuthenticated}
            <img
              class="h-8 w-8 rounded-full"
              src="{$thatProfile.profileImage}?w=256&h=256&fit=crop"
              alt=""
            />
          {:else}
            <Icon data="{user}" class="h-8 w-8 rounded-full" />
          {/if}
        </button>
      </div>

      {#if visible}
        {#if $isAuthenticated}
          <div
            class="origin-top-right absolute right-0 mt-2 w-48 rounded-md
            shadow-lg"
            transition:fade
          >
            <div class="py-1 rounded-md bg-white shadow-xs">
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
              <a
                href="https://www.thatconference.com/member/{$thatProfile.profileSlug}"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                My Profile
              </a>

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
