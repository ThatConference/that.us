<script>
  import { Link } from 'yrv';

  import { login, isAuthenticated } from '../../../utilities/security.js';
  import links from './links';
</script>

<div class="hidden md:flex md:ml-10 md:pr-4">
  {#each links as l}
    <Link
      href="{l.href}"
      class="mr-8 font-medium text-gray-500 hover:text-that-blue transition
        duration-150 ease-in-out"
    >
      <div class="flex items-center">
        <svg
          class="h-5 text-thatBlue-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M11 0h3L9 20H6l5-20z"></path>
        </svg>
        <span>{l.text}</span>
      </div>
    </Link>
  {/each}

  {#if !$isAuthenticated}
    <button
      on:click="{() => login(document.location.pathname, false)}"
      class="mr-8 font-medium text-gray-500 hover:text-that-blue transition
        duration-150 ease-in-out"
    >
      <div class="flex items-center">
        <svg
          class="h-5 text-thatBlue-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M11 0h3L9 20H6l5-20z"></path>
        </svg>

        <span>Log In</span>
      </div>
    </button>
  {:else}
    <Link
      href="/logout"
      class="mr-8 font-medium text-gray-500 hover:text-that-blue transition
        duration-150 ease-in-out"
    >
      <div class="flex items-center">
        <svg
          class="h-5 text-thatBlue-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M11 0h3L9 20H6l5-20z"></path>
        </svg>

        <span>Log Out</span>
      </div>
    </Link>
  {/if}
</div>
