<script>
  import { query } from '@urql/svelte';
  import { FacebookLoader } from 'svelte-content-loader';
  import { fade } from 'svelte/transition';

  import Nav from '../../components/nav/interiorNav/Top.svelte';
  import { ModalError } from '../../elements';
  import StackedLayout from '../../elements/layouts/StackedLayout.svelte';
  import SessionDetails from './SessionDetails.svelte';

  import { ActionHeader, LinkButton } from '../../elements';

  export let router;
  const { sessionId } = router.params;

  const QUERY_SESSION = query({
    query: `
      query getSessionById($eventId: ID!, $sessionId: ID!) {
        events {
          event(id: $eventId) {
            session: sessionById(sessionId: $sessionId) {
              id
              title
              shortDescription
              tags
              startTime
              speakers {
                firstName
                lastName
                profileImage
                profileLinks {
                  linkType
                  url
                  isPublic                  
                }
              }
              favoritedBy {
                id
                firstName
                lastName
                profileImage
              }
            }
          }
        }
      }
    `,

    variables: { eventId: 'ByE7Dc7eCGcRFzLhWhuI', sessionId },
    requestPolicy: 'cache-and-network',
  });

  $: sessionQuery = QUERY_SESSION();
</script>

<StackedLayout>

  <div slot="header">
    <Nav />
    <ActionHeader title="Session Details" />
  </div>
  <div slot="body">
    {#if $sessionQuery.fetching}
      <div class="flex items-center justify-center">
        <FacebookLoader uniqueKey="loading" />
      </div>
    {:else if $sessionQuery.error || !$sessionQuery.data}
      <ModalError
        title="No Session Found"
        text="I'm sorry we weren't able to find the session you requested."
        action="{{ title: 'Return to Sessions', href: '/sessions' }}"
      />
    {:else}
      <SessionDetails
        {...$sessionQuery.data.events.event.session}
        {sessionId}
      />
    {/if}
  </div>

  <!-- <div slot="footer">
      <Sponsor />
    </div> -->

</StackedLayout>
