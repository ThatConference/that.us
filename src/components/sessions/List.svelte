<script>
  import { onMount } from 'svelte';
  import dayjs from 'dayjs';
  import { Link } from 'yrv';
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
    requestPolicy: 'cache-and-network',
  });

  $: sessions = QUERY_SESSIONS({ pause: true });

  onMount(() => QUERY_SESSIONS().then());

  let lastStartTime = '';
  function showHeading(currentSession) {
    let shouldShow = false;

    if (currentSession.startTime !== lastStartTime) {
      shouldShow = true;
    }

    lastStartTime = currentSession.startTime;
    return shouldShow;
  }
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
      {#each $sessions.data.events.event.get.sessions as session (session.id)}
        {#if showHeading(session)}
          <li>
            <Link href="#{dayjs(session.startTime).format('HH:mm')}">
              <h2
                class="text-xl leading-9 font-extrabold tracking-tight
                text-gray-900 sm:text-xl sm:leading-10"
              >
                {dayjs(session.startTime).format('hh:mm a')}
              </h2>
            </Link>
          </li>
        {/if}
        <li>
          <ListItem {...session} />
        </li>
      {/each}
    </ul>
  {/if}
</div>
