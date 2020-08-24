<script>
  export let router;

  // 3rd party
  import { getClient } from '@urql/svelte';
  import { navigateTo } from 'yrv';

  // components
  import Nav from '../../components/nav/interiorNav/Top.svelte';
  import Sponsor from '../../components/SponsorSimple.svelte';
  import SessionsList from '../../components/sessions/List.svelte';
  import CardLoader from '../../components/CardLoader.svelte';
  import Meta from '../../components/seo/Meta.svelte';

  // elements
  import StackedLayout from '../../elements/layouts/StackedLayout.svelte';
  import { ActionHeader, LinkButton } from '../../elements';

  // datasources
  import sessionsApi from '../../dataSources/api.that.tech/sessions';
  import { events } from '../../config';

  const { eventName } = router.params;
  const { querySessions } = sessionsApi(getClient());
  const currentEvent = events[eventName];

  if (!currentEvent) navigateTo(`/sessions`, { reload: true });
</script>

<Meta
  title="{`${currentEvent.title} * THAT`}"
  description="todo"
  openGraph="{{ title: `${currentEvent.title} * THAT`, description: 'todo', type: 'website', url: `https://that.us/events/${eventName}` }}"
/>

<StackedLayout>

  <div slot="header">
    <Nav />
    <ActionHeader title="{currentEvent.title}">
      <LinkButton href="/sessions" text="THAT Board" />
    </ActionHeader>
  </div>

  <div slot="body">
    <div class="text-red-500 text-sm leading-5 text-right lowercase italic">
      <span>* Scheduled times are represented in your timezone.</span>
    </div>
    {#await querySessions(currentEvent.eventId)}
      <CardLoader />
    {:then sessions}
      <SessionsList {sessions} />
    {:catch error}
      <p>OH NO</p>
    {/await}
  </div>

  <div slot="footer">
    <Sponsor />
  </div>

</StackedLayout>
