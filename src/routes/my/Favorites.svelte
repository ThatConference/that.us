<script>
  export let router;
  import { getClient } from '@urql/svelte';

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
  import favoritesApi from '../../dataSources/api.that.tech/favorites';

  const { get } = favoritesApi(getClient());
</script>

<svelte:head>
  <title>My Favorites * THAT.us</title>
</svelte:head>

<StackedLayout>

  <div slot="header">
    <Nav />
    <ActionHeader title="My Favorites">
      <LinkButton href="/sessions" text="Return to Full Schedule" />
    </ActionHeader>
  </div>

  <div slot="body">
    <div class="text-gray-500 text-sm leading-5 text-right lowercase italic">
      <span>* Scheduled times are represented in your timezone.</span>
    </div>
    {#await get()}
      <CardLoader />
    {:then sessions}
      {#if sessions.length > 0}
        <SessionsList {sessions} />
      {:else}
        <div class="p-12">
          <ModalWarning
            title="No Favorites!"
            text="Hold on a minute! You haven't favorited any ssssions yet. Get
            on it!"
          />
        </div>
      {/if}
    {:catch error}
      <ModalError
        title="KABOOM!"
        text="I'm sorry bugs are features right? If I were you, I'd refresh the
        page right now."
        action="{{ title: 'Return to Schedule', href: '/sessions' }}"
      />
    {/await}
  </div>

  <div slot="footer">
    <Sponsor />
  </div>

</StackedLayout>
