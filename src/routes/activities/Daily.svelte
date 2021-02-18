<script>
  // 3rd party
  import { useMachine } from 'xstate-svelte';
  import SvelteInfiniteScroll from 'svelte-infinite-scroll';
  import { isEmpty } from 'lodash';

  // components
  import Nav from '../../components/nav/interiorNav/Top.svelte';
  import Sponsor from '../../components/SponsorSimple.svelte';
  import ActivityList from '../../components/activities/List.svelte';
  import CardLoader from '../../components/CardLoader.svelte';

  // elements
  import { Waiting, ActionHeader, LinkButton } from '../../elements';
  import { Chevron } from '../../elements/svgs';
  import StackedLayout from '../../elements/layouts/StackedLayout.svelte';

  // datasources
  import { thatProfile } from '../../utilities/security';
  import metaTagsStore from '../../store/metaTags';
  import createMachine from './machines/daily';
  import { debug } from '../../config';

  let createDisabled = true;

  const { state, send } = useMachine(createMachine(), {
    devTools: debug.xstate,
  });

  $: if (!isEmpty($thatProfile)) {
    createDisabled = false;
  }

  $: {
    metaTagsStore.set({
      title: 'Daily Activities * THAT',
      description: `THAT Daily Activities || 'Activities'}.`,
      openGraph: {
        type: 'website',
        url: `https://that.us/activities`,
      },
    });
  }

  function handleNext() {
    send('NEXT');
  }
</script>

<StackedLayout>
  <div slot="header">
    <Nav />
    <ActionHeader title="Daily Activities">
      {#if !createDisabled}
        <LinkButton href="/activities/create" text="Create Activity" />
      {/if}
    </ActionHeader>
    <!-- <h3
      class="sticky top-4 z-20 mr-4 text-thatRed-500 text-sm leading-5 text-left
        lowercase italic invisible lg:visible"
    >
      <span>* Scheduled times are represented in your timezone.</span>
    </h3> -->
  </div>

  <div slot="body">
    {#if ['init'].some($state.matches)}
      <CardLoader />
    {:else}
      <ActivityList activities="{$state.context.items}" />

      <SvelteInfiniteScroll
        window
        threshold="{100}"
        on:loadMore="{handleNext}" />
    {/if}

    {#if ['loaded'].some($state.matches)}
      <div class="mt-12 text-gray-400 flex flex-col items-center">
        scroll for more <Chevron />
      </div>
    {/if}

    {#if ['loadingNext', 'loadedAll'].some($state.matches)}
      <div class="flex flex-grow justify-center py-12">
        <Waiting />
      </div>
    {/if}
  </div>

  <div slot="footer">
    <Sponsor eventId="{$state.context.eventId}" />
  </div>
</StackedLayout>
