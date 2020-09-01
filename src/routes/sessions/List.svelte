<script>
  // 3rd party
  import { getClient } from '@urql/svelte';
  import dayjs from 'dayjs';
  import { Link } from 'yrv';
  import { onMount } from 'svelte';
  import _ from 'lodash';

  // utilities
  import { getTimeStampId, scrollIntoView } from '../../utilities/scrollHelper';
  import { thatProfile } from '../../utilities/security.js';
  import metaTagsStore from '../../store/metaTags';

  // components
  import Nav from '../../components/nav/interiorNav/Top.svelte';
  import Sponsor from '../../components/SponsorSimple.svelte';
  import SessionsList from '../../components/sessions/List.svelte';
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

  $: if (!_.isEmpty($thatProfile)) {
    createDisabled = false;
  }

  onMount(() => {
    // TODO put back later after we have new dashboard.
    // query.then((_) => {
    //   const now = dayjs();
    //   let starting = now.startOf('hour');
    //   const bump = now.minute() >= 29;
    //   starting = bump === true ? starting.add(30, 'm') : starting;
    //   const id = getTimeStampId(starting.toDate());
    //   scrollIntoView(`#${id}`);
    // });
  });

  metaTagsStore.set({
    title: 'THAT Board - THAT',
    description:
      "We don't have to wait to have the conversation we need to have today. This is what's coming up.",
    openGraph: {
      type: 'website',
      url: `https://that.us/sessions`,
    },
  });
</script>

<StackedLayout>

  <div slot="header">
    <Nav />
    <ActionHeader title="THAT Board">
      {#if !createDisabled}
        <LinkButton href="/sessions/create" text="Create a New ..." />
      {/if}
    </ActionHeader>
  </div>

  <div slot="body">
    {#await querySessionsByDate($currentEvent.eventId)}
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
