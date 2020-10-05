<script>
  export let message = 'Error';

  import { onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';
  import Icon from 'svelte-awesome';
  import { warning } from 'svelte-awesome/icons';
  import { Link } from 'yrv';
  import { show } from '../../store/profileNotification';

  let dismissed = false;
</script>

{#if !dismissed}
  <div
    class="fixed bottom-0 inset-x-0 pb-2 sm:pb-5 z-10"
    transition:fade="{{ duration: 1000 }}"
  >
    <div class="max-w-screen-xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="p-2 rounded-lg bg-red-400 shadow-lg sm:p-3">
        <div class="flex items-center justify-between flex-wrap">
          <div class="w-0 flex-1 flex items-center">
            <span class="flex p-2 rounded-lg">
              <Icon data="{warning}" class="w-6 h-6 text-white" />
            </span>
            <p class="ml-3 font-medium text-white truncate">
              <span class="md:hidden">!</span>
              <span class="hidden md:inline">{message}</span>
            </p>
          </div>

          <div class="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
            <button
              type="button"
              class="-mr-1 flex p-2 rounded-md hover:bg-indigo-500
              focus:outline-none focus:bg-indigo-500 transition ease-in-out
              duration-150"
              aria-label="Dismiss"
              on:click="{() => (dismissed = !dismissed)}"
            >
              <svg
                class="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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
  </div>
{/if}
