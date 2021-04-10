<script>
  import { fade } from 'svelte/transition';
  import { useMachine } from 'xstate-svelte';

  import Layout from '../../elements/layouts/ContentLayout.svelte';
  import UpNext from '../../components/activities/UpNext.svelte';
  import {
    Hero,
    Testimonials,
    CTA,
    CtaMembership,
    Newsletter,
    Stats,
    Events,
    NewMembers,
  } from '../../components/home';

  import WelcomeBack from './components/_WelcomeBack.svelte';

  // utilities
  import { isAuthenticated, thatProfile } from '../../utilities/security';
  import metaTagsStore from '../../store/metaTags';

  metaTagsStore.set({
    title: 'Welcome to THAT!',
    description: 'todo',
    openGraph: {
      type: 'website',
      url: `https://that.us/`,
    },
  });

  import currentEvent from '../../store/currentEvent';
  import createMachine from './machines/home';

  const { state } = useMachine(createMachine({ id: $currentEvent.eventId }), {
    debug: true,
  });
</script>

<Layout>
  {#if $thatProfile.isMember}
    <div in:fade="{{ delay: 200 }}">
      <WelcomeBack />
    </div>
    <div in:fade="{{ delay: 400 }}">
      <UpNext stateMachineService="{$state.context.upNextActor}" />
    </div>
    <div in:fade="{{ delay: 600 }}">
      <Events />
    </div>
    <div in:fade="{{ delay: 800 }}">
      <Stats stateMachineService="{$state.context.statsActor}" />
      <NewMembers />
      <Newsletter />
    </div>
  {:else}
    <div in:fade="{{ delay: 200 }}">
      <Hero />
    </div>

    <div in:fade="{{ delay: 400 }}">
      <Stats stateMachineService="{$state.context.statsActor}" />
    </div>

    <div in:fade="{{ delay: 600 }}">
      <Testimonials />
    </div>

    <div in:fade="{{ delay: 800 }}">
      <div class="relative flex flex-col items-center">
        <img class="h-72" src="/images/THAT-Logo-Words.svg" alt="THAT" />
      </div>

      <UpNext stateMachineService="{$state.context.upNextActor}" />
      <Events />

      {#if !$isAuthenticated}
        <CTA />
      {:else if !$thatProfile.isMember}
        <CtaMembership />
      {/if}

      <NewMembers />
      <Newsletter />
    </div>
  {/if}
</Layout>
