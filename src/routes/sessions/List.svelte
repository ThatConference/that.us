<script>
  export let router;

  // 3rd party
  import { getClient } from '@urql/svelte';
  import dayjs from 'dayjs';
  import { Link } from 'yrv';
  import { onMount } from 'svelte';
  import _ from 'lodash';

  // utilities
  import { getTimeStampId, scrollIntoView } from '../../utilities/scrollHelper';
  import { thatProfile } from '../../utilities/security.js';

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
  import { show } from '../../store/profileNotification';

  const { querySessions } = sessionsApi(getClient());

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
</script>

<svelte:head>
  <title>THAT 📆 THAT.us</title>
</svelte:head>

<StackedLayout>

  <div slot="header">
    <Nav />
    <ActionHeader title="THAT Board">
      {#if !createDisabled}
        <LinkButton href="/sessions/create" text="Create New ..." />
      {/if}
    </ActionHeader>
  </div>

  <div slot="body">
    <div class="text-red-500 text-sm leading-5 text-right lowercase italic">
      <span>* Scheduled times are represented in your timezone.</span>
    </div>
    {#await querySessions($currentEvent.eventId)}
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
