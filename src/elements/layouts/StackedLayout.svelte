<script>
  export let bodyBackgroundColor = 'bg-white';

  import { isEmpty } from 'lodash';

  import { isAuthenticated, thatProfile } from '../../utilities/security.js';
  import { Footer } from '../../components';
  import CreateProfileNotification from '../../components/notifications/CreateProfile.svelte';
  import NoProfile from '../../components/notifications/NoProfile.svelte';
</script>

{#if $isAuthenticated}
  {#if isEmpty($thatProfile)}
    <CreateProfileNotification />
  {/if}
{/if}

<NoProfile />

<div class="bg-gradient-to-b from-gray-100 flex flex-col min-h-screen ">
  <div class="relative bg-thatBlue-500 pt-10">
    <div
      class="absolute flex justify-center inset-x-0 left-1/2 transform -translate-x-1/2 w-full overflow-hidden lg:inset-y-0">
      <div class="flex-grow bg-gradient-to-r from-thatBlue-800 bg-opacity-75 ">
      </div>
      <div class="flex-grow bg-gradient-to-l from-thatBlue-700 bg-opacity-75">
      </div>
    </div>
    <header class="relative pb-32">
      <slot name="header" />
    </header>
  </div>

  <div id="main" class="relative -mt-32 flex-grow">
    <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
      <div
        id="content-block"
        class="{bodyBackgroundColor} rounded-lg shadow px-5 py-6 sm:px-6">
        <slot name="body" />
        <!-- default slot as fallback-->
        <slot />
      </div>
      <slot name="footer" />
    </div>
  </div>

  <Footer class="self-end" />
</div>
