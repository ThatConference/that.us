<script>
  export let router;

  import { getClient } from '@urql/svelte';
  import { Link } from 'yrv';
  import { onMount } from 'svelte';

  import Nav from '../../components/nav/Top.svelte';
  import Sponsor from '../../components/SponsorSimple.svelte';

  import SessionsList from '../../components/sessions/List.svelte';
  import SessionsLoading from '../../components/sessions/SessionsLoading.svelte';

  import sessionsApi from '../../dataSources/api.that.tech/sessions';
  import { ActionHeader, LinkButton } from '../../elements';
  import StackedLayout from '../../elements/layouts/StackedLayout.svelte';

  const { querySessions } = sessionsApi(getClient());

  $: query = querySessions();

  onMount(() => {
    query = querySessions();
  });
</script>

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
    {#await query}
      <SessionsLoading />
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
