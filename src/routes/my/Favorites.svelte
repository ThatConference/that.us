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
  import ActivityList from '../../components/activities/List.svelte';

  // data
  import metaTagsStore from '../../store/metaTags';
  import favoritesApi from '../../dataSources/api.that.tech/favorites';
  import currentEvent from '../../store/currentEvent';

  const { get } = favoritesApi(getClient());

  metaTagsStore.set({
    title: 'My Favorites - THAT',
    description: "You're list of favorited activities.",
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
      <LinkButton href="/activities" text="Return to Activities" />
    </ActionHeader>
  </div>

  <div slot="body">
    {#await get($currentEvent.eventId)}
      <CardLoader />
    {:then activities}
      {#if activities.length > 0}
        <ActivityList reverse="{true}" activities="{activities}" />
      {:else}
        <div class="p-12">
          <ModalWarning
            title="No Favorites!"
            text="Hold on a minute! You haven't favorited any activities yet. Get
            on it!"
          />
        </div>
      {/if}
    {:catch error}
      <ModalError
        title="KABOOM!"
        text="I'm sorry, bugs are features right? If I were you, I'd refresh the
        page right now."
        action="{{ title: 'Return to Activities', href: '/activities' }}"
      />
    {/await}
  </div>

  <div slot="footer">
    <Sponsor />
  </div>
</StackedLayout>
