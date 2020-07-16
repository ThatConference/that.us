<script>
  export let router;
  import { getClient } from '@urql/svelte';

  import Nav from '../../components/nav/interiorNav/Top.svelte';
  import StackedLayout from '../../elements/layouts/StackedLayout.svelte';
  import Sponsor from '../../components/SponsorSimple.svelte';

  import { ActionHeader, LinkButton } from '../../elements';

  import CardLoader from '../../components/CardLoader.svelte';
  import SessionsList from '../../components/sessions/List.svelte';
  import submissionsApi from '../../dataSources/api.that.tech/submissions';

  const { queryMySubmissions } = submissionsApi(getClient());
  const query = queryMySubmissions();
</script>

<svelte:head>
  <title>My Submissions * THAT.us</title>
</svelte:head>

<StackedLayout>

  <div slot="header">
    <Nav />
    <ActionHeader title="My Session Submissions">
      <LinkButton href="/sessions/create" text="Create a new Session" />
    </ActionHeader>
  </div>

  <div slot="body">
    <div class="text-gray-500 text-sm leading-5 text-right lowercase italic">
      <span>* Scheduled times are represented in your timezone.</span>
    </div>
    {#await query}
      <CardLoader />
    {:then sessions}
      <SessionsList {sessions} editMode="{true}" />
    {:catch error}
      <p>OH NO</p>
    {/await}
  </div>

  <div slot="footer">
    <Sponsor />
  </div>

</StackedLayout>
