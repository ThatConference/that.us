<script>
  import { query } from '@urql/svelte';

  import { ActionHeader, LinkButton } from '../../elements';
  import StackedLayout from '../../elements/layouts/StackedLayout.svelte';

  import Nav from '../../components/nav/Top.svelte';
  import { isAuthenticated, thatProfile } from '../../utilities/security.js';

  export let router;
  const { sessionId } = router.params;

  const QUERY_SESSION = query({
    query: `
      query getSessionById($eventId: ID!, $sessionId: ID!) {
        events {
          event(id: $eventId) {
            session: sessionById(sessionId: $sessionId) {  
              title
              shortDescription
            }
          }
        }
      }
    `,
    variables: { eventId: 'ByE7Dc7eCGcRFzLhWhuI', sessionId },
    requestPolicy: 'cache-and-network',
  });

  $: sessionQuery = QUERY_SESSION();

  function initJitsi() {
    const domain = 'meet.jit.si';
    const options = {
      roomName: `THAT-${sessionId}`,
      width: '100%',
      height: 1000,
      userInfo: {
        displayName: `${$thatProfile.firstName} ${$thatProfile.lastName}`,
      },
      parentNode: document.getElementById('meet'),
    };

    const api = new window.JitsiMeetExternalAPI(domain, options);
  }
</script>

<svelte:head>
  <script src="https://meet.jit.si/external_api.js" on:load="{initJitsi}">

  </script>
</svelte:head>

<StackedLayout>
  <div slot="header">
    <Nav />

    {#if $sessionQuery.data}
      <ActionHeader title="{$sessionQuery.data.events.event.session.title}">
        <LinkButton href="/sessions/{sessionId}" text="Session Details" />
      </ActionHeader>
    {/if}
  </div>

  <div slot="body">
    <div id="meet" class="object-center"></div>
  </div>

  <div slot="footer"></div>

</StackedLayout>
