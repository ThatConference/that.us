<script>
  import { onMount } from 'svelte';
  import { getClient, query } from '@urql/svelte';

  import ListItem from './Item.svelte';
  import { Waiting, Action } from '../../elements';

  const QUERY_SESSIONS = query({
    query: `
      query GetEventsSessions ($eventId: ID!) {
        events {
          event(id: $eventId) {
            get {
              sessions {
                id
                title
                shortDescription
                status
                startTime
                speakers {
                  id
                  firstName
                  lastName
                  profileImage
                }
              }
            }
          }
        }
      }
    `,
    variables: { eventId: 'ByE7Dc7eCGcRFzLhWhuI' },
    requestPolicy: 'network-only',
  });

  $: sessions = QUERY_SESSIONS({ pause: true });

  onMount(() => QUERY_SESSIONS().then());
</script>

<div class="bg-white shadow overflow-hidden sm:rounded-md">
  {#if $sessions.fetching}
    <div class="flex items-center justify-center">
      <Waiting />
    </div>
  {:else if $sessions.error || !$sessions.data}
    Oh no! That didn't work.
  {:else}
    <ul>
      {#each $sessions.data.events.event.get.sessions as session}
        <li>
          {session.title}
          <!-- <ListItem {...session} /> -->
        </li>
      {/each}
    </ul>
  {/if}
</div>
