<script>
  export let slug;

  import { fade } from 'svelte/transition';
  import { useMachine } from 'xstate-svelte';

  import NewestFollowers from './_NewestFollowers.svelte';
  import CTA from './_CTA.svelte';
  import UpNext from '../../components/activities/UpNext.svelte';
  import Hero from './_Hero.svelte';

  import createMachine from './machines/community';
  import metaTagsStore from '../../store/metaTags';
  import { isAuthenticated, token } from '../../utilities/security.js';

  metaTagsStore.set({
    title: 'Community - THAT',
    description: '',
    openGraph: {
      type: 'website',
      url: `https://that.us/communities/`,
    },
  });

  let delayCounter = 200;
  function getDelay(reset = false) {
    let current = delayCounter;
    delayCounter = delayCounter + 200;

    if (reset) delayCounter = 200;
    return current;
  }

  const { state, send } = useMachine(createMachine(slug));

  $: if ($isAuthenticated && $token) {
    send('AUTHENTICATED', { status: true });
  } else {
    send('AUTHENTICATED', { status: false });
  }
</script>

<!-- {(console.log({ $state }), '')} -->

<!-- {#if [{ init: 'loaded' }].some($state.matches)} -->
{#if ['communityLoaded'].some($state.matches)}
  <div class="flex flex-col">
    <div in:fade="{{ delay: getDelay() }}">
      <Hero
        community="{$state.context.community}"
        isFollowing="{$state.context.isFollowing}"
        on:community-follow="{() => send('FOLLOW', {
            id: $state.context.community.id,
          })}"
      />
    </div>

    <div in:fade="{{ delay: getDelay() }}">
      <NewestFollowers
        stateMachineService="{$state.context.followMachineServices}"
      />
    </div>

    <div in:fade="{{ delay: getDelay() }}">
      <UpNext
        stateMachineService="{$state.context.activitiesMachineServices}"
      />
    </div>

    <div in:fade="{{ delay: getDelay(true) }}">
      <CTA
        isFollowing="{$state.context.isFollowing}"
        community="{$state.context.community}"
        on:community-follow="{() => send('FOLLOW', {
            id: $state.context.community.id,
          })}"
      />
    </div>
  </div>
{/if}
