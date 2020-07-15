<script>
  export let router;

  // 3rd party
  import { getClient } from '@urql/svelte';
  import { Link } from 'yrv';
  import { onMount } from 'svelte';

  // components
  import Nav from '../../components/nav/Top.svelte';
  import Sponsor from '../../components/SponsorSimple.svelte';
  import SessionsList from '../../components/sessions/List.svelte';
  import SessionsLoading from '../../components/sessions/SessionsLoading.svelte';

  // elements
  import StackedLayout from '../../elements/layouts/StackedLayout.svelte';
  import { ActionHeader, LinkButton } from '../../elements';

  // datasources
  import sessionsApi from '../../dataSources/api.that.tech/sessions';
  import favoritesApi from '../../dataSources/api.that.tech/favorites';

  // utilities
  import { isAuthenticated } from '../../utilities/security.js';

  const apiClient = getClient();

  const { querySessions } = sessionsApi(apiClient);
  const { queryMyFavoriteIds } = favoritesApi(apiClient);

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
      <SessionsLoading />
    {:then sessions}
      {#if $isAuthenticated}
        {#await queryMyFavoriteIds() then favorites}
          <SessionsList {favorites} {sessions} />
        {/await}
      {:else}
        <SessionsList {sessions} />
      {/if}
    {:catch error}
      <p>OH NO</p>
    {/await}
  </div>

  <div slot="footer">
    <Sponsor />
  </div>

</StackedLayout>
