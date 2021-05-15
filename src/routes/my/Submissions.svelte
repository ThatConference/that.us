<script>
  import { getClient } from '@urql/svelte';

  import Nav from '../../components/nav/interiorNav/Top.svelte';
  import Sponsor from '../../components/SponsorSimple.svelte';
  import CardLoader from '../../components/CardLoader.svelte';
  import SubmissionList from './components/_SubmissionList.svelte';

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
    description: 'Your activity submissions.',
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
      <LinkButton href="/activities/create" text="Create a New ..." />
    </ActionHeader>
  </div>

  <div slot="body">
    {#await query}
      <CardLoader />
    {:then activities}
      {#if activities.length > 0}
        <SubmissionList activities="{activities}" />
      {:else}
        <div class="p-12">
          <ModalWarning
            title="You have no activities submitted?"
            text="Why not? Submit something today!" />
        </div>
      {/if}
    {:catch error}
      <ModalError
        title="KABOOM!"
        text="I'm sorry, bugs are features right? If I were you, I'd refresh the
        page right now."
        action="{{ title: 'Return to Activities', href: '/activities' }}" />
    {/await}
  </div>

  <div slot="footer">
    <Sponsor />
  </div>
</StackedLayout>
