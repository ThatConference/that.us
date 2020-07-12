<script>
  import { query } from '@urql/svelte';
  import { FacebookLoader } from 'svelte-content-loader';
  import { fade } from 'svelte/transition';

  import { ModalError } from '../../elements';
  import SessionDetails from './SessionDetails.svelte';

  import { LinkButton } from '../../elements';

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
            speakers {
              firstName
              lastName
              profileImage
            }
          }
        }
      }
    }`,

    variables: { eventId: 'ByE7Dc7eCGcRFzLhWhuI', sessionId },
    requestPolicy: 'cache-and-network',
  });

  $: sessionQuery = QUERY_SESSION();
</script>


<div
  class="fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex
  sm:items-center sm:justify-center"
>
  <div class="fixed inset-0 transition-opacity">
    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
  </div>

  <div
    class="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl
    transform transition-all sm:max-w-4xl sm:w-full sm:p-6"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-headline"
  >

    {#if $sessionQuery.fetching}
      <div class="flex items-center justify-center">
        <FacebookLoader />
      </div>
    {:else if $sessionQuery.error || !$sessionQuery.data}
      <ModalError
        title="No Session Found"
        text="I'm sorry we wern't able to find the session you requested."
        action="{{ title: 'Return to Sessions', href: '/sessions' }}"
      />
    {:else}
      <SessionDetails
        {...$sessionQuery.data.events.event.session}
        {sessionId}
      />
    {/if}

  </div>
</div>
