<script>
  import { getClient } from '@urql/svelte';

  // ui support
  import Nav from '../../components/nav/interiorNav/Top.svelte';
  import StackedLayout from '../../elements/layouts/StackedLayout.svelte';
  import Sponsor from '../../components/SponsorSimple.svelte';
  import {
    ModalError,
    ModalWarning,
    ActionHeader,
    LinkButton,
  } from '../../elements';

  import CardLoader from '../../components/CardLoader.svelte';
  import SessionsList from '../../components/sessions/List.svelte';

  // data
  import metaTagsStore from '../../store/metaTags';
  import favoritesApi from '../../dataSources/api.that.tech/favorites';
  import currentEvent from '../../store/currentEvent';

  const { get } = favoritesApi(getClient());

  metaTagsStore.set({
    title: 'My Favorites - THAT',
    description: "You're list of favorited sessions.",
    nofollow: true,
    noindex: true,
    openGraph: {
      type: 'website',
      url: `https://that.us/my/favorites`,
    },
  });
</script>

<StackedLayout>

  <div slot="header">
    <Nav />
    <ActionHeader title="My Favorites">
      <LinkButton href="/sessions" text="Return to THAT Board" />
    </ActionHeader>
  </div>

  <div slot="body">
    {#await get($currentEvent.eventId)}
      <CardLoader />
    {:then sessions}
      {#if sessions.length > 0}
        <SessionsList {sessions} />
      {:else}
        <div class="p-12">
          <ModalWarning
            title="No Favorites!"
            text="Hold on a minute! You haven't favorited any sessions yet. Get
            on it!"
          />
        </div>
      {/if}
    {:catch error}
      <ModalError
        title="KABOOM!"
        text="I'm sorry, bugs are features right? If I were you, I'd refresh the
        page right now."
        action="{{ title: 'Return to THAT Board', href: '/sessions' }}"
      />
    {/await}
  </div>

  <div slot="footer">
    <Sponsor />
  </div>

</StackedLayout>
