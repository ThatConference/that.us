<script>
  // 3rd party
  import { getClient } from '@urql/svelte';
  import { isEmpty } from 'lodash';

  // utilities
  import { thatProfile } from '../../utilities/security';
  import metaTagsStore from '../../store/metaTags';

  // components
  import Nav from '../../components/nav/interiorNav/Top.svelte';
  import Sponsor from '../../components/SponsorSimple.svelte';
  import ActivityList from '../../components/activities/List.svelte';
  import CardLoader from '../../components/CardLoader.svelte';

  // elements
  import StackedLayout from '../../elements/layouts/StackedLayout.svelte';
  import { ActionHeader, LinkButton } from '../../elements';

  // datasources
  import sessionsApi from '../../dataSources/api.that.tech/sessions';

  // stores
  import currentEvent from '../../store/currentEvent';

  const { querySessionsByDate } = sessionsApi(getClient());

  let createDisabled = true;

  $: if (!isEmpty($thatProfile)) {
    createDisabled = false;
  }

  metaTagsStore.set({
    title: 'Upcoming Activities - THAT',
    description:
      "We don't have to wait to have the conversation we need to have today. This is what's coming up.",
    openGraph: {
      type: 'website',
      url: `https://that.us/activities`,
    },
  });
</script>

<StackedLayout>
  <div slot="header">
    <Nav />
    <ActionHeader title="Activities">
      {#if !createDisabled}
        <LinkButton href="/activities/create" text="Create a New ..." />
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
    {#await querySessionsByDate({ eventId: $currentEvent.eventId })}
      <CardLoader />
    {:then activities}
      <ActivityList activities="{activities.sessions}" />
    {:catch error}
      <p>OH NO</p>
    {/await}
  </div>

  <div slot="footer">
    <Sponsor eventId="{$currentEvent.eventId}" />
  </div>
</StackedLayout>
