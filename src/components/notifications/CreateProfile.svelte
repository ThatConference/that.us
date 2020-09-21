<script>
  import { Link } from 'yrv';

  import { fade } from 'svelte/transition';

  let wasDismissed = false;
</script>

{#if !wasDismissed}
  <div class="relative bg-red-400" transition:fade="{{ duration: 1000 }}">
    <div class="max-w-screen-xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
      <div class="pr-16 sm:text-center sm:px-16">
        <p class="font-medium text-white">
          <span class="hidden md:inline">
            To Favorite, Submit or Join any activity you will first need to
            complete your user profile.
          </span>
          <span class="block sm:ml-2 sm:inline-block">
            <Link href="/my/profile" class="text-white font-bold underline">
              Create Your Profile &rarr;
            </Link>
          </span>
        </p>
      </div>
      <div
        class="absolute inset-y-0 right-0 pt-1 pr-1 flex items-start sm:pt-1
          sm:pr-2 sm:items-start"
      >
        <button
          type="button"
          class="flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none
            focus:bg-indigo-500 transition ease-in-out duration-150"
          aria-label="Dismiss"
          on:click="{() => (wasDismissed = !wasDismissed)}"
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
{/if}
