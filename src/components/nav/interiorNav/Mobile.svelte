<script>
  import { getContext } from 'svelte';
  import { isEmpty } from 'lodash';
  import { Link } from 'yrv';
  import Icon from 'svelte-awesome';
  import { user as userIcon } from 'svelte-awesome/icons';

  import {
    login,
    isAuthenticated,
    thatProfile,
  } from '../../../utilities/security.js';
  import MobileUsersProfile from '../_MobileUsersProfile.svelte';

  const mobileVisible = getContext('IS_Mobile_VIEW');
</script>

<div
  class="border-b border-gray-700 lg:hidden"
  class:hidden="{!$mobileVisible}"
  class:block="{$mobileVisible}">
  <div class="px-2 py-3 sm:px-3">
    <Link
      href="/events"
      class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300
        hover:text-white hover:bg-that-blue focus:outline-none focus:text-white
        focus:bg-that-blue">
      Events
    </Link>
    <Link
      href="/activities"
      class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300
        hover:text-white hover:bg-that-blue focus:outline-none focus:text-white
        focus:bg-that-blue">
      Activities
    </Link>
    <Link
      href="/members"
      class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300
        hover:text-white hover:bg-that-blue focus:outline-none focus:text-white
        focus:bg-that-blue">
      Members
    </Link>
    <Link
      href="/partners"
      class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300
        hover:text-white hover:bg-that-blue focus:outline-none focus:text-white
        focus:bg-that-blue">
      Partners
    </Link>
    <Link
      href="/communities"
      class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300
        hover:text-white hover:bg-that-blue focus:outline-none focus:text-white
        focus:bg-that-blue">
      Communities
    </Link>
    <Link
      href="/support/welcome"
      class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300
        hover:text-white hover:bg-that-blue focus:outline-none focus:text-white
        focus:bg-that-blue">
      Help
    </Link>
  </div>

  <MobileUsersProfile darkMode="{false}" />
</div>
