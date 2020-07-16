<script>
  export let sessions;

  import { onMount } from 'svelte';
  import dayjs from 'dayjs';
  import { Link } from 'yrv';

  import _ from 'lodash';

  import GroupHeader from './GroupHeader.svelte';
  import SessionsLoading from './SessionsLoading.svelte';
  import Card from './Card.svelte';

  import { Waiting, Action } from '../../elements';

  let sessionResults = _.groupBy(sessions, 'startTime');
  let groups = Object.keys(sessionResults)
    .map(i => ({ key: i, startTime: new Date(i) }))
    .sort((a, b) => a.startTime - b.startTime);
</script>

<div>
  {#each groups as group (group.startTime)}
    <div class="pb-12">
      <GroupHeader>
        {#if !dayjs(group.startTime).isValid()}
          <span>Unscheduled</span>
        {:else}
          <span>{dayjs(group.startTime).format('hh:mm a')}</span>
        {/if}
      </GroupHeader>

      <div>
        <ul class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {#each sessionResults[group.key] as session (session.id)}
            <li class="col-span-1 bg-white rounded-lg shadow">
              <Card {...session} />
            </li>
          {/each}
        </ul>
      </div>
    </div>
  {/each}
</div>
