<script>
  import { getClient } from '@urql/svelte';

  import StackedLayout from '../../elements/layouts/StackedLayout.svelte';
  import Nav from '../../components/Nav.svelte';
  import Sponsor from '../../components/SponsorSimple.svelte';

  import { ActionHeader, LinkButton, Waiting } from '../../elements';

  export let router;
  const { sessionId } = router.params;

  const QUERY_SESSION = `
    query getSessionById($eventId: ID!, $sessionId: ID!) {
      events {
        event(id: $eventId) {
          session: sessionById(sessionId: $sessionId) {
            id
            title
            shortDescription
            speakers {
              firstName
              lastName
              profileImage
            }
          }
        }
      }
    }
  `;

  const executeQuery = getClient()
    .query(QUERY_SESSION, { eventId: 'ByE7Dc7eCGcRFzLhWhuI', sessionId })
    .toPromise();
</script>

<StackedLayout>

  <div slot="header">
    <Nav />
    <ActionHeader title="Session Details">
      <LinkButton href="/sessions/edit" text="Edit Session" />
    </ActionHeader>
  </div>

  <div slot="body">

    {#await executeQuery}
      <div class="flex items-center justify-center">
        <Waiting />
      </div>
    {:then result}
      {#if !result.data.events.event.session}
        <p>boooommmmm</p>
      {:else}
        <h1>{result.data.events.event.session.title}</h1>
        <p>{result.data.events.event.session.shortDescription}</p>
        <LinkButton href="/join/{sessionId}" text="Join Now" />
      {/if}
    {:catch error}
      <p>Error: {error}</p>
    {/await}

  </div>

  <div slot="footer"></div>

</StackedLayout>
