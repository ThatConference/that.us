<script>
  import { Link } from 'yrv';

  import { isAuthenticated } from '../../../utilities/security.js';
  import links from './links';
</script>

<div class="hidden md:block md:ml-10 md:pr-4">

  {#each links as l}
    <Link
      href="{l.href}"
      class="mr-8 font-medium text-gray-500 hover:text-gray-900 transition
      duration-150 ease-in-out"
    >
      {l.text}
    </Link>
  {/each}

  {#if !$isAuthenticated}
    <Link
      href="/login"
      class="mr-8 font-medium text-gray-500 hover:text-gray-900 transition
      duration-150 ease-in-out"
    >
      Log In
    </Link>
  {/if}

</div>
