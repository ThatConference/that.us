<script>
  export let slug;

  // 3rd party
  import { fade } from 'svelte/transition';
  import { useMachine } from 'xstate-svelte';

  // ui support
  import Hero from './_Hero.svelte';
  import FeaturedMembers from './_FeaturedMembers.svelte';
  import Goals from './_Goals.svelte';
  import Followers from './_Followers.svelte';
  import CTA from './_CTA.svelte';

  // utilities
  import {
    isAuthenticated,
    token,
    thatProfile,
  } from '../../utilities/security.js';
  import createMachine from './machines/partner';
  import metaTagsStore from '../../store/metaTags';
  import { debug } from '../../config';

  const { state, send } = useMachine(createMachine(slug), {
    devTools: debug.xstate,
  });

  $: if (['profileLoaded'].some($state.matches)) {
    const { profile } = $state.context;

    metaTagsStore.set({
      title: `${profile.companyName} - THAT`,
      description: `${profile.aboutUs}`,
      openGraph: {
        type: 'website',
        url: `https://that.us/partners/${profile.slug}`,
      },
    });
  }

  let delayCounter = 200;
  function getDelay(reset = false) {
    let current = delayCounter;
    delayCounter = delayCounter + 200;

    if (reset) delayCounter = 200;
    return current;
  }

  $: if ($isAuthenticated && $token) {
    send('AUTHENTICATED', { status: true });
  } else {
    send('AUTHENTICATED', { status: false });
  }
</script>

{#if ['profileLoaded'].some($state.matches)}
  <div class="flex flex-col">
    <div in:fade="{{ delay: getDelay() }}">
      <Hero
        partner="{$state.context.profile}"
        isFollowing="{$state.context.isFollowing}"
        on:TOGGLE_FOLLOW="{() => send('FOLLOW', {
            id: $state.context.profile.id,
          })}"
      />
    </div>

    {#if $state.context.profile.members && $state.context.profile.members.length > 0}
      <div in:fade="{{ delay: getDelay() }}">
        <FeaturedMembers members="{$state.context.profile.members}" />
      </div>
    {/if}

    {#if $state.context.profile.goals && $state.context.profile.goals.length > 0}
      <div in:fade="{{ delay: getDelay() }}">
        <Goals goals="{$state.context.profile.goals}" />
      </div>
    {/if}

    <div in:fade="{{ delay: getDelay(true) }}">
      <div in:fade="{{ delay: getDelay() }}">
        <Followers
          stateMachineService="{$state.context.followMachineServices}"
        />
      </div>

      <CTA
        partner="{$state.context.profile}"
        isFollowing="{$state.context.isFollowing}"
        on:TOGGLE_FOLLOW="{() => send('FOLLOW', {
            id: $state.context.profile.id,
          })}"
      />
    </div>
  </div>
{/if}
