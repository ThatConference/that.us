<script>
  import { Link } from 'yrv';
  import links from './links';

  import { isAuthenticated } from '../../../utilities/security.js';
</script>

{#each links as l}
  <Link
    href="{l.href}"
    class="block px-3 py-2 rounded-md text-base font-medium text-gray-700
    hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900
    focus:bg-gray-50 transition duration-150 ease-in-out"
    role="menuitem"
  >
    {l.text}
  </Link>
{/each}

<div>
  {#if $isAuthenticated}
    <a
      href="/logout"
      class="block w-full px-5 py-3 text-center font-medium text-indigo-600
      bg-gray-50 hover:bg-gray-100 hover:text-indigo-700 focus:outline-none
      focus:bg-gray-100 focus:text-indigo-700 transition duration-150
      ease-in-out"
      role="menuitem"
    >
      Logout
    </a>
  {:else}
    <a
      href="/login"
      class="block w-full px-5 py-3 text-center font-medium text-indigo-600
      bg-gray-50 hover:bg-gray-100 hover:text-indigo-700 focus:outline-none
      focus:bg-gray-100 focus:text-indigo-700 transition duration-150
      ease-in-out"
      role="menuitem"
    >
      Log in
    </a>
  {/if}
</div>
