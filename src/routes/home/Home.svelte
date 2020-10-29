<script>
  import { fade } from 'svelte/transition';
  import { useMachine } from 'xstate-svelte';

  import { Logo } from '../../elements';
  import Layout from '../../elements/layouts/ContentLayout.svelte';
  import UpNext from '../../components/activities/UpNext.svelte';
  import {
    Hero,
    Testimonials,
    CTA,
    Newsletter,
    Stats,
    Events,
    NewMembers,
  } from '../../components/home';

  // utilities
  import { isAuthenticated } from '../../utilities/security';
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

  const { state } = useMachine(createMachine({ id: $currentEvent.eventId }));
</script>

<Layout>
  <div in:fade="{{ delay: 200 }}">
    <Hero />
  </div>

  <div in:fade="{{ delay: 400 }}">
    <Stats />
  </div>

  <div in:fade="{{ delay: 600 }}">
    <Testimonials />
  </div>

  <div in:fade="{{ delay: 800 }}">
    <Logo uri="/images/THAT-Logo-Words.svg" />

    <UpNext stateMachineService="{$state.context.upNextActor}" />

    {#if !$isAuthenticated}
      <CTA />
    {/if}

    <Events />
    <NewMembers />
    <Newsletter />
  </div>
</Layout>
