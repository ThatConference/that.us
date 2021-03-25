<script>
  import { Link } from 'yrv';
  import links from './links';

  import { login, isAuthenticated } from '../../../utilities/security.js';

  import { Standard as StandardLink } from '../../../elements/links';
  import { Standard as StandardButton } from '../../../elements/buttons';
</script>

{#each links as l}
  <Link
    href="{l.href}"
    class="block px-3 py-2 rounded-md text-base font-medium text-gray-700
    hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900
    focus:bg-gray-50 transition duration-150 ease-in-out"
    role="menuitem">
    {l.text}
  </Link>
{/each}

<div class="my-4 sm:my-4 px-4 sm:px-6 flex flex-col space-y-5">
  {#if $isAuthenticated}
    <StandardLink href="/logout">Logout</StandardLink>
  {:else}
    <StandardButton on:click="{() => login(document.location.pathname, false)}">
      Log in
    </StandardButton>
  {/if}
</div>
