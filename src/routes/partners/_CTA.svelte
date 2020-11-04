<script>
  export let partner;
  export let isFollowing = false;

  const { slug, companyName } = partner;
  const handle = `@${slug}`;

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
    Never miss another
    <span class="text-that-orange">{companyName}</span>
    Activity!
    <br />
    <span class="text-that-orange">Follow us today!</span>
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
        on:click="{() => login(`/partners/${slug}`)}"
      >
        Login and Follow Today
      </StandardButton>
    {/if}
  </span>
</CTA>
