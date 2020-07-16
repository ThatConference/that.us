<script>
  export let router;

  // 3rd party
  import { getClient } from '@urql/svelte';
  import { Link } from 'yrv';
  import { onMount } from 'svelte';

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
  import favoritesApi from '../../dataSources/api.that.tech/favorites';

  const apiClient = getClient();

  const { querySessions } = sessionsApi(apiClient);
  $: query = querySessions();

  onMount(() => {
    query = querySessions();
  });
</script>

<svelte:head>
  <title>THAT Schedule * THAT.us</title>
</svelte:head>

<StackedLayout>

  <div slot="header">
    <Nav />
    <ActionHeader title="THAT Schedule">
      <LinkButton href="/sessions/create" text="Create New Session" />
    </ActionHeader>
  </div>

  <div slot="body">
    <div class="text-gray-500 text-sm leading-5 text-right lowercase italic">
      <span>* Scheduled times are represented in your timezone.</span>
    </div>
    {#await querySessions()}
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
