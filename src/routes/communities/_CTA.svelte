<script>
  export let communityName;
  export let communityHandle;
  export let isFollowing = false;
  
  import { createEventDispatcher } from 'svelte';

  import { Standard as StandardButton } from '../../elements/buttons';
  import { CTA } from '../../elements';

  const dispatch = createEventDispatcher();
</script>

<CTA>
  <h2
    class="text-3xl leading-9 font-extrabold tracking-tight text-gray-900
    sm:text-4xl sm:leading-10"
  >
    Never miss another
    <span class="text-that-orange">{communityName}</span>
    Activity!
    <br />
    <span class="text-that-orange">Follow {communityHandle} today!</span>
  </h2>

  <span slot="actionPrimary">
    <StandardButton class="h-3/4" on:click="{() => dispatch('community-follow')}">
      {#if isFollowing}
        Un-Follow
      {:else}
        Follow
      {/if}
      {communityHandle}
    </StandardButton>
  </span>
</CTA>
