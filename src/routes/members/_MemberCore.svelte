<script>
  export let slug;

  import { fade } from 'svelte/transition';
  import { navigateTo } from 'yrv';
  import { useMachine } from 'xstate-svelte';

  import Followers from './_Followers.svelte';
  import CTA from './_CTA.svelte';
  import LifeHack from './_LifeHack.svelte';
  import MeritBadges from './_MeritBadges.svelte';
  import Hero from './_Hero.svelte';
  import WarningModal from '../../components/notifications/Warning.svelte';
  import UpNextMember from '../../components/activities/UpNextMember.svelte';
  import { debug } from '../../config';

  import {
    isAuthenticated,
    token,
    thatProfile,
  } from '../../utilities/security.js';
  import createMachine from './machines/member';
  import metaTagsStore from '../../store/metaTags';

  const { state, send } = useMachine(createMachine(slug), {
    devTools: debug.xstate,
  });

  $: if (['profileLoaded'].some($state.matches)) {
    const { profile } = $state.context;

    metaTagsStore.set({
      title: `${profile.firstName} ${profile.lastName} - THAT`,
      description: `${profile.bio}`,
      openGraph: {
        type: 'website',
        url: `https://that.us/members/${profile.slug}`,
      },
    });
  }

  let delayCounter = 200;
  function getDelay() {
    let current = delayCounter;
    delayCounter = delayCounter + 200;

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
        isFollowing="{$state.context.isFollowing}"
        member="{$state.context.profile}"
        on:TOGGLE_FOLLOW="{() => send('FOLLOW', {
            id: $state.context.profile.profileSlug,
          })}"
      />
    </div>

    {#if $state.context.profile.lifeHack}
      <div in:fade="{{ delay: getDelay() }}">
        <LifeHack
          quote="{$state.context.profile.lifeHack}"
          name="{`${$state.context.profile.firstName} ${$state.context.profile.lastName}`}"
        />
      </div>
    {/if}

    <div in:fade="{{ delay: getDelay() }}">
      <UpNextMember
        stateMachineService="{$state.context.activitiesMachineServices}"
      />
    </div>

    <div in:fade="{{ delay: getDelay() }}">
      <Followers stateMachineService="{$state.context.followMachineServices}" />

      {#if $state.context.profile.earnedMeritBadges.length > 0}
        <MeritBadges meritBadges="{$state.context.profile.earnedMeritBadges}" />
      {/if}

      <CTA
        isFollowing="{$state.context.isFollowing}"
        profile="{$state.context.profile}"
        on:TOGGLE_FOLLOW="{() => send('FOLLOW', {
            id: $state.context.profile.profileSlug,
          })}"
      />
    </div>
  </div>
{/if}
