<script>
  export let sessions;
  export let editMode = false;

  import { onMount } from 'svelte';
  import dayjs from 'dayjs';
  import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
  import { Link } from 'yrv';

  import _ from 'lodash';

  import { getTimeStampId } from '../../utilities/scrollHelper';

  import CardLoader from '../CardLoader.svelte';
  import Card from './Card.svelte';
  import KeynoteCard from './KeynoteCard.svelte';

  import { Waiting, Action, GroupHeader } from '../../elements';

  dayjs.extend(isSameOrAfter);

  // todo: pull back after real schedule is up.
  // sessions = sessions.filter((s) =>
  //   dayjs(s.startTime).isSameOrAfter(dayjs(), 'day'),
  // );

  let sessionResults = _.groupBy(sessions, 'startTime');
  let groups = Object.keys(sessionResults)
    .map(i => ({
      key: i,
      startTime: new Date(i),
      headerId: getTimeStampId(new Date(i)),
    }))
    .sort((a, b) => a.startTime - b.startTime);

  const isKeynote = session => {
    let results = false;
    if (session.type === 'KEYNOTE' || session.type === 'PANEL') results = true;

    return results;
  };
</script>

<div>
  {#each groups as group (group.startTime)}
    <div class="pb-12">
      <GroupHeader>
        {#if !dayjs(group.startTime).isValid()}
          <span>Unscheduled</span>
        {:else}
          <span id="{group.headerId}">
            {dayjs(group.startTime).format('hh:mm a')}
          </span>
        {/if}
      </GroupHeader>

      <div>
        <ul class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
          {#each sessionResults[group.key] as session (session.id)}
            {#if isKeynote(session)}
              <li
                class="col-span-1 sm:col-span-2 lg:col-span-3 bg-white
                rounded-lg shadow-lg mt-10 mb-10"
              >
                <KeynoteCard {...session} />
              </li>
            {:else}
              <li class="col-span-1 bg-white rounded-lg shadow-lg">
                <Card {...session} {editMode} />
              </li>
            {/if}
          {/each}
        </ul>
      </div>
    </div>
  {/each}
</div>
