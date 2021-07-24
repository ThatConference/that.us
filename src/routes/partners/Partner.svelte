<script>
  export let router;

  // 3rd party
  import { fade } from 'svelte/transition';
  import { useMachine } from 'xstate-svelte';

  import ProfileLayout from '../../elements/layouts/Profile.svelte';

  // ui support
  import Hero from './components/_Hero.svelte';
  import FeaturedMembers from './components/_FeaturedMembers.svelte';
  import Goals from './components/_Goals.svelte';
  import Followers from './components/_Followers.svelte';
  import CTA from './components/_CTA.svelte';
  import JobListings from './components/_JobListings.svelte';
  import FeaturedSessions from './components/_FeaturedSessions.svelte';
  import PartnerCta from './components/_PartnerCta.svelte';

  // utilities
  import { isAuthenticated, token } from '../../utilities/security';
  import createMachine from './machines/partner';
  import metaTagsStore from '../../store/metaTags';
  import { debug } from '../../config';

  const { partner } = router.params;

  const { state, send } = useMachine(createMachine(partner), {
    devTools: debug.xstate,
  });

  $: if (['profileLoaded'].some($state.matches)) {
    const { profile } = $state.context;

    metaTagsStore.set({
      title: `${profile.companyName} - THAT`,
      description: `${profile.aboutUs}`,
      openGraph: {
        type: 'website',
        url: `https://that.us/partners/${partner}`,
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

<ProfileLayout>
  {#if ['profileLoaded'].some($state.matches)}
    <div class="flex flex-col">
      <div in:fade="{{ delay: getDelay() }}">
        <Hero
          partner="{$state.context.profile}"
          isFollowing="{$state.context.isFollowing}"
          on:TOGGLE_FOLLOW="{() =>
            send('FOLLOW', {
              id: $state.context.profile.id,
            })}" />
      </div>

      {#if $state?.context?.profile?.members?.length > 0}
        <div in:fade="{{ delay: getDelay() }}">
          <FeaturedMembers members="{$state.context.profile.members}" />
        </div>
      {/if}

      {#if $state?.context?.profile?.goals?.length > 0}
        <div in:fade="{{ delay: getDelay() }}">
          <Goals goals="{$state.context.profile.goals}" />
        </div>
      {/if}

      {#if $state?.context?.profile?.callToAction}
        <div in:fade="{{ delay: getDelay() }}">
          <PartnerCta
            action="{$state.context.profile.callToAction}"
            url="{$state.context.profile.callToActionUrl}" />
        </div>
      {/if}

      {#if $state?.context?.profile?.sessions?.length > 0}
        <div in:fade="{{ delay: getDelay() }}">
          <FeaturedSessions sessions="{$state.context.profile.sessions}" />
        </div>
      {/if}

      {#if $state?.context?.profile?.jobListings?.length > 0}
        <div in:fade="{{ delay: getDelay() }}">
          <JobListings listings="{$state.context.profile.jobListings}" />
        </div>
      {/if}

      <div in:fade="{{ delay: getDelay(true) }}">
        <div in:fade="{{ delay: getDelay() }}">
          <Followers
            stateMachineService="{$state.context.followMachineServices}" />
        </div>

        <CTA
          partner="{$state.context.profile}"
          isFollowing="{$state.context.isFollowing}"
          on:TOGGLE_FOLLOW="{() =>
            send('FOLLOW', {
              id: $state.context.profile.id,
            })}" />
      </div>
    </div>
  {/if}
</ProfileLayout>
