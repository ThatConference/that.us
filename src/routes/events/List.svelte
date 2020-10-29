<script>
  export let router;

  // 3rd party
  import { getClient } from '@urql/svelte';
  import { navigateTo } from 'yrv';

  // components
  import Nav from '../../components/nav/interiorNav/Top.svelte';
  import Sponsor from '../../components/SponsorSimple.svelte';
  import ActivityList from '../../components/activities/List.svelte';
  import CardLoader from '../../components/CardLoader.svelte';

  // elements
  import StackedLayout from '../../elements/layouts/StackedLayout.svelte';
  import { ActionHeader, LinkButton } from '../../elements';

  // datasources
  import metaTagsStore from '../../store/metaTags';
  import sessionsApi from '../../dataSources/api.that.tech/sessions';
  import { events } from '../../config';

  const { eventName } = router.params;
  const { querySessions } = sessionsApi(getClient());
  const currentEvent = events[eventName];

  if (!currentEvent) navigateTo(`/activities`, { reload: true });

  metaTagsStore.set({
    title: `${currentEvent.title} * THAT`,
    description: `Activities for ${currentEvent.title}.`,
    openGraph: {
      type: 'website',
      url: `https://that.us/events/${eventName}`,
    },
  });
</script>

<StackedLayout>
  <div slot="header">
    <Nav />
    <ActionHeader title="{currentEvent.title}">
      <LinkButton href="/activities" text="Activities" />
    </ActionHeader>
  </div>

  <div slot="body">
    {#await querySessions({ eventId: currentEvent.eventId })}
      <CardLoader />
    {:then activities}
      <ActivityList activities="{activities.sessions}" />
    {:catch error}
      <p>OH NO</p>
    {/await}
  </div>

  <div slot="footer">
    <Sponsor eventId="{currentEvent.eventId}" />
  </div>
</StackedLayout>
