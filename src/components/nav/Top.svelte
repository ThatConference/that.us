<script>
  import { fade } from 'svelte/transition';
  import { Link } from 'yrv';
  import Icon from 'svelte-awesome';
  import { user } from 'svelte-awesome/icons';

  import { isAuthenticated, thatProfile } from '../../utilities/security.js';

  // toggle for the drop down
  let visible;
  let mobileVisible = false;
</script>

<nav class="bg-gray-800">
  <!-- full screen nav -->
  <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
    <div class="border-b border-gray-700">
      <div class="flex items-center justify-between h-16 px-4 sm:px-0">
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
                class="ml-4 px-3 py-2 rounded-md text-sm font-medium
                text-gray-300 hover:text-white hover:bg-gray-700
                focus:outline-none focus:text-white focus:bg-gray-700"
              >
                THAT Schedule
              </Link>

              <Link
                href="/sessions/my"
                class="ml-4 px-3 py-2 rounded-md text-sm font-medium
                text-gray-300 hover:text-white hover:bg-gray-700
                focus:outline-none focus:text-white focus:bg-gray-700"
              >
                My Sessions
              </Link>

              <Link
                href="/partners"
                class="ml-4 px-3 py-2 rounded-md text-sm font-medium
                text-gray-300 hover:text-white hover:bg-gray-700
                focus:outline-none focus:text-white focus:bg-gray-700"
              >
                Partners
              </Link>

              <Link
                href="/faq"
                class="ml-4 px-3 py-2 rounded-md text-sm font-medium
                text-gray-300 hover:text-white hover:bg-gray-700
                focus:outline-none focus:text-white focus:bg-gray-700"
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
                  class="max-w-xs flex items-center text-sm rounded-full
                  text-white focus:outline-none"
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
                    class="origin-top-right absolute right-0 mt-2 w-48
                    rounded-md shadow-lg"
                    transition:fade
                  >
                    <div class="py-1 rounded-md bg-white shadow-xs">
                      <a
                        href="https://www.thatconference.com/member/{$thatProfile.profileSlug}"
                        class="block px-4 py-2 text-sm text-gray-700
                        hover:bg-gray-100"
                      >
                        Your Profile
                      </a>

                      <a
                        href="/logout"
                        class="block px-4 py-2 text-sm text-gray-700
                        hover:bg-gray-100"
                      >
                        Logout
                      </a>
                    </div>
                  </div>
                {:else}
                  <div
                    class="origin-top-right absolute right-0 mt-2 w-48
                    rounded-md shadow-lg"
                    transition:fade
                  >
                    <div class="py-1 rounded-md bg-white shadow-xs">
                      <a
                        href="/login"
                        class="block px-4 py-2 text-sm text-gray-700
                        hover:bg-gray-100"
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

        <div class="-mr-2 flex md:hidden">
          <!-- Mobile menu button -->
          <button
            class="inline-flex items-center justify-center p-2 rounded-md
            text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none
            focus:bg-gray-700 focus:text-white"
            on:click|preventDefault="{() => (mobileVisible = !mobileVisible)}"
          >
            <!-- Menu open: "hidden", Menu closed: "block" -->
            <svg
              class="block h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
            <!-- Menu open: "block", Menu closed: "hidden" -->
            <svg
              class="hidden h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!--
    Mobile menu, toggle classes based on menu state.

    Open: "block", closed: "hidden"
    -->
  <div
    class="border-b border-gray-700 md:hidden"
    class:hidden="{!mobileVisible}"
    class:block="{mobileVisible}"
  >
    <div class="px-2 py-3 sm:px-3">
      <a
        href="#"
        class="block px-3 py-2 rounded-md text-base font-medium text-white
        bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
      >
        Dashboard
      </a>
      <a
        href="#"
        class="mt-1 block px-3 py-2 rounded-md text-base font-medium
        text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none
        focus:text-white focus:bg-gray-700"
      >
        Team
      </a>
      <a
        href="#"
        class="mt-1 block px-3 py-2 rounded-md text-base font-medium
        text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none
        focus:text-white focus:bg-gray-700"
      >
        Projects
      </a>
      <a
        href="#"
        class="mt-1 block px-3 py-2 rounded-md text-base font-medium
        text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none
        focus:text-white focus:bg-gray-700"
      >
        Calendar
      </a>
      <a
        href="#"
        class="mt-1 block px-3 py-2 rounded-md text-base font-medium
        text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none
        focus:text-white focus:bg-gray-700"
      >
        Reports
      </a>
    </div>

    <div class="pt-4 pb-3 border-t border-gray-700">
      <div class="flex items-center px-5">
        <div class="flex-shrink-0">
          <img
            class="h-10 w-10 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div>
      </div>

      <div
        class="mt-3 px-2"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu"
      >
        <a
          href="#"
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
      </div>
    </div>
  </div>
</nav>
