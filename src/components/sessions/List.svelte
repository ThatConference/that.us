<script>
  import { onMount } from 'svelte';
  import dayjs from 'dayjs';
  import { Link } from 'yrv';
  import { query } from '@urql/svelte';
  import _ from 'lodash';
  import { FacebookLoader } from 'svelte-content-loader';

  import GroupHeader from './GroupHeader.svelte';
  import Card from './Card.svelte';

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
              tags
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

  let groups = [];
  let sessionResults;

  $: sessionQuery = QUERY_SESSIONS({ pause: true });
  $: if ($sessionQuery.data) {
    const { sessions } = $sessionQuery.data.events.event.get;

    sessionResults = _.groupBy(sessions, 'startTime');
    groups = Object.keys(sessionResults)
      .map(i => ({ key: i, startTime: new Date(i) }))
      .sort((a, b) => a.startTime - b.startTime);
  }

  onMount(() => QUERY_SESSIONS().then());
</script>

<div>

  {#if $sessionQuery.fetching}
    <div>
      <div class="flex items-center justify-center">
        <GroupHeader>Fetching all THAT awesome!</GroupHeader>
      </div>

      <div>
        <ul class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <li class="col-span-1 bg-white rounded-lg shadow">
            <div class="w-full flex items-center justify-between p-3 space-x-6">
              <div class="flex-1 truncate">
                <FacebookLoader />
              </div>
            </div>
          </li>
          <li class="col-span-1 bg-white rounded-lg shadow">
            <div class="w-full flex items-center justify-between p-3 space-x-6">
              <div class="flex-1 truncate">
                <FacebookLoader />
              </div>
            </div>
          </li>
          <li class="col-span-1 bg-white rounded-lg shadow">
            <div class="w-full flex items-center justify-between p-3 space-x-6">
              <div class="flex-1 truncate">
                <FacebookLoader />
              </div>
            </div>
          </li>

        </ul>
      </div>
    </div>
  {:else if $sessionQuery.error || !$sessionQuery.data}
    Oh no! That didn't work.
  {:else}
    {#each groups as group}
      <div class="pb-12">
        <GroupHeader>
          {#if !dayjs(group.startTime).isValid()}
            <span>Unscheduled</span>
          {:else}
            <span>{dayjs(group.startTime).format('hh:mm a Z')}</span>
          {/if}
        </GroupHeader>

        <div>
          <ul class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {#each sessionResults[group.key] as session}
              <li class="col-span-1 bg-white rounded-lg shadow">
                <Card {...session} />
              </li>
            {/each}
          </ul>
        </div>
      </div>
    {/each}
  {/if}
</div>
