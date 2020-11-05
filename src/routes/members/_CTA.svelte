<script>
  export let profile;
  export let isFollowing = false;

  const { profileSlug, firstName, lastName } = profile;
  const handle = `@${profileSlug}`;

  import { createEventDispatcher } from 'svelte';
  import { Standard as StandardButton } from '../../elements/buttons';
  import { CTA } from '../../elements';

  import { isAuthenticated, login } from '../../utilities/security.js';

  const dispatch = createEventDispatcher();
</script>

<CTA>
  <h2
    class="text-3xl leading-9 font-extrabold tracking-tight text-gray-900
    sm:text-4xl sm:leading-10"
  >
    Don't miss another opportunity to collaborate.
    <br />

    <span class="text-that-orange">Follow {handle} Today</span>
  </h2>

  <span slot="actionPrimary">
    {#if $isAuthenticated}
      <StandardButton
        class="h-3/4"
        on:click="{() => dispatch('TOGGLE_FOLLOW')}"
      >
        {#if isFollowing}Un-Follow{:else}Follow{/if}
        {handle}
      </StandardButton>
    {:else}
      <StandardButton
        class="h-3/4"
        on:click="{() => login(`/members/${profile.profileSlug}`)}"
      >
        Login and Follow Today
      </StandardButton>
    {/if}
  </span>
</CTA>
