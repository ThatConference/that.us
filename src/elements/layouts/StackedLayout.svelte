<script>
  export let bodyBackgroundColor = 'bg-white';

  import _ from 'lodash';

  import { isAuthenticated, thatProfile } from '../../utilities/security.js';
  import { Footer } from '../../components';
  import CreateProfileNotification from '../../components/notifications/CreateProfile.svelte';
  import NoProfile from '../../components/notifications/NoProfile.svelte';
</script>

{#if $isAuthenticated}
  {#if _.isEmpty($thatProfile)}
    <CreateProfileNotification />
  {/if}
{/if}

<NoProfile />

<div class="flex flex-col min-h-screen">
  <header class="bg-thatBlue-700 pb-32">
    <slot name="header" />
  </header>

  <main id="main" class="-mt-32 flex-grow">
    <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
      <div
        id="content-block"
        class="{bodyBackgroundColor} rounded-lg shadow px-5 py-6 sm:px-6"
      >
        <slot name="body" />
        <!-- default slot as fallback-->
        <slot />
      </div>
      <slot name="footer" />
    </div>
  </main>

  <Footer class="self-end" />
</div>
