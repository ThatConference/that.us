<script>
  export let sessions;

  export let editMode = false;

  // 3rd party
  import { onMount } from 'svelte';
  import dayjs from 'dayjs';
  import dayOfYear from 'dayjs/plugin/dayOfYear';
  import { Link } from 'yrv';
  import _ from 'lodash';

  // utility
  import { getTimeStampId } from '../../utilities/scrollHelper';

  // ui support
  import CardLoader from '../CardLoader.svelte';
  import Card from './Card.svelte';
  import KeynoteCard from './KeynoteCard.svelte';
  import { Waiting, Action, GroupHeader } from '../../elements';

  dayjs.extend(dayOfYear);

  const sorted = _(sessions)
    .groupBy(({ startTime }) => dayjs(startTime).dayOfYear())
    .map((value, key) => ({
      timeSlots: _(value)
        .groupBy(({ startTime }) => new Date(startTime))
        .map((value, key) => ({
          timeSlot: key,
          sessions: value,
        }))
        .value(),
      dayOfYear: key,
    }))
    .value();

  const isKeynote = session => {
    let results = false;
    if (session.type === 'KEYNOTE' || session.type === 'PANEL') results = true;

    return results;
  };
</script>

<div>
  {#each sorted as day}
    <div>
      <h2
        class="text-3xl leading-9 font-extrabold tracking-tight
        text-thatBlue-800 sm:text-4xl sm:leading-10 pb-2"
      >
        <span>
          {dayjs()
            .dayOfYear(day.dayOfYear)
            .format("dddd MMMM D, 'YY")}
        </span>
      </h2>

    </div>
    {#each day.timeSlots as ts}
      <div class="pb-12">

        <h2
          class="text-3xl leading-9 font-extrabold tracking-tight
          text-thatOrange-400 sm:text-4xl sm:leading-10 pb-12"
        >
          {#if !dayjs(ts.timeSlot).isValid()}
            <span>Unscheduled</span>
          {:else}
            <span>{dayjs(ts.timeSlot).format('hh:mm a')}</span>
          {/if}
        </h2>

        <div>
          <ul class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
            {#each ts.sessions as session (session.id)}
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
  {/each}
</div>
