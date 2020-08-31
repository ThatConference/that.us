<script>
  export let router;
  import { getClient } from '@urql/svelte';

  import Nav from '../../components/nav/interiorNav/Top.svelte';
  import Sponsor from '../../components/SponsorSimple.svelte';
  import CardLoader from '../../components/CardLoader.svelte';
  import SessionsList from '../../components/sessions/List.svelte';

  import StackedLayout from '../../elements/layouts/StackedLayout.svelte';
  import {
    ActionHeader,
    LinkButton,
    ModalError,
    ModalWarning,
  } from '../../elements';

  import submissionsApi from '../../dataSources/api.that.tech/submissions';
  import metaTagsStore from '../../store/metaTags';

  const { queryMySubmissions } = submissionsApi(getClient());
  const query = queryMySubmissions();

  metaTagsStore.set({
    title: 'My Submissions - THAT',
    description: 'Your session submissions.',
    nofollow: true,
    noindex: true,
    openGraph: {
      type: 'website',
      url: `https://that.us/my/submissions`,
    },
  });
</script>

<StackedLayout>

  <div slot="header">
    <Nav />
    <ActionHeader title="My Submissions">
      <LinkButton href="/sessions/create" text="Create a New ..." />
    </ActionHeader>
  </div>

  <div slot="body">
    {#await query}
      <CardLoader />
    {:then sessions}
      {#if sessions.length > 0}
        <SessionsList {sessions} editMode="{true}" />
      {:else}
        <div class="p-12">
          <ModalWarning
            title="You have no session submissions?"
            text="Why not? Submit something today!"
          />
        </div>
      {/if}
    {:catch error}
      <ModalError
        title="KABOOM!"
        text="I'm sorry, bugs are features right? If I were you, I'd refresh the
        page right now."
        action="{{ title: 'Return to Schedule', href: '/sessions' }}"
      />
    {/await}
  </div>

  <div slot="footer">
    <Sponsor />
  </div>

</StackedLayout>
